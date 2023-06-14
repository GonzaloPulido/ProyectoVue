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
    <select class="custom-select" v-model="selectedCategory" @change="updateriders">
      <option value="MotoGP">MotoGP</option>
      <option value="Moto2">Moto2</option>
      <option value="Moto3">Moto3</option>
    </select>
  </div>
</template>

<style scoped>
.custom-select {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #D9043D;
  color: white;
  padding: 8px;
  font-size: 16px;
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  left: 5px;
}

.custom-select option {
  background-color: #a4a4a4;
  color: black;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}


</style>

  
  
  