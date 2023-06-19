<script>
  export default {
    data() {
      return {
        form: {
          firstname: '',
          surname: '',
          email: '',
          subject: '',
          message: ''
        },
        goodWarning: false,
      };
    },
    methods: {
        checkFirstname(firstname){
            const regex = /^(?!^\s)[a-zA-Z]+(?:\s[a-zA-Z]+){0,2}$/
            return regex.test(firstname)
        },
        checkSurname(surname){
            const regex = /^(?!^\s)[a-zA-Z]+(?:\s[a-zA-Z]+){0,2}$/
            return regex.test(surname)
        },
        checkEmail(email) {
            const regex = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(email)
        },
        checkSubject(subject){
            const regex = /^(?!.*\s{2})[A-Za-z\s]{1,20}$/;
            return regex.test(subject)
        },
        checkMessage(message){
            const regex = /^(?!.* {2,})[A-Za-z0-9\s.,]{10,160}$/;
            return regex.test(message)
        },
        // Subida de formulario a localStorage
        submitForm() {
            if(this.checkFirstname(this.form.firstname) && this.checkSurname(this.form.surname)
            && this.checkEmail(this.form.email) && this.checkSubject(this.form.subject)
            && this.checkMessage(this.form.message)){
                
                localStorage.setItem("message",JSON.stringify(this.form));
                this.goodWarning = true;
                setTimeout(() => {
                this.goodWarning = false;
                this.$router.push(`/`)
            },2000)
            }
      },
      
    }
  };
</script>

<template>
    <!-- Pop Up Good -->
    <div class="popup" v-if="goodWarning">
        <div class="popup-content">
            <p>Mensaje enviado</p>
        </div>
    </div>

    <div class="register-container">
      <h2>Contacto</h2>
      <form @submit.prevent="submitForm" class="register-form">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input type="text" id="name" v-model="this.form.firstname" required>
          <span v-if="!checkFirstname(this.form.firstname)" class="errorMessage">Credenciales incorrectas</span>
        </div>
        <div class="form-group">
          <label for="surname">Apellidos:</label>
          <input type="text" id="surname" v-model="this.form.surname" required>
          <span v-if="!checkSurname(this.form.surname)" class="errorMessage">Credenciales incorrectas</span>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="this.form.email" required>
          <span v-if="!checkEmail(this.form.email)" class="errorMessage">Credenciales incorrectas</span>
        </div>
        <div class="form-group">
          <label for="subject">Asunto:</label>
          <input type="text" id="subject" v-model="this.form.subject" required>
          <span v-if="!checkSubject(this.form.subject)" class="errorMessage">Credenciales incorrectas</span>
        </div>
        <div class="form-group">
          <label for="message">Mensaje:</label>
          <textarea id="message" v-model="this.form.message" required></textarea>
          <span v-if="!checkMessage(this.form.message)" class="errorMessage">Credenciales incorrectas</span>
        </div>
        <div class="form-group">
          <button type="submit" class="buttonSubmit">Enviar</button>
        </div>
      </form>
    </div>
</template>
  
  
  
<style scoped>
.buttonSubmit{
  background-color: #D9043D;
  border: 0;
  border-radius: 5px;
  margin: auto;
  width: 100%;
  height: 40px;
}
.errorMessage {
  color: red;
}

.register-container {
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  width: 350px;
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
.register-form input[type="number"],
.register-form textarea {
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
  