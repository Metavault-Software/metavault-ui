import { defineStore } from 'pinia';
import axios from "@/utilities/axios-config";

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    taskSpecs: []
  }),

  actions: {
    async fetchTaskSpecs() {
      this.taskSpecs = [];
      const response = await axios.get("/agents");
      response.data.forEach((item) => {
        var task = {
          id: item.id,
          name: item.name,
          args: item.args,
          children: []
        }
        
        this.taskSpecs.push(task);
      }); 
      this.taskSpecs.sort((a, b) => a.id - b.id);
    }
  }
});