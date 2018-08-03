<template>
  <v-app>
    <v-navigation-drawer v-if="loggedIn" v-model="drawer" fixed app>
      <v-list>
        <v-toolbar flat class="transparent">
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="User.avatar_url">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{User.userName}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-list-tile @click="closeDrawer" :to='{name: "LandingPage"}'>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="closeDrawer" :to='{name: "Bank"}'>
          <v-list-tile-action>
            <v-icon>account_balance</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Your Bank</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="closeDrawer" :to='{name: "Vaults"}'>
          <v-list-tile-action>
            <v-icon>work</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Your Vaults</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon v-if="loggedIn" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat @click="home">Home
        </v-btn>
        <v-btn flat disabled>
          About     
        </v-btn>
        <v-btn flat disabled>
          HOW TO
        </v-btn>
        <v-btn flat href="https://github.com/AlexanderCarlston/CODE-BANK" target="_blank">Github
        </v-btn>
        <v-btn v-if="!loggedIn" flat large @click="authenticate('github')">Sign in
          <i class="devicon-github-plain"></i>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <Modal v-if="logIn" :logIn="logIn" :userGists="userGists" :boolean="true"/>
    <router-view></router-view>
  </v-app>
</template>

<script>
  import Modal from "./components/Modal.vue";
  import store from "./store/store.js";
  export default {
    name: "App",
    mounted() {
      fetch("https://secret-island-17002.herokuapp.com/users")
        .then(response => response.json())
        .then(data => {
          this.users = data.users
        })
    },
    data() {
      return {
        drawer: false,
        userGists: [],
        users: []
      };
    },
    computed: {
      logIn() {
        return this.$store.getters.logIn;
      },
      loggedIn() {
        return this.$store.getters.loggedIn;
      },
      Auth() {
        return this.$store.getters.Auth;
      },
      User() {
        return this.$store.getters.User;
      }
    },
    components: {
      Modal
    },
    methods: {
      closeDrawer() {
        this.drawer = false;
      },
      home() {
        this.$router.push({
          name: "LandingPage"
        });
      },
      authenticate(provider) {
        this.$auth.authenticate(provider).then(data => {
          // Execute application logic after successful social authentication
          console.log(data);
          store.dispatch("changeUser", {
            property: "access_token",
            value: data.data.token
          });
          fetch(`https://api.github.com/user?access_token=${data.data.token}`)
            .then(response => response.json())
            .then(data => {
              store.dispatch("changeUser", {
                property: "userName",
                value: data.login
              });
              store.dispatch("changeUser", {
                property: "avatar_url",
                value: data.avatar_url
              });
            });
          window.setTimeout(() => {
            fetch(`https://api.github.com/users/${store.state.user.userName}/gists?access_token=${store.state.user.access_token}`)
              .then(response => response.json())
              .then(data => (this.userGists = data));
            if (this.users.filter(user => user.github_name === store.state.user.userName).length === 0) {
              store.dispatch("logIn", {
                boolean: true
              })
            } else {
              var array = this.users.filter(user => user.github_name === store.state.user.userName)
              console.log(array, "hi")
              store.dispatch("loggedIn", {
                boolean: true
              });
              store.dispatch("isAuthenticated");
              store.dispatch("changeUser", {
                property: "id",
                value: array[0].id
              });
              // this.$router.push({
              //   name: "Bank"
              // });
            }
          }, 1000);
        });
      }
    }
  };
</script>

<style>
  @import url(https://assets-cdn.github.com/assets/gist-embed-1baaff35daab552f019ad459494450f1.css);
  @import url(https://assets-cdn.github.com/assets/gist-embed-1baaff35daab552f019ad459494450f1.css);
  @import url("https://fonts.googleapis.com/css?family=Sorts+Mill+Goudy");
  h1 {
    font-family: "Sorts Mill Goudy", serif !important;
  }
</style>
