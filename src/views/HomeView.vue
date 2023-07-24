<template>
  <div class="home">
    <div class="row">
      <div class="col-4">
        <h3>Agents</h3>
        <draggable
          :list="taskSpecs"
          class="dragArea list-group"
          :item-key="task => task.id"
          ghost-class="ghost"
          :group="{ name: 'taskList', pull: 'clone', put: false }"
          :clone="taskCloned"
        >
          <template #item="{element}">
            <div class="card list-group-item">
              <div class="card-body">
                <h5 class="card-title">
                  {{ element.name }}
                </h5>
                <p class="card-text">
                  {{ element.description }}
                </p>
              </div>
            </div>
          </template>
        </draggable>
      </div>

      <div class="col-8">
        <h3>Current Process</h3>
        <NestedDraggable
          :tasks="tasks"
          group-name="taskList"
          @remove="removeTask"
        />
      </div>
    </div>
  </div>
</template>

<script>
 import draggable from 'vuedraggable';
 import NestedDraggable from '@/components/NestedDraggable';
import { useTaskStore } from "@/stores/tasks";
import { mapState, mapActions } from "pinia";

export default {
  name: 'HomeView',
  components: {
    draggable,
    NestedDraggable
  },
  data() {
    return { 
      tasks: [],
      nextId: 0
    }
  },
  computed: {
    ...mapState(useTaskStore, ["taskSpecs"])
  },
  mounted: function () {
    this.fetchTaskSpecs();
  },
  methods: {
    ...mapActions(useTaskStore, ["fetchTaskSpecs"]),
    taskCloned: function(clone) {
      console.log(this.tasks);
      return {
        id: this.nextId++,
        taskId: clone.taskId,
        name: clone.name,
        children: []
      }
    }, 
    removeTask: function ({ item, list }) {
      const index = list.findIndex(t => t.id === item.id);
      if (index !== -1) {
        list.splice(index, 1);
      }
    },
  },
};
</script>


<style>
.card {
  width: 360px;
}

</style>