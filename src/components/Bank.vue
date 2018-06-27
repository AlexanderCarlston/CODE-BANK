<template>
<v-container>
        <v-layout v-if="vaultForm" align-center justify-center>
        <v-flex xs12 md10>
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                    <v-text-field
                    label="Vault Name"
                    v-model="vault_name"
                    ></v-text-field>
                    <v-checkbox 
                    v-for="(code, index) in bank_gists"
                    :key="code.id"
                    :v-model="index"
                    :label="code.files[Object.keys(code.files)[0]].filename"
                    @click="addVaultGist(code, code.id)"
                    ></v-checkbox>
                    <h1>New vault:</h1>
                    <vue-embed-gist 
                    v-for="code in vault_gists" 
                    :key="code.id"
                    :gist-id="code.id"
                    :file="code.files[Object.keys(code.files)[0]].filename"
                    />
                </v-form> 
              </v-card-text>
              <v-card-actions>
                <v-btn @click="postVault" color="primary">Post Vault</v-btn>
              </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
    <v-layout column v-else>
    <v-layout align-center justify-space-between row>
    <h1>Your Bank</h1>
    <div>
    <v-btn @click="changeToForm" large>
    Make a vault    
    <v-icon>add_box</v-icon>
    </v-btn>
    </div>
    </v-layout>
    <vue-embed-gist 
    v-for="code in bank_gists" 
    :key="code.id"
    :gist-id="code.id"
    :file="code.files[Object.keys(code.files)[0]].filename"
    />
    </v-layout>
</v-container>
</template>
<script>
import VueEmbedGist from 'vue-embed-gist'
import Loading from '@/components/Loading.vue'
export default {
    name: 'Bank',
    props: ["closeForm"],
    components: {
        Loading,
        VueEmbedGist,
    },
    data(){
        return {
            loading: false,
            bank_gists: [],
            vault_gists: [],
            userId: 0,
            vaultForm: false,
            vault_name: ''
        }
    },
    mounted(){
         if(this.getCookie("loggedIn") === ''){
            this.$router.push({name: 'LandingPage'})
        } else {
        this.closeForm()
        var id = this.getCookie('userId')
        this.userId = id
        if(!id){
            this.$router.push({name: "Loading"})
        }
        console.log(id)
        fetch(`https://secret-island-17002.herokuapp.com/users/${id}`)
        .then(response => {
        return response.json()
        })
       .then(response => {
        console.log(response.userItem.user_code_snippets.data)
        this.bank_gists = response.userItem.user_code_snippets.data
        console.log(response)
        })
    }},
    methods: {
                addVaultGist(obj, id){
            if(!this.vault_gists.filter(obj => obj.id === id)[0]){
            this.vault_gists.push(obj)
            } else {
                for(var i = 0; i < this.vault_gists.length; i++){
                    var index = 0
                    if(this.vault_gists[i].id === id){
                    this.vault_gists.splice(i,1)
                        return index
                    }
                    return index
                }
                this.bank_gists.splice(index,1)
            }
        },
        changeToForm(){
            this.vaultForm = true
        },
        postVault(){
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
  })
  this.vaultForm = false
  this.$router.push({name: "VaultLoading"})
        },
            getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
    }
}
</script>
<style>
h1 {
    font-size: 90px;
}

</style>
