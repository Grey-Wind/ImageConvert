<script setup>
import Header from "../components/Header.vue";
</script>

<template>
  <Header />

  <div class="about">
    <h1>关于</h1>
    <p>本工具是一个基于</p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
