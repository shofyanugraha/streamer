<template>
  <div id="default-layout">
    <Navbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/global/Navbar/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
}
.logo {
  position: absolute;
  top: 1.5rem;
  left: 0;
}
.column.is-4 {
  height: 100vh;
  align-items: center;
  display: flex;
  > * {
    flex: none;
    width: 100%;
  }
}
</style>
