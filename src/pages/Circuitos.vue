<script>
import ListadoCircuitos from '../components/ListadoCircuitos.vue';

export default {
  components: {
    ListadoCircuitos
  }
}
</script>

<template>
    <div class="circuitspage">
      <ListadoCircuitos/>
    </div>
</template>

<style scoped>
  .circuitspage {
    background-color: #a4a4a4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 7vh;
    gap: 0.1rem;
  }
</style>