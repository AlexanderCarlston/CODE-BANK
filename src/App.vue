<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
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
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-spacer></v-spacer>
    <v-text-field
    hide-details
    prepend-icon="search"
    single-line
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn 
      flat
      >Home
      </v-btn>
      <v-btn 
      flat
      href="https://github.com/AlexanderCarlston/CODE-BANK"
      target="_blank"
      >Github
      </v-btn>
      <v-btn 
      v-if="!loggedIn"
      flat
      large
      >Sign in
      <i class="devicon-github-plain"></i>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <router-view :logIn="logIn" ></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  mounted() {},
  data() {
    return {
      drawer: false,
      logIn: false,
      loggedIn: false,
    };
  },
  methods: {
    closeDrawer() {
      this.drawer = false;
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
