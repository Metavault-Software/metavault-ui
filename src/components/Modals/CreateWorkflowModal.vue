<template>
  <div
    ref="createWorkflowModal"
    class="modal fade"
    tabindex="-1"
    aria-hidden="true"
  > 
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Create Workflow
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <label
            for="workflow-name"
            class="form-label"
          >New Workflow Name</label>
          <div class="input-group">
            <input
              id="workflow-name"
              v-model="workflowName"
              type="text"
              class="form-control"
            >
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="createWorkflow"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as bootstrap from "bootstrap";
  import router from "@/router";

  export default {
    name: "CreateWorkflowModal",
    data() {
      return {
        modal: null,
        workflowName: ""
      }
    },
    methods: {
      showModal: function() {
        if (this.modal == null) {
          this.modal = bootstrap.Modal.getOrCreateInstance(this.$refs.createWorkflowModal);
        }
        this.modal.show();
      },
      createWorkflow: function() {
        this.modal.hide();
        router.push({ name: 'workflows'});
      }
    }
  }
</script>