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
  <div class="containerpilotos">
    <SeleccionCategoria @changed-category="selectedCategory = $event" />
    <ListadoPilotos :category="selectedCategory" />
  </div>
</template>

<style scoped>
.containerpilotos{
  padding: 2rem;
  background-color: #a4a4a4;
}
</style>

