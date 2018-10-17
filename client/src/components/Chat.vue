<template>
  <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 text-xs-center>
            <v-card class="elevation-12">
              <v-toolbar dark color="cyan">
                <v-toolbar-title>Chatting with {{$route.params.username}}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
            </v-card>
            <hr><br><br>
            <div class="messages" v-for="(msg, index) in messages" :key="index">
                <p><span class="font-weight-bold">{{ msg.from }}: </span>{{ msg.message }}</p>
            </div>
            <br><br><hr>
            <v-form autocomplete="off" @submit.prevent="sendMsg">
              <v-text-field
                name="message"
                v-model="message"
                type="text"
                label="Enter message here"
                id="message-box" />
              <v-btn flat color="primary" type="submit">Send</v-btn>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import io from 'socket.io-client'

export default {
  data () {
    return {
      messages: [],
      message: '',
      socket: io('localhost:8081')
    }
  },
  methods: {
    sendMsg (e) {
      this.socket.emit('SEND_MESSAGE', {
        from: this.$store.state.user.username,
        to: this.$route.params.username,
        message: this.message
      })
      this.message = ''
    }
  },
  mounted () {
    this.socket.on('MESSAGE', (msg) => {
      let username = this.$store.state.user.username
      if (username === msg.from || username === msg.to) {
        this.messages = [...this.messages, msg]
      }
    })
  }
}
</script>

<style scoped>
  #message-box{
    position: fixed;
    bottom: 100px;
  }
</style>
