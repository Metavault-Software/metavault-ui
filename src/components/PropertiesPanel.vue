<template>
  <div
    class="task-properties"
    style="overflow-y: auto; max-height: 88vh;"
  >
    <div
      v-if="task"
      class="card"
    >
      <div class="card-header">
        <h3>Task Details</h3>
      </div>
      <div class="card-body">
        <p><strong>ID:</strong> {{ task.id }}</p>
        <p><strong>Name:</strong> {{ task.name }}</p>
        <h3>Arguments</h3>
        <div
          v-for="(value, key) in task.args"
          :key="key"
          class="form-group"
        >
          <label
            :for="key"
            class="form-label"
          >{{ key }}</label>
          <div v-if="Array.isArray(value)">
            <div
              v-for="(item, i) in value"
              :key="i"
            >
              <div v-if="isObject(item)">
                <div
                  v-for="(objValue, objKey) in item"
                  :key="objKey"
                  class="form-group"
                >
                  <label
                    :for="objKey"
                    class="form-label"
                  >{{ objKey }}</label>
                  <input
                    :id="objKey"
                    :value="objValue"
                    class="form-control"
                    @input="updateObjectInArrayArg(key, i, objKey, $event.target.value)"
                  >
                </div>
              </div>
              <input
                v-else
                :id="key"
                :value="item"
                class="form-control"
                @input="updateArrayArg(key, i, $event.target.value)"
              >
            </div>
            <button
              class="btn btn-primary text-white mt-2"
              @click="addArrayItem(key, value[0])"
            >
              Add
            </button>
          </div>
          <input
            v-else
            :id="key"
            :value="value"
            class="form-control"
            @input="updateArg(key, $event.target.value)"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertiesPanel',
  props: ['task'],
  emits: ['update-task'],
  methods: {
    updateArg(key, value) {
      this.$emit('update-task', {...this.task, args: {...this.task.args, [key]: value}});
    },
    updateArrayArg(key, index, value) {
      const updatedArray = [...this.task.args[key]];
      updatedArray[index] = value;
      this.$emit('update-task', {...this.task, args: {...this.task.args, [key]: updatedArray}});
    },
    updateObjectInArrayArg(key, index, objKey, objValue) {
      const updatedArray = [...this.task.args[key]];
      updatedArray[index] = {...updatedArray[index], [objKey]: objValue};
      this.$emit('update-task', {...this.task, args: {...this.task.args, [key]: updatedArray}});
    },
    addArrayItem(key, template) {
      const updatedArray = [...this.task.args[key]];
      if (this.isObject(template)) {
        updatedArray.push(this.emptyObject(template));
      } else {
        updatedArray.push('');
      }
      this.$emit('update-task', {...this.task, args: {...this.task.args, [key]: updatedArray}});
    },
    isObject(item) {
      return item && typeof item === 'object' && !Array.isArray(item);
    },
    emptyObject(template) {
      const empty = {};
      for (const key in template) {
        empty[key] = '';
      }
      return empty;
    }
  }
};
</script>
