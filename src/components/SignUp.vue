<template>
  <div class="sign-up">
    <h2>Sign Up</h2>
    <form @submit.prevent="signUp">
      <label>Email</label>
      <input type="email" v-model="email" required/>

      <label>Password</label>
      <input type="password" v-model="password" required/>

      <label>First Name</label>
      <input type="text" v-model="firstName" required/>

      <label>Last Name</label>
      <input type="text" v-model="lastName" required/>

      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };
  },
  methods: {
    signUp() {
      // Perform the sign-up logic here using an API call or other methods
      console.log('Signing up...');
    }
  }
};
</script>

<style>
.sign-up {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.sign-up h2 {
  text-align: center;
  margin-bottom: 20px;
}

.sign-up label {
  display: block;
  margin-bottom: 5px;
}

.sign-up input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.sign-up button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.sign-up button:hover {
  background-color: #0056b3;
}
</style>
