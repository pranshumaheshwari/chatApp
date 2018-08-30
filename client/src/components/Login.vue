<template>
  <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 text-xs-center>
            <v-alert :value="error" type="error">
              {{ error }}
            </v-alert>
            <v-card class="elevation-12">
              <v-toolbar dark color="cyan">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form autocomplete="off">
                  <v-text-field name="username" label="Username" type="text" v-model="username" prepend-icon="person" outline :rules='[required]'></v-text-field>
                  <v-text-field name="password" label="Password" type="password" v-model="password" prepend-icon="lock" outline :rules='[required]'></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="cyan" dark large @click="login">Login</v-btn>
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
      username: '',
      password: '',
      error: null,
      required: (value) => !!value || 'Required'
    }
  },
  methods: {
    async login () {
      const res = await AuthenticationService.login({
        username: this.username,
        password: this.password
      })
      if (res.data.error) {
        this.error = res.data.error
      } else {
        this.$store.dispatch('setToken', res.data.token)
        this.$store.dispatch('setUser', res.data.user)
        this.$router.push({name: 'dashboard'})
      }
    }
  }
}
</script>
<style scoped>
  .v-btn{
    margin: 0 auto;
  }
</style>
