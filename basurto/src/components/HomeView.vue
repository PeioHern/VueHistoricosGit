<template>
<h2>This is the home page</h2>
<!-- <img src="@/assets/images/bienvenidaHosp.jpg" alt="imagebienv" class="w-10 h-10"> -->
<img :src="bienvenidaH" alt="imagebienv" class="introImage" />
</template>

<script setup>
import bienvenidaH from '@/assets/images/osakiLogo.png';

</script>

<style scoped>
.introImage {
  width: 600px;
  height: 300px;
}
</style>