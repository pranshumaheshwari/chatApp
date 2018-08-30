<template>
  <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 text-xs-center>
            <v-alert :value="error" type="error">
              {{ error }}
            </v-alert>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 sm12 md8 text-xs-center>
            <v-card class="elevation-12">
              <v-toolbar dark color="cyan">
                <v-toolbar-title>Friends</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn flat icon class="green darken-2" fab @click="navigateTo({name: 'addfriend'})">
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-toolbar>
              <v-card-text v-if="!friends.length">
                <p>You dont have any friends.
                Add some!!</p>
              </v-card-text>
              <div v-for="friend in friends" :key="friend.username">
                <v-card-text>
                  {{ friend }}
                </v-card-text>
              </div>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md4 text-xs-center class="ml-4">
            <v-card class="elevation-12">
              <v-toolbar dark color="cyan">
                <v-toolbar-title>Pending Requests</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text v-if="!requests.length">
                <p>You dont have any friend requests.</p>
              </v-card-text>
              <div v-for="friend in requests" :key="friend.username">
                <v-layout row wrap>
                  <v-btn
                    flat
                    color="primary"
                    class="center"
                    @click="acceptReq(friend)">
                    {{ friend }}
                  </v-btn>
                </v-layout>
              </div>
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
      friends: [],
      requests: [],
      error: null,
      required: (data) => !!data || 'Required'
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    loadData () {
      this.friends = this.$store.state.user.friends
      this.requests = this.$store.state.user.requests
    },
    async acceptReq (friendUsername) {
      var response = await FriendsServices.acceptReq({
        friendUsername: friendUsername,
        myUsername: this.$store.state.user.username
      })
      if (response.data.error) {
        this.error = response.data.error
      } else {
        this.loadData()
      }
    }
  },
  async mounted () {
    this.loadData()
  }
}
</script>
<style scoped>
.center{
  margin: 0 auto;
  height: 60px;
}
</style>
