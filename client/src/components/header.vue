<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4" dark>Chat App</v-toolbar-title>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Home</v-btn>
    </v-toolbar-items>
      <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat @click="navigateTo({name:'login'})" v-if="!$store.state.isUserLoggedIn">
        Sign In
      </v-btn>
      <v-btn flat @click="navigateTo({name:'register'})" v-if="!$store.state.isUserLoggedIn">
        Sign Up
      </v-btn>
      <v-btn flat @click="logout" v-if="$store.state.isUserLoggedIn">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({name: 'login'})
    }
  }
}
</script>
