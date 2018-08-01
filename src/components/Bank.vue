<template>
  <v-content>
    <v-container>
      <v-layout row wrap>
        <section>
          <v-layout>
            <img :src="User.avatar_url" height="200">
            <v-card>
              <v-layout column>
                <v-btn @click="createTag">CREATE TAG</v-btn>
                <v-btn @click="deleteTag">DELETE TAG</v-btn>
                <v-btn>USE TAG</v-btn>
                <v-btn>UPDATE</v-btn>
              </v-layout>
            </v-card>
          </v-layout>
        </section>
        <section>
          <v-layout>
            <img src="static/bank.png" height="200">
            <v-layout column>
              <span class="display-2">B</span>
              <span class="display-2">A</span>
              <span class="display-2">N</span>
              <span class="display-2">K</span>
            </v-layout>
          </v-layout>
        </section>
        <v-spacer></v-spacer>
        <section>
          <v-flex xl6>
            <v-form v-if="tagCreate">
              <v-text-field
              v-model="tag"
              :rules="tagRules"
              :counter="10"
              label="Tag Name"
              required
              >
              </v-text-field>
              <v-btn @click="submitTag">Submit</v-btn>
            </v-form>
            <v-flex v-if="tagDelete">
            <v-select
            v-model="tagDeleteData"
            :items="items"
            label="test"
            >
            </v-select>
            <v-btn @click="submitDeleteTag">Delete</v-btn>
            </v-flex>
          </v-flex>
        </section>
        <v-spacer></v-spacer>
      </v-layout>
      <br>
      <v-layout>
        <section>
          <v-combobox v-model="chips" :items="items" label="filter" chips clearable prepend-icon="filter_list" solo multiple>
            <template slot="selection" slot-scope="data">
                  <v-chip
                  :selected="data.selected"
                  close
                  @input="remove(data.item)"
                  >
                  <strong>{{ data.item }}</strong>&nbsp;
                  </v-chip>
            </template>
            </v-combobox>
            <v-btn block>FILTER</v-btn>
          </section>
        </v-layout>
        <v-layout row wrap>
          <vue-embed-gist 
          v-for="code in bank_gists" 
          :key="code.id"
          :gist-id="code.id"
          :file="code.files[Object.keys(code.files)[0]].filename"
          />
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
        vault_name: "",
        chips: [],
        items: [],
        tag: '',
        tagRules: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        tagCreate: false,
        tagDelete: false,
        tagDeleteData: ""
      };
    },
    mounted() {
      fetch(
          `https://secret-island-17002.herokuapp.com/users/${store.state.user.id}`
        )
        .then(response => {
          return response.json();
        })
        .then(response => {
          console.log(response.userItem.user_code_snippets.data);
          this.bank_gists = response.userItem.user_code_snippets.data;
          console.log(response);
        });
    },
    computed: {
      User() {
        return this.$store.getters.User;
      }
    },
    methods: {
      submitDeleteTag(){
        this.items = this.items.filter(item => item !== this.tagDeleteData)
        this.tagDelete = false
      },
      deleteTag(){
        this.tagDelete = true
      },
      submitTag(){
        this.tagCreate = false
        this.chips.push(this.tag)
        this.items.push(this.tag)
        this.tag = ""
      },
      createTag(){
      this.tagCreate = true
      },
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
      remove(item) {
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
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
              data: this.bank_gists,
              tags: []
            }
          })
        });
        this.vaultForm = false;
        this.$router.push({
          name: "VaultLoading"
        });
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
