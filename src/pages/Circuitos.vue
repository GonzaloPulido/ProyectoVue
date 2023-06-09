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

<style>
  .circuitspage {
    background-color: #707070;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 7vh;
    gap: 0.1rem;
  }
</style>