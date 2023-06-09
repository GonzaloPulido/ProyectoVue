<script>
import SeleccionCategoria from '../components/SeleccionCategoria.vue';
import ListadoPilotos from '../components/ListadoPilotos.vue';

export default {
  components: {
    SeleccionCategoria,
    ListadoPilotos,
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
    <ListadoPilotos :category="selectedCategory" />
  </div>
</template>


