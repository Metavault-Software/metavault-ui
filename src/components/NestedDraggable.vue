<template>
  <draggable
    class="dragArea"
    :list="tasks"
    :group="{ name: 'g1' }"
    :item-key="id"
  >
    <template #item="{element}">
      <div class="px-5">
        <div class="card list-group-item">
          <div class="card-body">
            <h5 class="card-title">
              {{ element.name }}
            </h5>
            <p class="card-text">
              {{ element.description }}
            </p>
            <a
              href="#"
              class="btn btn-primary"
            >Go somewhere</a>
          </div>
        </div>
        <NestedDraggable
          v-if="element.children"
          :tasks="element.children"
        />
      </div>
    </template>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";

export default {
  name: "NestedDraggable",
  components: {
    draggable
  },
  props: {
    tasks: {
      required: true,
      type: Array
    }
  }

};
</script>
<style scoped>
</style>