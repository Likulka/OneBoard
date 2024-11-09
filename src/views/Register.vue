<template>
  <div class="register-container">
    <h2>Регистрация</h2>
    <form @submit.prevent="register">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Пароль" required />
      <button type="submit">Зарегистрироваться</button>
    </form>
    <RouterLink to="/login">Уже есть аккаунт? Войти</RouterLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        });
        const data = await response.json();
        if (data.success) {
          // Успешная регистрация, перенаправление на страницу входа
          this.$router.push('/login');
        } else {
          this.errorMessage = 'Ошибка регистрации: ' + data.message;
        }
      } catch (error) {
        this.errorMessage = 'Ошибка сети';
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1e1e1e; /* Темно-серый фон */
  color: #ffffff; /* Белый цвет текста */
}

h2 {
  margin-bottom: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

input {
  background-color: #333333; /* Темно-серый цвет полей ввода */
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

input::placeholder {
  color: #cccccc;
}

button {
  background-color: #4CAF50; /* Зеленая кнопка */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

a {
  color: #4CAF50;
  margin-top: 1rem;
  text-decoration: none;
  transition: text-decoration 0.3s ease;
}

a:hover {
  text-decoration: underline;
}

.error {
  color: #ff4d4d; /* Красный цвет для ошибок */
  margin-bottom: 1rem;
}
</style>
