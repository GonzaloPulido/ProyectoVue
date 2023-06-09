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
  <div>
    <SeleccionCategoria @changed-category="selectedCategory = $event" />
    <ListadoEquipos :category="selectedCategory" />
  </div>
</template>


