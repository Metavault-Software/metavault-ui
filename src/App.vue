<template>
  <div
      class="d-flex"
      :class="{'content-nonav': hideNav}"
  >
    <side-nav v-if="!hideNav"/>
    <div class="w-100" :class="{'content': !hideNav}">
      <!-- Show the SignIn component when the user is not logged in -->
      <template v-if="!$auth.isLoggedIn">
        <sign-in/>
      </template>
      <!-- Show the router view for other routes when the user is logged in -->
      <template v-else>
        <router-view/>
      </template>
    </div>
  </div>
</template>

<script>
import SideNav from "./components/SideNav/SideNav.vue";
import SignIn from "./components/SignIn.vue"; // Make sure this path is correct

export default {
  name: "App",
  components: {
    SideNav,
    SignIn, // Make sure to include the SignIn component here
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
