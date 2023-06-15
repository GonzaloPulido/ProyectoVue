<script>
import SeleccionCategoria from '../components/SeleccionCategoria.vue';
import ListadoEquipos from '../components/ListadoEquipos.vue';

export default {
  components: {
    SeleccionCategoria,
    ListadoEquipos,
  },
  data() {
    return {
      selectedCategory: 'MotoGP',
    };
  },
};
</script>

<template>
  <div class="containerteams">
    <SeleccionCategoria @changed-category="selectedCategory = $event" />
    <ListadoEquipos :category="selectedCategory"/>
  </div>
</template>

<style scoped>
.containerteams{
  padding: 2rem;
  background-color: #a4a4a4;
}
</style>

