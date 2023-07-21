import { defineStore } from 'pinia';

export const useSideNavStore = defineStore({
  id: 'sideNav',

  state: () => ({
    shouldCollapse: false,
  }),

  actions: {
    closeExpanded() {
      if (!this.shouldCollapse) {
        this.shouldCollapse = true;
      }
    },
    resetShouldCollapse() {
      this.shouldCollapse = false;
    }
  },
});
