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
                <v-toolbar-title>Chat</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <!-- <v-card-text>
              </v-card-text> -->
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
export default {
  date () {
    return {

    }
  }
}
</script>

<style scoped>
</style>
