<template>
  <draggable
    class="dragArea list-group"
    :list="tasks"
    :group="groupName"
    ghost-class="ghost"
    :item-key="task => task.id"
  >
    <template #item="{element}">
      <div>
        <div
          class="list-group-item"
          @click="editProperties($event,element)"
        >
          <div class="row">
            <div class="col-10">
              <h5>
                {{ element.name }}
              </h5>
            </div>
            <div class="col-1">
              <a
                href="#"
                class="btn btn-danger text-white"
                @click="removeItem(element)"
              >R</a>
            </div>
          </div>
        </div>
        <NestedDraggable
          :tasks="element.children"
          :group-name="groupName"
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
    },
    editProperties: function ($event, item) {
     
      this.$emit('editProperties', {$event, item, list: this.tasks});
    },
  }

};
</script>
<style scoped>
.dragArea {
  min-height: 1rem;
  margin-left: 2rem;
}

.ghost {
  opacity: 0.4;
}
.list-group-item {
  width: 480px;
}
</style>