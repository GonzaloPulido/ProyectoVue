<script>
export default {
  name: 'ErrorPage'
};
</script>
<template>
  <div class="error-page">
      <img src="../assets/error.jpeg"/>
      <h1 class="error-title">Ups... Parece que ha ocurrido un error.</h1>
      <p class="error-message"></p>
  </div>
</template>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
}

.error-title {
  font-size: 36px;
  margin-top: 20px;
}

.error-message {
  font-size: 18px;
  margin-top: 10px;
}
</style>
  