<template>
  <v-content>
    <v-container>
      <v-layout column justify-center>
      <v-card  class="elevation-0 transparent">
        <img src="https://randomuser.me/api/portraits/men/85.jpg">
        <span class="display-4">Your Bank</span>
      </v-card>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import VueEmbedGist from "vue-embed-gist";
import Loading from "@/components/Loading.vue";
import store from "../store/store.js";
export default {
  name: "Bank",
  props: ["closeForm"],
  components: {
    Loading,
    VueEmbedGist
  },
  data() {
    return {
      loading: false,
      bank_gists: [],
      vault_gists: [],
      userId: 0,
      vaultForm: false,
      vault_name: ""
    };
  },
  mounted() {
    fetch(`https://secret-island-17002.herokuapp.com/users/${store.state.user.id}`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response.userItem.user_code_snippets.data);
        this.bank_gists = response.userItem.user_code_snippets.data;
        console.log(response);
      });
  },
  methods: {
    addVaultGist(obj, id) {
      if (!this.vault_gists.filter(obj => obj.id === id)[0]) {
        this.vault_gists.push(obj);
      } else {
        for (var i = 0; i < this.vault_gists.length; i++) {
          var index = 0;
          if (this.vault_gists[i].id === id) {
            this.vault_gists.splice(i, 1);
            return index;
          }
          return index;
        }
        this.bank_gists.splice(index, 1);
      }
    },
    changeToForm() {
      this.vaultForm = true;
    },
    postVault() {
      fetch("https://secret-island-17002.herokuapp.com/vaults", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json"
        }),
        body: JSON.stringify({
          vault_name: this.vault_name,
          user_id: this.userId,
          vault_code_snippets: {
            data: this.bank_gists
          }
        })
      });
      this.vaultForm = false;
      this.$router.push({ name: "VaultLoading" });
    },
    getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  }
};
</script>
<style>
h1 {
  font-size: 90px;
}
</style>
