<template>
  <div class="home">
    <div class="container">
      <h1>Home</h1>
      <div>
        <button
          class="btn btn-primary text-white"
          @click="createWorkflow"
        >
          Create Workflow
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';


export default {
  name: 'HomeView',
  components: {
    
  },
  data() {
    return { 
      
    }
  },
  methods: {
    createWorkflow: function() {
      router.push({ name: 'workflows'})
    }
  }
}; 
</script>