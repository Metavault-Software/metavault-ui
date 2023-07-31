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
            v-model="searchText"
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
        <PropertiesPanel
          :task="selectedTask"
          @update-task="updateTask"
        />
      </div> 
    </div>

    <WorkflowFooter />
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import NestedDraggable from '@/components/NestedDraggable';
import WorkflowFooter from '@/components/WorkflowFooter';
import PropertiesPanel from '@/components/PropertiesPanel';
import { useTaskStore } from "@/stores/tasks";
import { mapState, mapActions } from "pinia";
import MetavaultIcon from "@/components/MetaVaultIcon"

export default {
  name: 'HomeView',
  components: {
    draggable,
    NestedDraggable,
    WorkflowFooter,
    PropertiesPanel,
    MetavaultIcon
  },
  data() {
    return { 
      tasks: [],
      nextId: 0,
      searchText: "",
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
        name: clone.name,
        args: clone.args,
        children: []
      }
    }, 
    searchAgents: function (evt) {
      if (evt.data == null){
        this.filteredTaskSpecs = this.taskSpecs;
      }else {
        this.filteredTaskSpecs = this.taskSpecs.filter(x => x.name.toLowerCase().includes(this.searchText.toLowerCase()));
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

      while (targetElement != null) {
        if (targetElement.classList.contains("list-group-item")){

          if (this.selectedTask && this.selectedTask.id === item.id) {
            targetElement.classList.remove("bg-secondary");

            this.selectedElement = null;
            this.selectedTask = null;

            return;
          }

          if (this.selectedElement) {
            this.selectedElement.classList.remove("bg-secondary");
          }
          
          targetElement.classList.add("bg-secondary");
          this.selectedElement = targetElement;
          break;
        }
        targetElement = targetElement.parentElement;
      }

      this.selectedTask = item;
    },

    updateTask(updatedTask) {
      this.updateTaskInList(this.tasks, updatedTask);
    },
    updateTaskInList(taskList, updatedTask) {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id === updatedTask.id) {
        Object.assign(taskList[i], updatedTask);
        return true;
      } 
      else if (taskList[i].children && taskList[i].children.length > 0) {
        if (this.updateTaskInList(taskList[i].children, updatedTask)) {
          return true;
        }
      }
    }
    return false;
  }
  }
}; 
</script>