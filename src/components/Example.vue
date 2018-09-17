<template>
  <v-content class="secondary">
    <Modal v-if="logIn" :logIn="logIn" :boolean="false" :tags="items" :closeLogIn="closeLogIn" />
    <v-container v-else>
      <v-layout row wrap>
        <section>
          <v-layout>
            <img src="https://avatars0.githubusercontent.com/u/21273399?v=4" height="200">
            <v-card>
              <v-layout column>
                <v-tooltip bottom>
                <v-btn
                slot="activator"
                >IMPORT</v-btn>
                <span>Import new gists from your github.</span>
                </v-tooltip>
                <v-tooltip bottom>
                <v-btn
                slot="activator"
                >SYNC</v-btn>
                <span>Syncs your current page with your saved info.</span>
                </v-tooltip>
                <v-tooltip bottom>
                <v-btn
                slot="activator"
                >UPDATE</v-btn>
                <span>Updates your user info with your current page.</span>
                </v-tooltip>
                <v-tooltip bottom>
                <v-btn
                slot="activator"
                >FUTURE</v-btn>
                <span>Future implementation</span>
                </v-tooltip>
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
            <v-layout column>
  
            </v-layout>
          </v-layout>
        </section>
        <v-spacer></v-spacer>
        <section>
          <v-flex xl6>
            <v-btn @click="createTag">CREATE TAG</v-btn>
            <v-btn @click="deleteTag">DELETE TAG</v-btn>
            <v-btn @click="useTag">USE TAG</v-btn>
            <v-btn @click="tagRemove">Remove Tag</v-btn>
            <v-form v-if="tagCreate">
              <v-text-field v-model="tag" :rules="tagRules" :counter="10" label="Tag Name" required>
              </v-text-field>
              <v-btn @click="submitTag">Submit</v-btn>
            </v-form>
  
            <v-flex v-if="tagDelete">
              <v-select v-model="tagDeleteData" :items="items" label="tags">
              </v-select>
              <v-btn @click="submitDeleteTag">Delete</v-btn>
            </v-flex>
  
            <v-flex v-if="tagUse">
              <v-select v-model="tagUseData" :items="items" label="tags">
              </v-select>
              <v-layout>
              <v-checkbox v-for="(code, index) in bank_gists" :key="code.id+index" :v-model="index" :label="code.files[Object.keys(code.files)[0]].filename" @change="addBankGist(code, code.id)"></v-checkbox>
              </v-layout>
              <v-btn @click="submitTagUse">Submit</v-btn>
            </v-flex>
  
            <v-flex v-if="removeTag">
              <v-select v-model="tagUseData" :items="items" label="tags">
              </v-select>
              <v-layout>
              <v-checkbox v-for="(code, index) in bank_gists" :key="code.id+index" :v-model="index" :label="code.files[Object.keys(code.files)[0]].filename" @change="addBankGist(code, code.id)"></v-checkbox>
              </v-layout>
              <v-btn @click="submitRemoveTag">Submit</v-btn>
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
            <v-btn @click="filterBankGists" block>FILTER</v-btn>
          </section>
        </v-layout>
        <v-layout v-if="!filter" row wrap>  
          <vue-embed-gist 
          v-for="code in bank_gists" 
          :key="code.id"
          :gist-id="code.id"
          :file="code.files[Object.keys(code.files)[0]].filename"
          />
        </v-layout>
        <v-layout v-else row wrap>
          <vue-embed-gist 
          v-for="code in filtered_gists" 
          :key="code.id"
          :gist-id="code.id"
          :file="code.files[Object.keys(code.files)[0]].filename"
          />
        </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import Modal from "./Modal.vue";
  import VueEmbedGist from "vue-embed-gist";
  import store from "../store/store.js";
  export default {
    name: "Example",
    props: ["closeForm"],
    components: {
      VueEmbedGist,
      Modal
    },
    data() {
      return {
        User: {},
        bank_gists: [],
        filtered_gists: [],
        filter: false,
        vault_gists: [],
        userId: 0,
        vaultForm: false,
        vault_name: "",
        chips: [],
        items: [],
        logIn: false,
        tag: '',
        tagRules: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        tagCreate: false,
        tagDelete: false,
        tagDeleteData: "",
        tagUse: false,
        tagUseData: "",
        tagUseArray: [],
        removeTag: false,
        removeTagData: "",
        removeTagArray: {}
      };
    },
    mounted() {
      fetch("https://secret-island-17002.herokuapp.com/users/3")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.User = data.userItem
        this.bank_gists = data.userItem.user_code_snippets.data
      })
    },
    computed: {

    },
    methods: {
      importButton() {
        this.logIn = true
      },
      filterBankGists() {
        if (this.chips.length === 0) {
          this.filter = false
        } else {
          this.filter = true
          var chips = this.chips
          var gists = this.bank_gists
          var newArray = []
          for (let i = 0; i < gists.length; i++) {
            if (gists[i].tags !== undefined) {
              for (let x = 0; x < gists[i].tags.length; x++) {
                var counter = 0
                if (chips.indexOf(gists[i].tags[x]) > -1) {
                  counter += 1
                }
                if (counter === chips.length) {
                  newArray.push(gists[i])
                }
              }
            }
          }
          this.filtered_gists = newArray
        }
      },
      submitRemoveTag() {
        this.tagUseArray.map(item => {
          if(item.tags !== undefined){
          item.tags = item.tags.filter(tag => tag !== this.tagUseData)
          }
        })
        this.tagUseArray.map(item => {
          if(item.tags !== undefined){
          this.bank_gists = this.bank_gists.filter(gist => gist.id !== item.id)
          this.bank_gists.push(item)
          }
        })
        this.tagUseData = ""
        this.tagUseArray = []
        this.removeTag = false
      },
      tagRemove() {
				this.tagCreate = false
				this.tagDelete = false
				this.tagUse = false
        if (this.removeTag) {
          this.removeTag = false
        } else {
          this.removeTag = true
        }
      },
      submitTagUse() {
        this.tagUseArray.map(item => {
          if (item.tags === undefined) {
            item.tags = []
            item.tags.push(this.tagUseData)
          } else {
            item.tags.push(this.tagUseData)
          }
        })
        this.tagUseArray.map(item => {
          this.bank_gists = this.bank_gists.filter(gist => gist.id !== item.id)
          this.bank_gists.push(item)
        })
        this.tagUseData = ""
        this.tagUseArray = []
        this.tagUse = false
      },
      useTag() {
				this.tagCreate = false
				this.tagDelete = false
				this.removeTag = false
        if (this.tagUse) {
          this.tagUse = false
        } else {
          this.tagUse = true
        }
      },
      addBankGist(code, id) {
        if (this.tagUseArray.filter(item => item.id === id).length === 0) {
          this.tagUseArray.push(code)
        } else {
          this.tagUseArray = this.tagUseArray.filter(item => item.id !== id)
        }
      },
      submitDeleteTag() {
        this.items = this.items.filter(item => item !== this.tagDeleteData)
        this.tagDelete = false
      },
      deleteTag() {
				this.tagCreate = false
				this.tagUse = false
				this.removeTag = false
        if (this.tagDelete) {
          this.tagDelete = false
        } else {
          this.tagDelete = true
        }
      },
      submitTag() {
        this.tagCreate = false
        this.chips.push(this.tag)
        this.items.push(this.tag)
        this.tag = ""
      },
      createTag() {
				this.tagDelete = false
				this.tagUse = false
				this.removeTag = false
        if (this.tagCreate) {
          this.tagCreate = false
        } else {
          this.tagCreate = true
        }
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
      }
    }
  };
</script>

<style>
  
</style>
