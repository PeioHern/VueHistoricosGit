<template>
    <h2>This is the servicios pabellon page</h2>
    <BasurtoText />


    <h2>Filtrar por pabellon</h2>
    <select v-model="filterSelect">
        <option value="XXX">seleccione un pabellon</option>
        <option v-for="service in uniquePabellonNames" :key="service" :value="service">
            {{ service }}
        </option>
    </select>
    <br><br>




    <table class="services-table">
        <thead>
            <tr>
                <th>Icono</th>
                <th>Servicio</th>
                <th>Entrada</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="service in filteredServicesSel" :key="service.SERVICIO">
                <td>{{ service.ICONO }}</td>
                <td>{{ service.SERVICIO }}</td>
                <td>{{ service.ENTRADA }}</td>
            </tr>
        </tbody>
    </table>





</template>

<script setup>
import BasurtoText from '@/components/littleStuff/BasurtoText.vue';


import axios from 'axios';
import { computed, ref, onMounted } from 'vue';


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


const filterSelect = ref('XXX');

const filteredServicesSel = computed(() => {
    if (filterSelect.value === 'XXX') return [];
    return services.value.filter(ser => ser.ENTRADA === filterSelect.value);
});


// para que no salgan repetidos en el select
const uniquePabellonNames = computed(() => {
    const names = services.value.map(s => s.ENTRADA);
    return [...new Set(names)];
});



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

</style>