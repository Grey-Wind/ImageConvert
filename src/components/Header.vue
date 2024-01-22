<script setup>
import Heading from './Heading.vue'
import { RouterLink } from "vue-router";
</script>

<template>
  <header>
    <img alt="Developer Tools logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <Heading msg="开发者工具" />

      <nav>
        <RouterLink to="/">主页</RouterLink>
        <RouterLink to="/about">关于</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>

</style>