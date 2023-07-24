<template>
  <div
    ref="propertiesModal"
    class="modal fade"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">        
        <div class="modal-body p-0">          
          <div class="row m-0">
            <div class="col">
              <span>Properties</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as bootstrap from "bootstrap";

  export default {
    name: "PropertiesModal",
    data() {
      return {
        modal: null
      }
    },
    methods: {
      showModal: function() {
        console.log('HERE');
        if (this.modal == null) {
          this.modal = bootstrap.Modal.getOrCreateInstance(this.$refs.propertiesModal);
        }
        this.modal.show();
      }
    }
  }
</script>