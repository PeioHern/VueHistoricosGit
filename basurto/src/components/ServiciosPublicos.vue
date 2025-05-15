<template>
    <h2>This is the servicios publicos page</h2>
    <BasurtoText />
    <!-- solution: get services with axios like in album_ej and show them in a list like in empleados_list -->
    <!-- la caja de favs va aqui -->
    <div>
        <h2>Todos los Servicios</h2>
        <!-- <input v-model="filterInput" placeholder="Filtrar por departamento" /> -->
        <!-- poner aqui tambien el filtro en select, i assume its a similar thing idk -->

        <ul>
            <!-- alright this works but we have to filter by service name by search and alphabetically (using filter like in empleados_list) -->
            <li v-for="service in services" :key="service.SERVICIO">
                {{ service.ICONO }} - {{ service.SERVICIO }} - {{ service.ENTRADA }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import BasurtoText from '@/components/littleStuff/BasurtoText.vue';

import axios from 'axios';
import { ref, onMounted } from 'vue';

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
</script>