<script>
import {fetchDataFromApi} from '../helpers/apiHelper.js'

export default {
  data() {
    return {
        url:'https://apimotogp2023-production.up.railway.app/api/users',
        formData: {
            userName: '',
            firstname: '',
            surname: '',
            age: 0,
            email: '',
            password: '',
        },
        users: [],
        goodWarning: false,
        badWarning: false,
    };
  },
  methods: {
    async getDataFromApi() {
        try {
          const data = await fetchDataFromApi(this.url);
          this.users = data
          
        } catch (error) {
          console.error('Error al obtener los datos de la API:', error);
        }
    },
    async registerUser(){
        try {
            const duplicateUser = this.users.some(
                (user) => user.userName === this.formData.userName
            );

            const duplicateEmail = this.users.some(
                (user) => user.email === this.formData.email
            );

            if(duplicateUser || duplicateEmail) {
                this.badWarning = true
                setTimeout(() => {
                    this.badWarning = false;
                },2000)
            }else{
                const data = await fetch(this.url,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.formData),
                });
                 if (data.ok){
                    this.goodWarning = true
                setTimeout(() => {
                    this.goodWarning = false;
                    this.$router.push("/login")

                },2000)
                }else{
                    console.log('Peticion MAL MAL MAL')
                }   
            }
        }catch (error){
            console.log(error)
        }
    },
  },
  created() {
    this.getDataFromApi();
  }
};
</script>

<template>
    <!-- Pop Up Good -->
    <div class="popup" v-if="goodWarning">
        <div class="popup-content">
            <p>Usuario registrado correctamente</p>
        </div>
    </div>
    <!-- Pop Up Bad -->
    <div class="popup" v-if="badWarning">
        <div class="popup-content">
            <p>Credenciales incorrectas</p>
        </div>
    </div>


    <div class="register-container">
      <h2>Registro</h2>
      <form @submit.prevent="registerUser" class="register-form">
        <div class="form-group">
          <label for="userName">Nombre de usuario:</label>
          <input type="text" id="userName" v-model="formData.userName" required>
        </div>
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input type="text" id="firstname" v-model="formData.firstname" required>
        </div>
        <div class="form-group">
          <label for="lastName">Apellidos:</label>
          <input type="text" id="surname" v-model="formData.surname" required>
        </div>
        <div class="form-group">
          <label for="age">Edad:</label>
          <input type="number" id="age" v-model="formData.age" required>
        </div>
        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input type="email" id="email" v-model="formData.email" required>
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="formData.password" required>
        </div>
        <button type="submit" class="btn btn-primary">Registrar</button>
      </form>
    </div>
  </template>
  
<style>
    .register-container {
        width: 300px;
        margin: 100px auto 0;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
    }
    
    h2 {
        text-align: center;
        margin-bottom: 20px;
    }
    
    .register-form .form-group {
        margin-bottom: 15px;
    }
    
    .register-form label {
        display: block;
        font-weight: bold;
    }
    
    .register-form input[type="text"],
    .register-form input[type="email"],
    .register-form input[type="password"],
    .register-form input[type="number"]{
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
  