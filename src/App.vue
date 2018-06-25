<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" >
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>account_balance</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Your Bank</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>reorder</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Your Vaults</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>CODE BANK</v-toolbar-title>
      <v-toolbar-title v-if="loggedIn">Signed in</v-toolbar-title>
      <v-btn v-else @click="test" large href="https://github.com/login/oauth/authorize?client_id=8152cb35e38e71e9bbf3">
        Sign in
        <i class="devicon-github-plain"></i>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view :logIn="logIn" ></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    if((document.cookie.match(/^(?:.*;)?\s*loggedIn\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]){
      this.loggedIn = true
      if(!(document.cookie.match(/^(?:.*;)?\s*userId\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]){
      this.logIn = true
      }
    }
  },
  data(){
    return {
      drawer: false,
      loggedIn: false,
      logIn: false
    }
  },
  methods: {
    test(){
      document.cookie = "loggedIn=true"
    },
    authenticate: function (provider) {
      this.$auth.authenticate(provider).then(function () {
        // Execute application logic after successful social authentication
      })
    },
     getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
    },
    doSomething() {
    var myCookie = getCookie("MyCookie");

    if (myCookie == null) {
        // do cookie doesn't exist stuff;
    }
    else {
        // do cookie exists stuff
    }
}
  }
}
</script>

<style>

</style>
