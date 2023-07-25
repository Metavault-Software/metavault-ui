<template>
  <div class="home">
    <div
      class="row"
      style="padding-left: 1em;"
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

      <div class="col-4">
        <h3>Workflow</h3>
        <NestedDraggable
          :tasks="tasks"
          group-name="taskList"
          @remove="removeTask"
          @edit-properties="editProperties"
        />
      </div>
      
      <PropertiesModal ref="propertiesModal" />
    </div> 
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import NestedDraggable from '@/components/NestedDraggable';
import { useTaskStore } from "@/stores/tasks";
import { mapState, mapActions } from "pinia";
import PropertiesModal from "@/components/Modals/PropertiesModal";
import MetavaultIcon from "@/components/MetaVaultIcon"

export default {
  name: 'HomeView',
  components: {
    draggable,
    NestedDraggable,
    PropertiesModal,
    MetavaultIcon
  },
  data() {
    return { 
      tasks: [],
      nextId: 0,
      filteredTaskSpecs: []
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
      console.log(this.tasks);
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
    removeTask: function ({ item, list }) {
      const index = list.findIndex(t => t.id === item.id);
      if (index !== -1) {
        list.splice(index, 1);
      }
    },
    editProperties: function() {
      this.$refs.propertiesModal.showModal();
    }
  },
}; 
</script>