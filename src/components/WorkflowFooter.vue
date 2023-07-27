<template>
  <div class="row">
    <div class="col-12">
      <button
        type="button"
        class="btn btn-outline-primary btn-lg m-4"
      >
        Submit
      </button>
      <button
        type="button"
        class="btn btn-outline-primary btn-lg m-4"
      >
        Pause All
      </button>
      <button
        type="button"
        class="btn btn-outline-primary btn-lg m-4"
      >
        Resume All
      </button>
      <button
        type="button"
        class="btn btn-outline-primary btn-lg m-4"
      >
        Delete All
      </button>
      <button
        type="button"
        class="btn btn-outline-primary btn-lg m-4"
      >
        Save As
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WorkflowFooter",
  }
</script>

<style scoped>
  .btn-outline-primary:hover {
    color: white;
  }
</style>