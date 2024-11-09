<template>
  <div>
    <h2>Регистрация</h2>
    <form @submit.prevent="register">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Пароль" required />
      <button type="submit">Зарегистрироваться</button>
    </form>
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
    async register() {
      try {
        const response = await fetch('https://your-server.com/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        });
        const data = await response.json();
        if (data.success) {
          // Успешная регистрация, редирект на страницу входа
          this.$router.push('/login');
        } else {
          alert('Ошибка регистрации: ' + data.message);
        }
      } catch (error) {
        alert('Ошибка сети');
      }
    }
  }
};
</script>
