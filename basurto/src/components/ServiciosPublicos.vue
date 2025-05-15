<template>
    <h2>This is the servicios publicos page</h2>
    <BasurtoText />
    <!-- solution: get services with axios like in album_ej and show them in a list like in empleados_list -->
    <!-- la caja de favs va aqui -->
    <div>
        <h2>Todos los Servicios</h2>
        <!-- <input v-model="filterInput" placeholder="Filtrar por departamento" /> -->
        <!-- poner aqui tambien el filtro en select, i assume its a similar thing idk (also they should be alphavetically ordered) -->

        <!-- <ul>
            <li v-for="service in services" :key="service.SERVICIO">
                {{ service.ICONO }} - {{ service.SERVICIO }} - {{ service.ENTRADA }}
            </li>
        </ul> -->

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
                <tr v-for="service in services" :key="service.SERVICIO">
                    <td>{{ service.ICONO }}</td>
                    <td>{{ service.SERVICIO }}</td>
                    <td>{{ service.ENTRADA }}</td>
                    <td><img :src="isFavorito(service.SERVICIO) ? redHeart : whiteHeart" alt="imageHeart"
                            class="heartImage" @click="toggleFavs(service)" /></td>
                </tr>
            </tbody>
        </table>


    </div>
</template>

<script setup>
import whiteHeart from '@/assets/images/whiteHeartCutted.jpg';
import redHeart from '@/assets/images/redHeartCutted.jpg';

import BasurtoText from '@/components/littleStuff/BasurtoText.vue';

import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useFavoritosStore } from '@/store/favoritos';


const store = useFavoritosStore();

// const HeartUrl = ref(whiteHeart);

const services = ref([]);

onMounted(() => {
    fetchServices();
})

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
</style>