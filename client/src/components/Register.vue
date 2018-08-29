<template>
  <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 text-xs-center>
            <v-card class="elevation-12">
              <v-toolbar dark color="cyan">
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form autocomplete="off">
                  <v-text-field name="login" label="E-mail" type="email" v-model="email"></v-text-field>
                  <v-text-field name="password" label="Password" id="password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="cyan" dark large @click="register">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationServices'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      const res = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(res.data)
    }
  }
}
</script>
<style scoped>
  .v-btn{
    margin: 0 auto;
  }
</style>
