<script>
  export default {}
</script>


<template>
  <footer class="footer">
    <router-link to="/">
      <img class="footer__logo" src="https://css.motogp.com/img/logos/motogp_white.svg" alt="Logo MotoGP">
    </router-link>
    <div class="footer__links">
      <router-link to="/">
        <img class="footer__logo" src="https://css.motogp.com/img/logos/footer/Tissot.svg" alt="Logo Tissot">
      </router-link>
      <router-link to="/">
        <img class="footer__logo" src="https://css.motogp.com/img/logos/footer/Michelin.svg" alt="Logo Michelin">
      </router-link>
      <router-link to="/">
        <img class="footer__logo" src="https://css.motogp.com/img/logos/footer/BMW.svg" alt="Logo BMW">
      </router-link>
      <router-link to="/">
        <img class="footer__logo" src="https://css.motogp.com/img/logos/footer/Estrellagalicia.svg" alt="Logo Estrella Galicia">
      </router-link>
      <router-link to="/">
        <img class="footer__logo" src="https://css.motogp.com/img/logos/footer/DHL.svg" alt="Logo DHL">
      </router-link>
    </div>
    <div class="footer__contact">
      <router-link to="/contacto">
        <h2>Contacto</h2>
      </router-link>
    </div>
  </footer>
</template>

<style scoped>
a:link, a:visited, a:active {
  text-decoration: none;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(58, 58, 58, 0.9); /* Color de fondo con opacidad */
  padding: 10px;
  color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.footer__logo {
  width: 60px; 
  height: 30px; 
  margin-right: 10px; 
}

.footer__links {
  display: flex;
  text-decoration: none
}

.footer__contact {
  margin-left: auto;
  text-decoration: none 
}

.footer__contact h2 {
  margin: 0;
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  border-bottom: none;
}

@media (max-width: 768px) {
  .footer__logo {
    width: 40px; /* Reducción del tamaño de los logos en pantallas pequeñas */
    height: 20px; /* Reducción del tamaño de los logos en pantallas pequeñas */
  }
}
</style>
