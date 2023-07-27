<template>
  <div
    class="workflows px-2"
    style="overflow: hidden;"
  >
    <div
      class="row"
    >
      <div class="col-3">
        <h3>Agents</h3>
        
        <div
          class="input-group"
          style="padding-bottom: 1em;"
        >
          <span class="input-group-text"><metavault-icon name="search" /></span>
          <input
            class="form-control search-input"
            type="search"
            placeholder="search"
            aria-label="Search"
            @input="searchAgents"
          >
        </div>
        
        <draggable
          :list="filteredTaskSpecs"
          class="dragArea list-group"
          :item-key="task => task.id"
          ghost-class="ghost"
          :group="{ name: 'taskList', pull: 'clone', put: false }"
          :clone="taskCloned"
        >
          <template #item="{element}">
            <div class="list-group-item">
              <h5>
                {{ element.name }}
              </h5>
            </div>
          </template>
        </draggable>
      </div>

      <div
        class="col-5"
      >
        <h3>Workflow</h3>
        <div
          style="overflow: auto; height: 85vh;"
        >
          <NestedDraggable
            :tasks="tasks"
            group-name="taskList"
            @remove="removeTask"
            @edit-properties="editProperties"
          />
        </div>
      </div>
      
      <div class="col-4">
        <h3>Properties</h3>
        <div v-if="selectedTask">
          <p>id: {{ selectedTask.id }}</p>
          <p>taskID: {{ selectedTask.taskId }}</p>
          <p>name: {{ selectedTask.name }}</p>
          <p>args: {{ selectedTask.args }}</p>
        </div> 
      </div>
    </div>

    <WorkflowFooter />
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import NestedDraggable from '@/components/NestedDraggable';
import WorkflowFooter from '@/components/WorkflowFooter';
import { useTaskStore } from "@/stores/tasks";
import { mapState, mapActions } from "pinia";
import MetavaultIcon from "@/components/MetaVaultIcon"

export default {
  name: 'HomeView',
  components: {
    draggable,
    NestedDraggable,
    WorkflowFooter,
    MetavaultIcon
  },
  data() {
    return { 
      tasks: [],
      nextId: 0,
      filteredTaskSpecs: [],
      selectedTask: null,
      selectedElement: null
    }
  },
  computed: {
    ...mapState(useTaskStore, ["taskSpecs"])
  },
  mounted: function () {
    this.fetchTaskSpecs();

    this.filteredTaskSpecs = this.taskSpecs;
  },
  methods: {
    ...mapActions(useTaskStore, ["fetchTaskSpecs"]),
    taskCloned: function(clone) {
      return {
        id: this.nextId++,
        taskId: clone.taskId,
        name: clone.name,
        children: []
      }
    }, 
    searchAgents: function (evt) {
      if (evt.data == null){
        this.filteredTaskSpecs = this.taskSpecs;
      }else {
        this.filteredTaskSpecs = this.taskSpecs.filter(x => x.name.includes(evt.data));
      }
    },
    removeTask: async function ({ item, list }) {
      const index = list.findIndex(t => t.id === item.id);
      if (index !== -1) {
        list.splice(index, 1);
      }
    },
    editProperties: function({$event, item, list}) {
      let targetElement = $event.target;

      // Traverse up the DOM
      while (targetElement != null) {
        if (targetElement.classList.contains("list-group-item")){
          // If there is a currently selected element, remove the bg-secondary class from it
          if (this.selectedElement) {
            this.selectedElement.classList.remove("bg-secondary");
          }
          
          // Add the bg-secondary class to the newly selected element
          targetElement.classList.add("bg-secondary");
          
          // Update the currently selected element
          this.selectedElement = targetElement;
          break;
        }
        targetElement = targetElement.parentElement;
      }
      this.selectedTask = item;
    }
  },
}; 
</script>