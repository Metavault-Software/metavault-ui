<template>
  <div class="home">
    <div class="container">
      <h1>Home</h1>
      <div>
        <button
          class="btn btn-primary text-white"
          @click="showCreateWorkflowModal"
        >
          Create Workflow
        </button>
      </div>
    </div>

    <CreateWorkflowModal ref="createWorkflow" />
  </div>
</template>

<script>
import CreateWorkflowModal from '@/components/Modals/CreateWorkflowModal.vue';

export default {
  name: 'HomeView',
  components: {
    CreateWorkflowModal
},
  data() {
    return { 
      
    }
  },
  methods: {
    showCreateWorkflowModal: function() {
      this.$refs.createWorkflow.showModal();
    }
  }
}; 
</script>