<template>
  <section class="login">
    <b-notification
      type="is-danger"
      aria-close-label="Close notification"
      role="alert"
      v-if="displayError">
      Falscher Benutzername und/oder Passwort
    </b-notification>
    <b-field label="Username"
             type="text">
      <b-input value="" maxlength="30" v-model="username"></b-input>
    </b-field>

    <b-field label="Password">
      <b-input type="password"
               value=""
               password-reveal
               v-model="password">
      </b-input>
    </b-field>
    <b-button type="is-primary" @click="login">Login</b-button>
  </section>
</template>

<script>
  import Vue from 'vue'
  import hash from 'hash.js'
  import axios from 'axios'

  export default {
    name: "login",
    data () {
      return {
        fetchedUser: null,
        displayError: false,
        username: '',
        password: ''
      }
    },
    methods: {
      login () {
        this.$cookies.set('userName', this.username);
        this.retrievUserWithName(this.username, this.password)
      },

      retrievUserWithName: async function (username, password) {
        const hashedPassword = hash.sha256().update(password).digest('hex')

        const user = {
          username,
          password: hashedPassword
        }

        await axios.post('http://161.35.215.83/api/user', user).then(function (response) {
          this.fetchedUser = response.data
        }.bind(this))

        if (!this.fetchedUser) {
          this.displayError = true;
        } else {
          this.$router.push('/patients')
        }
      }
    }
  }
</script>

<style scoped>
  .login {
    margin-top: 32px;
  }
</style>
