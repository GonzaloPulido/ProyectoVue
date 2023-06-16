<script>
import {fetchDataFromApi} from '../helpers/apiHelper.js'

export default {
    data() {
        return {
            userId: this.$store.state.userId,
            logedUser: {},
            users: [],
            goodWarning: false,
            badWarning: false,
            delWarning: false,
        }
    },
    methods: {
      async getUsers() {
        try {
          const data = await fetchDataFromApi(`https://apimotogp2023-production.up.railway.app/api/users`);
          this.users = data
        } catch (error) {
          console.error('Error al obtener los datos de la API:', error);
        }
      },
      async getDataFromApi() {
        try {
          const data = await fetchDataFromApi(`https://apimotogp2023-production.up.railway.app/api/users/${this.userId}`);
          this.logedUser = data
        } catch (error) {
          console.error('Error al obtener los datos de la API:', error);
        }
      },
      verifyAuth(){
          if(!this.$store.state.isLoggedIn){
            this.$router.push(`/`)
          }
      },
      checkUsername(userName) {
        const regex = /^[a-zA-Z]{5,10}$/;
        return regex.test(userName)
      },
      checkFirstname(firstname){
          const regex = /^(?!^\s)[a-zA-Z]+(?:\s[a-zA-Z]+){0,2}$/
          return regex.test(firstname)
      },
      checkSurname(surname){
          const regex = /^(?!^\s)[a-zA-Z]+(?:\s[a-zA-Z]+){0,2}$/
          return regex.test(surname)
      },
      checkAge(age){
          const regex = /^(1[1-9]|[2-9]\d|10\d|11[0-4])$/;
          return regex.test(age)
      },
      checkEmail(email) {
          const regex = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
          return regex.test(email)
      },
      checkPassword(password){
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{5,10}$/
          return regex.test(password)
      },
      async deleteUser(){
        const data = await fetch(`https://apimotogp2023-production.up.railway.app/api/users/${this.userId}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },})
        if (data.ok){
          this.delWarning = true
          setTimeout(() => {
            this.delWarning = false;
            this.$store.state.isLoggedIn = false
            this.$router.push(`/`)
          },2000)}
        },
      async updateUser(){
        try {
            if(this.checkUsername(this.logedUser.userName)&& this.checkFirstname(this.logedUser.firstname) && 
                    this.checkSurname(this.logedUser.surname) && this.checkAge(this.logedUser.age) && this.checkEmail(this.logedUser.email) 
                    && this.checkPassword(this.logedUser.password)) {
                const data = await fetch(`https://apimotogp2023-production.up.railway.app/api/users/${this.userId}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.logedUser),
                });
                if (data.ok){
                    this.goodWarning = true
                setTimeout(() => {
                    this.goodWarning = false;
                    

                },2000)
                }else{
                    console.log('BAD REQUEST')
                }   
            }
        }catch (error){
            console.log(error)
        }
    },
      
    },
    created(){
        this.getDataFromApi();
        this.getUsers();
        this.verifyAuth();

        
        
    } 
}
</script>


<template>
  <!-- Pop Up Good -->
  <div class="popup" v-if="goodWarning">
      <div class="popup-content">
          <p>Usuario actualizado correctamente</p>
      </div>
  </div>

  <!-- Pop Up Delete -->
  <div class="popup" v-if="delWarning">
      <div class="popup-content">
          <p>Usuario eliminado correctamente</p>
      </div>
  </div>

  <div class="register-container">
    <h2>Perfil</h2>
    <form @submit.prevent="updateUser()" class="register-form">
      <div class="form-group">
        <label for="userName">Nombre de usuario:</label>
        <input type="text" id="userName" v-model="logedUser.userName" required>
        <span v-if="!checkUsername(logedUser.userName)" class="errorMessage">Credenciales incorrectas</span>
      </div>
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="firstname" v-model="logedUser.firstname" required>
        <span v-if="!checkFirstname(logedUser.firstname)" class="errorMessage">Credenciales incorrectas</span>
      </div>
      <div class="form-group">
        <label for="lastName">Apellidos:</label>
        <input type="text" id="surname" v-model="logedUser.surname" required>
        <span v-if="!checkSurname(logedUser.surname)" class="errorMessage">Credenciales incorrectas</span>
      </div>
      <div class="form-group">
        <label for="age">Edad:</label>
        <input type="number" id="age" v-model="logedUser.age" required>
        <span v-if="!checkAge(logedUser.age)" class="errorMessage">Credenciales incorrectas</span>
      </div>
      <div class="form-group">
        <label for="email">Correo electrónico:</label>
        <input type="email" id="email" v-model="logedUser.email" required>
        <span v-if="!checkEmail(logedUser.email)" class="errorMessage">Credenciales incorrectas</span>
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="logedUser.password" required>
        <span v-if="!checkPassword(logedUser.password)" class="errorMessage">Credenciales incorrectas</span>
      </div>
      <div class="buttonContainer">
        <button type="submit" class="btn btn-success">Actualizar Datos</button>
        <button class="btn btn-danger" @click="deleteUser()">Eliminar usuario</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
  .buttonContainer{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .errorMessage{
      color: red;
  }
  .register-container {
      box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
      width: 400px;
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