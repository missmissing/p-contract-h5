<template>
  <transition name="slide">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>

<script>
  export default {
    name: 'app'
  };
</script>

<style></style>
