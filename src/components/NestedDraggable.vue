<template>
  <draggable
    class="dragArea list-group"
    :list="tasks"
    :group="groupName"
    ghost-class="ghost"
    :item-key="task => task.id"
  >
    <template #item="{element}">
      <div :class="padded? 'px-5': ''">
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
              class="btn btn-primary text-white"
              @click="$emit('editProperties', $event)"
            >Edit Properties</a>
            <a
              href="#"
              class="btn btn-danger text-white"
              @click="removeItem(element)"
            >Remove</a>
          </div>
        </div>
        <NestedDraggable
          :tasks="element.children"
          :group-name="groupName"
          :padded="true"
          @remove="$emit('remove', $event)"
          @edit-properties="$emit('editProperties', $event)"
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
    },
    groupName: {
      required: true,
      type: String
    },
    padded: {
      required: false,
      default: false,
      type: Boolean
    }
  },
  emits: ['remove', 'editProperties'], 
  data() {
    return {
    }
  },
  methods: {
    removeItem: function (item) {
      this.$emit('remove', { item, list: this.tasks });
    }
  }

};
</script>
<style scoped>
.dragArea {
  min-height: 1rem;
  border: 1px dashed #dee2e6;
  border-radius: 0.25rem;
  margin: 1rem;
}

.ghost {
  opacity: 0.4;
}

.card {
  margin-bottom: 1rem;
}
</style>