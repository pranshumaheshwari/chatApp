<template>
  <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 text-xs-center>
            <v-alert :value="error" type="error">
              {{ error }}
            </v-alert>
            <v-alert :value="success_msg" type="success">
              {{ success_msg }}
            </v-alert>
            <v-card class="elevation-12">
              <v-toolbar dark color="cyan">
                <v-toolbar-title>Add Friend</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-text-field
                  name="username"
                  label="Username"
                  type="text"
                  v-model="friendUsername"
                  prepend-icon="person"
                  outline
                  :rules='[required]'
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                  <v-btn large round color="primary" id="id" @click="sendRequest">Search</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import FriendsServices from '@/services/FriendsServices'
export default {
  data () {
    return {
      friendUsername: '',
      error: null,
      success_msg: null,
      required: (value) => !!value || 'Required'
    }
  },
  methods: {
    async sendRequest () {
      const response = await FriendsServices.sendReq({
        friendUsername: this.friendUsername,
        myUsername: this.$store.state.user.username
      })
      if (response.data.error) {
        this.error = response.data.error
      } else {
        this.success_msg = response.data.success_msg
      }
    }
  }
}
</script>

<style scoped>
#id {
  margin: 0 auto;
}
</style>
