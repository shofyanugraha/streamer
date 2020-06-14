<template>
  <div id="auth-layout">
    <div class="container">
      <div class="columns is-centered is-vcentered is-mobile">
        <div class="column is-4-desktop is-10-mobile" id="auth-form">
            <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
};
</script>
<style lang="scss" scoped>
#auth-layout {
  height: 100vh;
  background: $light-blue;
  overflow: hidden;
}
.container {
  position: relative;
}
#auth-form {
  height: 100vh;
  align-items: center;
  display: flex;
  > * {
    flex: none;
    width: 100%;
  }
}
</style>
