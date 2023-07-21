<template>
  <div
    class="d-flex"
    :class="{'content-nonav': hideNav}"
  >
    <side-nav v-if="!hideNav" />
    <router-view
      class="w-100"
      :class="{'content': !hideNav}"
    />
  </div>  
</template>

<script>
import SideNav from "./components/SideNav/SideNav.vue";

export default {
  name: "App",
  components: {
    SideNav
  },
  computed: {
    hideNav: function () {
      return this.$router.currentRoute.value.meta.hideNav === true;
    }
  },
};
</script>

<style lang="scss">
.content {
  height: 100vh;
  overflow: auto;
}
.content-nonav {
  height: 100%;
  min-height: 100%;
  overflow: auto;
}
</style>
