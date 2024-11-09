<template>
  <header class="header">
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
    </nav>
    <div class="auth-info">
      <span v-if="isLoggedIn">Привет, {{ userName }}</span>
      <RouterLink v-else to="/login">Login</RouterLink>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoggedIn = ref(false);
const userName = ref('');

async function fetchUserData() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      // Запрос к API для получения данных пользователя
      const response = await fetch('http://localhost:5010/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        userName.value = data.name; // предполагаем, что имя пользователя приходит как data.name
        isLoggedIn.value = true;
      } else {
        console.error("Не удалось получить данные пользователя");
      }
    } catch (error) {
      console.error("Ошибка сети", error);
    }
  }
}


function logout() {
  localStorage.removeItem('token');
  isLoggedIn.value = false;
  userName.value = '';
  // Можно также перенаправить на страницу входа
}


onMounted(() => {
  fetchUserData();
});


</script>

<style scoped>
.header {
  background-color: #333;
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
}

.header nav a {
  color: #fff;
  margin-right: 1rem;
  text-decoration: none;
}

.header nav a:hover {
  text-decoration: underline;
}

.auth-info {
  font-size: 1rem;
  color: #fff;
}
</style>
