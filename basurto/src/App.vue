<template>
  <div>
    <!-- this div should have a class so i can put flex to it (so it's two columns that way)this div should have a class so i can put flex to it (so it's two columns that way) -->
    <h1>This is the basurto page</h1>

    <nav>
      <router-link to="/">Inicio</router-link>
      <router-link to="/todosServicios">Todos los servicios</router-link>
      <router-link to="/serviciosPabellon">Servicios por Pabellon</router-link>
      <router-link to="/favoritos">Favoritos</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

nav {
  display: flex;
  gap: 15px;
}
</style>
