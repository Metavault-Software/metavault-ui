import { defineStore } from 'pinia';
import axios from "@/utilities/axios-config";

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    taskSpecs: []
  }),

  actions: {
    async fetchTaskSpecs() {
      const response = await axios.get("/tasks");
      var index = 0;

      response.data.forEach((item) => {
        console.log(item);
        var task = {
          id: index,
          taskId: item.Id,
          name: item.Name,
          args: item.Args,
          children: []
        }
        
        index++;
        this.taskSpecs.push(task);
      }); 

    }
  }
});