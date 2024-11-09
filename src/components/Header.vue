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

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.name) {
    isLoggedIn.value = true;
    userName.value = user.name;
  }
});


</script>

<style scoped>
.header {
  background-color: #333;
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
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
