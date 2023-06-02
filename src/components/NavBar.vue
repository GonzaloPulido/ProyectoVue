<script>
/* import { inject } from 'vue';
import Store from '../store/Store'; */
import "@fortawesome/fontawesome-free/css/all.css"
export default {
  data() {
    return {
      isNavbarOpen: false
    };
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    }
  },
  /* setup() {
    const store = inject(Store);

    const isLoggedIn = store.state.loggedIn;
    const setLoggedIn = store.commit('setLoggedIn');

    // Utiliza las variables y métodos según tus necesidades

    return {
      isLoggedIn,
      setLoggedIn
    };
  } */
  
}
</script>

<template>
  <header class="navbar">
    <router-link to="/">
      <img class="navbar__logo" src="../assets/logoMotoGP.png" alt="Logo MotoGP">
    </router-link>
    <div class="navbar__links" :class="{ 'navbar__links--active': isNavbarOpen }">
      <router-link to="/pilotos">
        <h2 class="navbar__link">Pilotos</h2>
      </router-link>
      <router-link to="/circuitos">
        <h2 class="navbar__link">Circuitos</h2>
      </router-link>
      <router-link to="/equipos">
        <h2 class="navbar__link">Equipos</h2>
      </router-link>
    </div>
    <div class="navbar__buttons">
      <div class="navbar__toggle" @click="toggleNavbar">
          <span class="navbar__toggle-icon"></span>
      </div>
      <router-link v-if="!isLoggedIn" to="/register">
        <i class="fa-solid fa-registered fa-lg"></i>
      </router-link>
      <router-link v-if="!isLoggedIn" to="/login">
        <i class="fa-solid fa-right-to-bracket fa-lg"></i>
      </router-link>
      <router-link v-else to="/logout">
        <i class="fa-solid fa-sign-out fa-lg"></i>
      </router-link>
    </div>
  </header>
</template>

<style scoped>

a:link, a:visited, a:active {
  text-decoration: none;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3A3A3A;
  padding: 10px;
  color: #D9043D;
}

.navbar__logo {
  width: 100px;
}

.navbar__toggle {
  display: none;
  cursor: pointer;
  height: 100%;
}

.navbar__toggle-icon {
  display: block;
  right: 10px;
  top:8px;
  width: 20px;
  height: 2px;
  color: #D9043D;
  background-color: #D9043D;
  position: relative;
}

.navbar__toggle-icon::before,
.navbar__toggle-icon::after {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background-color: #D9043D;
  position: absolute;
  left: 0;
}

.navbar__toggle-icon::before {
  top: -6px;
}

.navbar__toggle-icon::after {
  top: 6px;
}

.navbar__links {
  display: flex;
}

.navbar__links--active {
  flex-direction: row; 
  justify-content: space-between; 
  align-items: center; 
  display: block;
  background-color: #3A3A3A;
  padding: 10px;
  margin-top: 10px;
}

.navbar__link {
  margin-right: 10px; 
  color: #D9043D;
  cursor: pointer;
}

.navbar__buttons {
  display: flex;
}

.navbar__button {
  margin-right: 10px;
  color: #D9043D;
  cursor: pointer;
  font-weight: bold;
}

.fa-lg {
  color: #D9043D;
  font-size: 24px;
  margin-right: 10px;
}

@media (max-width: 768px) {
  .navbar__toggle {
    display: block;
  }

  .navbar__links {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    background-color: #3A3A3A;
    padding: 10px;
    margin-top: 10px;
  }

  .navbar__links--active {
    display: block;
  }
}
</style>
