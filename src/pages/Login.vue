<script>
import {fetchDataFromApi} from '../helpers/apiHelper.js'

export default {
  data() {
    return {
      url:'https://apimotogp2023-production.up.railway.app/api/users',
      formData: {
          email: '',
          password: '',
      },
      users: [],
      goodWarning: false,
      badWarning: false,
    };
  },
  methods: {
    checkEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email)
    },
    checkPassword(password){
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{5,10}$/

        return regex.test(password)
    },
    async getDataFromApi() {
      try {
        const data = await fetchDataFromApi(this.url);
        this.users = data
        
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    },
  async logedUser(){
    try {
        const checkCredentials = this.users.some(
            (user) => (user.email === this.formData.email) && (user.password === this.formData.password)
        );
        
        if(checkCredentials && this.checkEmail(this.formData.email) && this.checkPassword(this.formData.password)) {
            this.$store.state.isLoggedIn = true;
            this.goodWarning = true
            const finalUser = this.users.find(
              (user) => user.email === this.formData.email
            )
            /* this.$userId.state.userId = finalUser._id; */
            localStorage.setItem("logedUser",finalUser._id);
            this.$store.state.userId = finalUser._id;
            
            setTimeout(() => {
                this.goodWarning = false;
                this.$router.push(`/perfil`)
            },2000)
        }else{
          this.badWarning = true
            setTimeout(() => {
                this.badWarning = false;
            },2000)
        }
    }catch (error){
        console.log(error)
    }
  },
  },
  created() {
  this.getDataFromApi();
  },
  
};
</script>

<template>

  <!-- Pop Up Good -->
  <div class="popup" v-if="goodWarning">
        <div class="popup-content">
            <p>Inicio de sesion correcto</p>
        </div>
    </div>
    <!-- Pop Up Bad -->
    <div class="popup" v-if="badWarning">
        <div class="popup-content">
            <p>Credenciales incorrectas</p>
        </div>
    </div>
    <div class="login-container">
      <h2>Iniciar sesión</h2>
      <form @submit.prevent="logedUser" class="login-form">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="text" id="email" v-model="formData.email" required>
          <span v-if="!checkEmail(formData.email)" class="errorMessage">Credenciales incorrectas</span>
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="formData.password" required>
          <span v-if="!checkPassword(formData.password)" class="errorMessage">Credenciales incorrectas</span>
        </div>
        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
      </form>
    </div>
  </template>
  
  <style>
  .login-container {
    width: 300px;
    margin: 100px auto 0;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    height: 100%;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .login-form .form-group {
    margin-bottom: 15px;
  }
  
  .login-form label {
    display: block;
    font-weight: bold;
  }
  
  .login-form input[type="text"],
  .login-form input[type="password"] {
    width: 100%;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #ccc;
  }
  
  .btn {
    display: inline-block;
    padding: 5px 10px;
    background-color: #337ab7;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .btn-primary {
    background-color: #337ab7;
  }
  
  .btn-primary:hover {
    background-color: #286090;
  }
  .popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .popup-content {
        background-color: #fff;
        padding: 1rem;
        border-radius: 4px;
        text-align: center;
    }
  
  </style>
  
  