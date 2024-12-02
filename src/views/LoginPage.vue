<template>
  <div class="w-screen h-screen bg-slate-100 flex justify-center items-center">
    <div class="relative w-[500px] h-[600px] bg-white rounded-md border-[2px] border-slate-300 flex flex-col items-center px-16 py-8">
      <h1 class="text-black font-bold">Olá</h1>
      <h1 class="font-regular text-lg text-sky-500">Bem-vindo de volta!</h1>

      <form @submit.prevent="login" class="p-0 w-full">
        <div class="flex flex-col justify-between w-full h-[150px] mt-24">
          <div class="relative">
            <span class="transition-all duration-300 px-2 bg-white absolute start-[15px] top-[-13px] text-slate-600 font-regular"
                  :class="{ 'desce': !temEmail }">E-mail ou Usuário</span>
            <!-- Alterado tipo de input para text -->
            <input required type="text" v-model="email.value" @input="verificaEmail"
                   class="rounded-sm px-[12px] py-[12px] text-xl border-[2px] border-slate-300 w-full">
          </div>
          <div class="relative">
            <span class="transition-all duration-300 px-2 bg-white absolute start-[15px] top-[-13px] text-slate-600 font-regular"
                  :class="{ 'desce': !temSenha }">Senha</span>
            <input required type="password" v-model="password.value" @input="verificaSenha"
                   class="rounded-sm px-[12px] py-[12px] text-xl border-[2px] border-slate-300 w-full">
          </div>
        </div>
        <p v-if="errorMessage" class="errorMessage mt-4">{{ errorMessage }}</p>
        <div class="w-full mt-8">
          <button type="submit" value="Entrar"
                  class="w-full font-regular text-white bg-sky-500 py-4 text-2xl hover:bg-sky-400">Login</button>
        </div>
      </form>
      <div class="w-full absolute start-[20px] bottom-[20px]">
        <img class="w-[100px] h-auto" src="../assets/logo.png" alt="">
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
      temSenha: false,
      temEmail: false
    };
  },
  methods: {
    verificaSenha() {
      this.temSenha = this.password.value.length > 0;
    },
    verificaEmail() {
      this.temEmail = this.email.value.length > 0;
    },
    async login() {
      this.errorMessage = "";
      this.validateEmailOrUsername();
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
          body: JSON.stringify({ emailOrUsername: this.email.value, senha: this.password.value }),
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
    validateEmailOrUsername() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(this.email.value)) {
        this.email.error = false;
      } else if (this.email.value.length < 3) {
        this.email.error = true;
      } else {
        this.email.error = false;
      }
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

<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: 1px solid #ccc;
  /* Ajuste conforme necessário */
  -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  -webkit-text-fill-color: #000 !important;
  transition: background-color 5000s ease-in-out 0s;
}

.desce {
  top: 15px;
  transform: scale(1.2);
}
</style>
