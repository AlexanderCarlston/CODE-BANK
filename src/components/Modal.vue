<template>
  <v-layout justify-center>
    <v-dialog v-model="logIn" persistent max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="headline">{{User.userName}}'s gists. Choose what you want to import.</span>
        </v-card-title>
        <v-card-title>
            <v-checkbox 
            v-for="(code, index) in userGists"
            :key="code.id+index"
            :v-model="index"
            :label="code.files[Object.keys(code.files)[0]].filename"
            @change="addBankGist(code, code.id)"
            ></v-checkbox>
            <br/>
            <vue-embed-gist 
            v-for="code in bank" 
            :key="code.id"
            :gist-id="code.id"
            :file="code.files[Object.keys(code.files)[0]].filename"
            />
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" flat @click="postUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import VueEmbedGist from "vue-embed-gist";
import store from "../store/store.js";
export default {
  name: "Modal",
  data() {
    return {
      checkbox: []
    };
  },
  props: ["logIn", "userGists"],
  components: {
    VueEmbedGist
  },
  computed: {
    User() {
      return this.$store.getters.User;
    },
	bank(){
	    return this.$store.getters.Bank
	},
  },
  methods: {
    addBankGist(object, id) {
      if (!this.$store.getters.Check(id)[0]) {
        console.log("true");
        store.dispatch("AddGist", {
          object: object
        });
      } else {
        console.log("false");
        store.dispatch("RemoveGist", {
          id: object.id
        });
      }
    },
    close() {
      store.dispatch("logIn", {
        boolean: false
      });
    },
    postUser() {
      fetch("https://secret-island-17002.herokuapp.com/users", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json"
        }),
        body: JSON.stringify({
          github_token: store.state.user.access_token,
          github_name: store.state.user.userName,
          avatar_url: store.state.user.avatar_url,
          user_code_snippets: {
            data: store.state.user.bank_gists
          }
        })
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data);
          store.dispatch("changeUser", {
            property: "id",
            value: data.userItem.id
          });
        });
      store.dispatch("logIn", {
        boolean: false
      });
      store.dispatch("loggedIn", {
        boolean: true
      });
      store.dispatch("isAuthenticated");
      this.$router.push({ name: "Bank" });
    }
  }
};
</script>
