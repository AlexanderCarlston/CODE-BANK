<template>
  <v-layout justify-center>
    <v-dialog v-model="logIn" persistent max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="headline">{{User.userName}}'s gists. Choose what you want to import.</span>
        </v-card-title>
        <v-card-title v-if="boolean">
            <v-checkbox 
            v-for="(code, index) in userGists"
            :key="code.id+index"
            :v-model="index"
            :label="code.files[Object.keys(code.files)[0]].filename"
            @change="addBankGist(code, code.id)"
            ></v-checkbox>
            <br/>
            <vue-embed-gist
            v-if="boolean"
            v-for="code in bank" 
            :key="code.id"
            :gist-id="code.id"
            :file="code.files[Object.keys(code.files)[0]].filename"
            />
        </v-card-title>
        <v-card-title v-else>
            <v-checkbox 
            v-for="(code, index) in updateGists"
            :key="code.id+index"
            :v-model="index"
            :label="code.files[Object.keys(code.files)[0]].filename"
            @change="addUpdateBankGist(code, code.id)"
            ></v-checkbox>
            <br/>
            <vue-embed-gist
            v-for="code in updateBank" 
            :key="code.id"
            :gist-id="code.id"
            :file="code.files[Object.keys(code.files)[0]].filename"
            />     
        </v-card-title>
        <v-card-actions v-if="boolean">
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" flat @click="postUser">Save</v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" flat @click="updateUser">Update</v-btn>
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
  mounted(){
    if (!this.boolean) {
      fetch(`https://api.github.com/users/${store.state.user.userName}/gists?access_token=${store.state.user.access_token}`)
      .then(response => response.json())
      .then(data => this.updateGists = data)
    }
  },
  data() {
    return {
      checkbox: [],
      updateGists: [],
      updateBank: []
    };
  },
  props: ["logIn", "userGists", "boolean", "tags", "closeLogIn"],
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
    addUpdateBankGist(code, id){
      if (this.updateBank.filter(gist => gist.id === id).length === 0) {
        this.updateBank.push(code)
      } else {
        console.log('false')
        this.updateBank = this.updateBank.filter(gist => gist.id !== id)
      }
    },
    updateUser(){
      fetch(`https://secret-island-17002.herokuapp.com/users/${this.User.id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
          user_code_snippets: {
            data: this.updateBank,
            tags: this.tags
          }
        })
        })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))
      store.dispatch("changeUser", {
        property: "bank_gists",
        value: this.updateBank
      })
      this.closeLogIn()
    },
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
