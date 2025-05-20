
// change getters and stuff

import { defineStore } from 'pinia';

export const useFavoritosStore = defineStore('favorito', {
  state: () => ({
    favoritos: []
  }),
  getters: {
    totalFavoritos: (state) => state.favoritos.length,
    // hay que hacer un state para esto en vez de getter


  },
  actions: {
    addFavorito(favorito) {
      this.favoritos.push(favorito);  
    //   the structure of a  favorito is stablish when added like in addEmpleado
    },
    deleteFavorito(servicio) {
        this.favoritos = this.favoritos.filter((favorito) => favorito.servicio !== servicio);
        console.log("delete completed");
      }
  }
});