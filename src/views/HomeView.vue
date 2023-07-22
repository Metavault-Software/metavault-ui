<template>
  <div class="home">
    <div class="row">
      <div class="col-4">
        <h3>Agents</h3>
        <draggable
          :list="taskSpecs"
          class="dragArea list-group"
          :item-key="id"
          ghost-class="ghost"
          :group="{ name: 'taskList', pull: 'clone', put: false }"
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
        <draggable
          class="dragArea list-group"
          :list="tasks"
          group="taskList"
          ghost-class="ghost"
          item-key="id"
        >
          <template #item="{element}">
            <div>
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
              <NestedDraggable :tasks="element.children" />
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
 import draggable from 'vuedraggable';
 import NestedDraggable from '@/components/NestedDraggable';

export default {
  name: 'HomeView',
  components: {
    draggable,
    NestedDraggable
  },
  data() {
    return { 
      taskSpecs: [ 
        {id: 1, name: "OpenAI Chat Task"}, 
        { id: 2, name:"Google Translation Task"},
        {id: 3, name: "WebSocket Server Task"}, 
      ],
      tasks: [
        {id: 4, name: "OpenAI Chat Task", children: [{id: 6, name: "child", children: [{id: 7, name: "grandchild"}]}]}, 
        {id: 5, name: "One Child Task", children: [{id: 6, name: "child"}]},
        {id: 5, name: "No Child Task", children: []}
      ]
    }
},
methods: {
  
}
};
</script>

<style>
.card {
  width: 360px;
}

</style>