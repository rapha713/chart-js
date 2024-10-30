<template>
    <div id="app" class="login-page">
      <div class="loginBox">
        <div class="inner">
          <div class="signIn" v-if="signIn">
            <div class="top">
              <img class="logo" src="../assets/logo.png" />
              <div class="title" style="font-weight: bold; margin-top: 20px; color: #000;">Login</div>
            </div>
            <form @submit.prevent="login">
              <div class="form">
                <input
                  required
                  type="email"
                  placeholder="Email"
                  v-model="email.value"
                  @blur="validateEmail"
                  @keydown="validateEmail"
                  :class="{ invalid: email.error }"
                />
                <input
                  required
                  type="password"
                  placeholder="Senha"
                  v-model="password.value"
                  @blur="validatePassword"
                  @keydown="validatePassword"
                  :class="{ invalid: password.error }"
                />
              </div>
  
              <input
                type="submit"
                value="Entrar"
                class="action"
                :class="{ 'action-disabled': !loginValid }"
                :disabled="!loginValid"
              />
              <p v-if="errorMessage" class="errorMessage">{{ errorMessage }}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
  export default {
    data() {
      return {
        email: { value: "", error: false },
        password: { value: "", error: false },
        signIn: true,
        errorMessage: "",
      };
    },
    methods: {
      async login() {
        this.errorMessage = "";
        this.validateEmail();
        this.validatePassword();
  
        if (this.email.error || this.password.error) {
          this.errorMessage = "Por favor, preencha todos os campos.";
          return;
        }
  
        try {
          const response = await fetch('https://restrito.consorcioapice.com.br/apiadmin/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: this.email.value, senha: this.password.value }),
          });
  
          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('isAuthenticated', 'true');
            this.$router.push({ name: 'Dashboard' });
          } else {
            const errorData = await response.json();
            this.errorMessage = errorData.message || 'Erro desconhecido. Tente novamente.';
          }
        } catch (error) {
          console.error('Erro ao fazer login:', error);
          this.errorMessage = 'Erro ao conectar ao servidor.';
        }
      },
      validateEmail() {
        this.email.error = !this.email.value;
      },
      validatePassword() {
        this.password.error = !this.password.value;
      }
    },
    computed: {
      loginValid() {
        return this.email.value && this.password.value;
      }
    }
  };
</script>  
  
  <style lang="scss">
  .login-page {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, rgba(96, 108, 136, 1) 0%, rgba(63, 76, 107, 1) 100%);
  }
  
  @mixin box {
    box-shadow: 1px 1px 2px 1px #ccc;
  }
  
  @mixin field {
    border: 1px solid #aaa;
    height: 40px;
    padding: 10px;
    margin-top: 20px;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  input[type="text"], input[type="email"], input[type="password"] {
    @include field;
  }
  
  .invalid {
    border: 2px solid red !important;
    &::placeholder {
      color: red;
    }
  }
  
  .errorMessage {
    color: red;
    margin: 10px;
    top: 5px;
  }
  
  .w100 {
    width: 100%;
  }
  
  .logo {
    width: 300px;
    margin-bottom: 10px;
  }
  
  .action {
    height: 40px;
    text-transform: uppercase;
    border-radius: 25px;
    width: 100%;
    border: none;
    cursor: pointer;
    background: green;
    margin-top: 20px;
    color: #fff;
    font-size: 1.2rem;
    @include box;
  }
  
  .action-disabled {
    color: #eee;
    background: #aaa;
    cursor: auto;
  }
  
  .top {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 10px;
  }
  
  .title {
    width: 100%;
    font-size: 1.8rem;
    margin-bottom: 10px;
    text-align: center;
  }
  
  .loginBox {
    background: #fff;
    border-radius: 15px;
    max-width: 400px;
    padding: 25px 55px;
    animation: slideInTop 1s;
  }
  
  @keyframes slideInTop {
    from {
      opacity: 0;
      transform: translateY(-30%);
    }
    to {
      opacity: 100;
      transform: translateY(0%);
    }
  }
  
  @media screen and (min-width: 440px) {
    .loginBox {
      @include box;
    }
  }
  
  @media screen and (max-width: 440px) {
    .loginBox {
      padding: 25px 25px;
      max-width: 100vw;
    }
  }
  </style>  