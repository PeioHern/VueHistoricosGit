<template>
    <h2>This is the favoritos page</h2>
    <BasurtoText />

    <!-- mostrar favoritos -->
    <ul>
        <!-- hacer boton/funcion para añadir tres favoritos por defecto -->
        <form @submit.prevent="addTestFavorites">
            <button type="submit">Agregar favoritos de prueba</button>
        </form>
        <h1>Tienes {{ totalFavoritos }} favoritos</h1>
        <li v-for="favorito in favoritos" :key="favorito.servicio">
            {{ favorito.icono }} - {{ favorito.servicio }} <button @click="deleteFavorito(favorito.servicio)">delete</button>
        </li>
    </ul>
</template>

<script setup>
import { computed, ref } from 'vue';
import BasurtoText from '@/components/littleStuff/BasurtoText.vue';
import { useFavoritosStore } from '@/store/favoritos';

// const favoritos = ref([]);

const store = useFavoritosStore();
const { deleteFavorito } = store;

// const favoritos = store.favoritos;
const favoritos = computed(() => store.favoritos);

const totalFavoritos = computed(() => store.totalFavoritos);


const addTestFavorites = () => {
    store.addFavorito({ icono: "alergias.png", servicio: "Alergología (Hospitalización)" });
    store.addFavorito({ icono: "urmom.png", servicio: "second servicce" });
    store.addFavorito({ icono: "hawktuah.png", servicio: "thirdd service" });
 
    // totalFavoritos = store.totalFavoritos;
    console.log("Total favoritos: ", store.totalFavoritos);
};

</script>