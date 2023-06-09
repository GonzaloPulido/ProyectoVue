<script>
  export default {
    data() {
      return {
        selectedCategory: 'MotoGP',
      };
    },
    methods: {
      updateriders() {
        this.$emit('changed-category', this.selectedCategory);
        
      },
    },
  };
</script>

<template>
    <div>
      <select v-model="selectedCategory" @change="updateriders">
        <option value="MotoGP">MotoGP</option>
        <option value="Moto2">Moto2</option>
        <option value="Moto3">Moto3</option>
      </select>
    </div>
</template>
  
  
  