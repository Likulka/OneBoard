<template>
  <div>
    <h2>Вход</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
    </form>
    <RouterLink to="/register">Register</RouterLink>

  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        });
        const data = await response.json();
        console.log(data)
        if (data) {
          localStorage.setItem('token', data.token);
          // Перенаправление на защищенную страницу
          this.$router.push('/dashboard');
        } else {
          alert('Ошибка входа: ' + data.message);
        }
      } catch (error) {
        alert('Ошибка сети');
      }
    }
  }
};
</script>
