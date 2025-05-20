<template>
    <h2>This is the servicios publicos page</h2>
    <BasurtoText />
    <!-- solution: get services with axios like in album_ej and show them in a list like in empleados_list -->
    <!-- la caja de favs va aqui -->
    <div>


        <h2>Filtrar por servicio</h2>
        <input v-model="filterInput" placeholder="nombre servicio" /><br><br>

        <select v-model="filterSelect">
            <option value="">Todos los servicios</option>
            <option v-for="service in uniqueServiceNames" :key="service" :value="service">
                {{ service }}
            </option>
        </select>


        <h2>Todos los Servicios</h2>

        <table class="services-table">
            <thead>
                <tr>
                    <th>Icono</th>
                    <th>Servicio</th>
                    <th>Entrada</th>
                    <th>Fav</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="service in filteredServices" :key="service.SERVICIO">
                    <!-- <td><img :src="`/images/${service.ICONO}`" alt="icon" class="service-icon" /></td> -->
                    <td><img src="/images/hospitIcon.jpg" alt="icon" class="service-icon" /></td>
                    <td>{{ service.SERVICIO }}</td>
                    <td>{{ service.ENTRADA }}</td>
                    <td><img :src="isFavorito(service.SERVICIO) ? redHeart : whiteHeart" alt="imageHeart"
                            class="heartImage" @click="toggleFavs(service)" /></td>
                </tr>
            </tbody>
        </table>

        <h2>Agregar nuevo servicio (extra)</h2>
        <form @submit.prevent="addService">
            <input v-model="newService.ICONO" placeholder="Nombre del icono" required />
            <input v-model="newService.SERVICIO" placeholder="Nombre del servicio" required />
            <input v-model="newService.ENTRADA" placeholder="Entrada" required />
            <button type="submit">Agregar</button>
        </form>
        <br><br>




    </div>
</template>

<script setup>
import whiteHeart from '@/assets/images/whiteHeartCutted.jpg';
import redHeart from '@/assets/images/redHeartCutted.jpg';

import BasurtoText from '@/components/littleStuff/BasurtoText.vue';

import axios from 'axios';
import { computed, ref, onMounted } from 'vue';
import { useFavoritosStore } from '@/store/favoritos';


const store = useFavoritosStore();

// const HeartUrl = ref(whiteHeart);



const newService = ref({
    ICONO: '',
    SERVICIO: '',
    ENTRADA: ''
});

const services = ref([]);

onMounted(() => {
    fetchServices();
})


const filterInput = ref('');
const filterSelect = ref('');

const filteredServices = computed(() => {
    return services.value.filter(ser =>
        ser.SERVICIO.toLowerCase().includes(filterInput.value.toLowerCase())
    );
});

const filteredServicesSel = computed(() => {
    if (!filterSelect.value) return services.value;
    return services.value.filter(ser => ser.SERVICIO === filterSelect.value);
});

// para que no salgan repetidos en el select
const uniqueServiceNames = computed(() => {
    const names = services.value.map(s => s.SERVICIO);
    return [...new Set(names)];
});




//funcion obtener servicios
const fetchServices = async () => {
    try {
        const response = await axios.get("/basurto.json");
        services.value = response.data;
        console.log("Services fetched successfully:", services.value);
    } catch (error) {
        console.error("Error fetching services from JSON:", error);
    }
};




const isFavorito = (servicioName) => {
    return store.favoritos.some(fav => fav.servicio === servicioName);
};

const toggleFavs = (service) => {

    if (isFavorito(service.SERVICIO)) {
        store.deleteFavorito(service.SERVICIO);
        console.log("Servicio eliminado de favoritos");
    } else {
        store.addFavorito({ icono: service.ICONO, servicio: service.SERVICIO });
        console.log("Servicio añadido a favoritos");
    }

};

//metodo para añadir nuevo servicio (extra)
const addService = () => {
    services.value.push({ ...newService.value }); // spread to copy data
    newService.value = { ICONO: '', SERVICIO: '', ENTRADA: '' }; // reset form
};

</script>

<style scoped>
.services-table {
    width: 100%;
    border-collapse: collapse;
}

.services-table th,
.services-table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

.services-table th {
    background-color: #f0f0f0;
}

.heartImage {
    width: 50px;
    height: 50px;
}

.service-icon {
    width: 50px;
    height: 50px;
}
</style>