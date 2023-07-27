<template>
  <div>
    <div
      id="nav-collapse"
      class="collapse collapse-horizontal show p-0 d-none d-lg-block"
    >
      <div class="side-nav bg-white border-end">
        <nav class="navbar py-4 px-4 h-100">
          <div class="container-fluid h-100 align-items-start">
            <button
              id="nav-toggle"
              class="btn position-absolute top-0 end-0 border-0"
              data-bs-toggle="collapse"
              data-bs-target="#nav-collapse"
              aria-expanded="true"
              aria-controls="nav-collapse"
              type="button"
              @click="navCollapse()"
            >
              <MetaVaultIcon
                :name="navExpanded ? 'menu-close' : 'menu-open'"
                size="extra-large"
              />
            </button>
            <ul
              id="nav-items"
              class="navbar-nav mt-4"
            >
              <li
                v-for="item in navItems"
                :key="item"
                class="nav-item my-2"
              >
                <button
                  ref="navItemElements"
                  class="bg-transparent border-0"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  :aria-controls="'collapse' + item.name"
                  :data-bs-target="navExpanded ? '#collapse' + item.name : ''"
                  type="button"
                  @click="!item.children.length && manageSubMenus()"
                >
                  <router-link
                    class="nav-link fs-6 d-flex align-items-center"
                    :to="item.link"
                  >
                    <MetaVaultIcon
                      :name="item.icon"
                      class="nav-icon float-start mx-2"
                      has-fill
                    />
                    <span class="nav-text">{{ item.name }}</span>
                  </router-link>
                </button>
                <ul
                  v-if="item.children.length"
                  :id="'collapse' + item.name"
                  ref="collapsibleMenus"
                  class="collapse sub-nav-items"
                  data-bs-parent="#nav-items"
                >
                  <li
                    v-for="child in item.children"
                    :key="child"
                    class="my-2"
                  >
                    <router-link
                      :to="child.link"
                      class="text-decoration-none sub-nav-item d-flex align-items-center"
                    >
                      <div style="width:32px; text-align: center;">
                        <MetaVaultIcon
                          :name="child.icon"
                          size="medium"
                          class="float-start mx-2"
                        />
                      </div>
                      <span class="small-bold">{{ child.name }}</span>
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import MetaVaultIcon from "../MetaVaultIcon.vue";
import { mapActions, mapState } from "pinia";
import { useSideNavStore } from '@/stores/sideNav';

export default {
    name: "SideNav",
    components: { MetaVaultIcon },
    data() {
        return {
            navExpanded: true,
            navItems: [
                {
                    name: "Home",
                    link: "/",
                    icon: "home",
                    children: [],
                },
                {
                    name: "Workflows",
                    link: "/workflows",
                    icon: "workflow",
                    children: [],
                },
                {
                    name: "About",
                    link: "/about",
                    icon: "about",
                    children: [],
                },
            ]
        };
    },
    computed: {
        ...mapState(useSideNavStore, ["shouldCollapse"])
    },
    watch: {
        shouldCollapse: function (value) {
            if (value) {
                this.collapseExpandedSubMenus();
            }
        }
    },
    methods: {
        ...mapActions(useSideNavStore, ["resetShouldCollapse"]),
        navCollapse() {
            if (window.Intercom) {
                if (this.navExpanded) {
                    window.Intercom("update", {
                        horizontal_padding: "20",
                        vertical_padding: "20",
                    });
                }
                else {
                    window.Intercom("update", {
                        horizontal_padding: "170",
                        vertical_padding: "30",
                    });
                }
            }
            this.navExpanded = !this.navExpanded;
            //collapse any expanded subitems before collapsing to icon menu
            if (this.navExpanded === false) {
                this.collapseExpandedSubMenus();
            }
        },
        manageSubMenus() {
            this.$nextTick(function () {
                this.collapseExpandedSubMenus();
            }.bind(this));
        },
        collapseExpandedSubMenus() {
            for (let item = 0; item < this.$refs.navItemElements.length; item++) {
                const navSubMenu = this.$refs.navItemElements[item];
                if (navSubMenu.getAttribute("aria-expanded") === "true") {
                    navSubMenu.click();
                }
                this.resetShouldCollapse();
            }
        },
        hideMobileNavOnClick() {
            this.$refs.mobileNavDismiss.click();
        },
    },
}
</script>

<style lang="scss" scoped>
.side-nav {
  width: $sidenav-width;
  min-width: $sidenav-width;
  color: grey;
  height: 100vh;
}

.side-nav #nav-toggle {
  display: none;
}

.side-nav:hover #nav-toggle {
  display: inherit;
}

.navbar {
  width: 100%;
}

.collapse-horizontal {
  transition-property: width, margin-left;
  transition-duration: 0s, 0.35s;
}

#nav-collapse {
  display: table;
  margin-left: (-$sidenav-width) + 4em;
  transition-property: width, margin-left;
  transition-duration: 0s, 0.35s;
  overflow: hidden;
}

#nav-collapse.show {
  margin-left: 0;
  transition: all 0.35s ease;
}

#nav-collapse #nav-items {
  margin-left: $sidenav-width - 6em;
  transition: all 0.35s ease;
}

#nav-collapse.show #nav-items {
  margin-left: 0em;
  transition: all 0.35s ease;
}

#nav-collapse .nav-text {
  transition-property: opacity;
  transition-delay: 0s;
  transition-duration: 0.35s;
  opacity: 0;
}

#nav-collapse.show .nav-text {
  transition-property: opacity;
  transition-delay: 0s;
  transition-duration: 0.35s;
  opacity: 100%;
}

#nav-collapse .nav-logo {
  opacity: 100%;
  margin-left: 5em;
  transition-property: opacity;
  transition-duration: 0.35s;
}

#nav-collapse.show .nav-logo {
  opacity: 0;
  transition-property: opacity;
  transition-duration: 0.35s;
}

svg {
  stroke: grey;
}

#nav-toggle, #nav-toggle[aria-expanded="true"] svg {
  stroke: grey !important;
}

#mobileNav {
  width: 100% !important;
  height: 100% !important;
  background-color: lightgrey;
}
</style>