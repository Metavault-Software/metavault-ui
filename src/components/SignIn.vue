<template>
  <div class="sign-in">
    <h2>Sign In</h2>
    <form @submit.prevent="signIn">
      <label>Email</label>
      <input type="email" v-model="email" required/>

      <label>Password</label>
      <input type="password" v-model="password" required/>

      <button @click="login">Sign In</button>
    </form>
  </div>
</template>


<script>
import axios from "axios";
import { useAuthStore } from "@/store.js";

export default {
  name: "SignIn",
  methods: {
    async login() {
      const store = useAuthStore();

      try {
        // Replace 'http://localhost:8080' with the actual URL of your backend server
        const response = await axios.post("https://valid-actor-393616.uc.r.appspot.com/api/v1/login", {
          email: this.email,
          password: this.password,
        });

        // Assuming the server returns a success response (e.g., status code 200),
        // update the login status using the store
        store.updateLoginStatus(true);

        // Optionally, you may want to save the user token or other data from the response
        // in local storage or cookies for future authenticated requests.

        // Redirect the user to the dashboard or any other authenticated page
        // using Vue Router's $router.push() method
        this.$router.push("/");
      } catch (error) {
        // Handle login errors, display error messages, etc.
        console.error("Login failed:", error);
      }
    },
  },
  async signIn() {
    const apiUrl = "https://valid-actor-393616.uc.r.appspot.com/api/v1/login"; // Replace this with your actual API URL

    const credentials = {
      email: "john.doe@example.com", // Replace with user-entered email
      password: "secure_password", // Replace with user-entered password
    };

    try {
      const response = await axios.post(apiUrl, credentials);
      console.log("Login response:", response.data);
      // Assuming the server returns a success response (e.g., status code 200),
      // update the login status using the store
      this.$store.dispatch("updateLoginStatus", true);

      // Optionally, you may want to save the user token or other data from the response
      // in local storage or cookies for future authenticated requests.

      // Redirect the user to the dashboard or any other authenticated page
      // using Vue Router's $router.push() method
      this.$router.push("/dashboard");
    } catch (error) {
      if (error.response) {
        console.error("Login error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  },
};
</script>

<style>
.sign-in {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.sign-in h2 {
  text-align: center;
  margin-bottom: 20px;
}

.sign-in label {
  display: block;
  margin-bottom: 5px;
}

.sign-in input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.sign-in button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.sign-in button:hover {
  background-color: #0056b3;
}
</style>
