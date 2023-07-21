<template>
  <component
    :is="dynamicComponent"
    :class="iconSize()"
  />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "MetaVaultIcon",
  props: {
    name: {
      type: String,
      default: "home",
    },
    size: {
      type: String,
      default: "large",
      validator(value) {
        return ["extra-large","large", "medium", "small"].includes(value);
      },
    },
  },
  computed: {
    dynamicComponent() {
      const name = this.name + "-icon";

      return defineAsyncComponent(() =>
        import(`@/assets/svg/icons/${name}.vue`)
      );
    },
  },
  methods: {
    iconSize() {
      if (this.size === "small") {
        return "metavault-icon-small";
      } else if (this.size === "medium") {
        return "metavault-icon-medium";
      } else if (this.size === "large") {
        return "metavault-icon-large";
      } else if (this.size === "extra-large") {
        return "metavault-icon-extra-large";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.metavault-icon-extra-large {
  width: 32px;
  height: auto;
}
.metavault-icon-large {
  width: 24px;
  height: auto;
}
.metavault-icon-medium {
  width: 16px;
  height: auto;
}
.metavault-icon-small {
  width: 14px;
  height: auto;
}
</style>
