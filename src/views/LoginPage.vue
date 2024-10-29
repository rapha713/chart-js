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
  
          <div class="register" v-else>
            <div class="top">
              <img
                class="logo"
                src="https://res.cloudinary.com/dc3c8nrut/image/upload/v1685298768/logo-placeholder_l3yodl.png"
              />
              <div class="title">Criar Conta</div>
              <div class="subtitle">
                Já tem uma conta?
                <span class="subtitle-action" @click="signIn = true">Login</span>
              </div>
            </div>
  
            <div class="form">
              <input type="text" placeholder="Nome" v-model="firstName" class="w100" />
              <input type="text" placeholder="Sobrenome" v-model="lastName" class="w100" />
              <input type="text" placeholder="Email" v-model="email.value" :class="{ invalid: email.error }" />
              <input type="password" placeholder="Senha" v-model="password.value" :class="{ invalid: password.error }" />
            </div>
  
            <button class="action" :class="{ 'action-disabled': !registerValid }" @click="createAccount">
              Criar Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        firstName: "",
        lastName: "",
        email: { value: "", error: false },
        password: { value: "", error: false },
        signIn: true,
        errorMessage: "",
      };
    },
    methods: {
      login() {
        if (this.email.value === 'user@example.com' && this.password.value === 'password123') {
          localStorage.setItem('isAuthenticated', 'true');
          this.$router.push({ name: 'Dashboard' });
        } else {
          this.errorMessage = 'Email ou senha incorretos.';
        }
      },
      createAccount() {
        console.log('Criar conta: ', this.firstName, this.lastName, this.email.value, this.password.value);
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
      },
      registerValid() {
        return this.firstName && this.lastName && this.email.value && this.password.value;
      }
    }
  };
  </script>
  
<style lang="scss">
  .login-page {
  height: 100vh; /* Ocupa toda a altura da tela */
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
  
    .subtitle {
      .subtitle-action {
        color: green;
        font-weight: bold;
        cursor: pointer;
      }
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