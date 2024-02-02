<script setup>
import Header from "../components/Head/Header.vue";
</script>

<template>
    <Header />

    <div class="about">
      <h1>关于</h1>
      <p>本站点是一个基于Vue 3实现的一个综合性工具站。</p>
    </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
}

p {
  font-size: 17px;
}
</style>
