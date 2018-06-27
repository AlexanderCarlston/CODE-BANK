<template>
    <v-container>
                <v-form v-if="inspectingForm">
                    <h1>Your Vault:</h1>
                    <vue-embed-gist 
                    v-for="(snippets, index) in currentVault.vault_code_snippets.data" 
                    :key="index"
                    :gist-id="snippets.id"
                    :file="snippets.files[Object.keys(snippets.files)[0]].filename"
                    />
                </v-form> 
        <v-layout column>
            <h1>Vaults</h1>
            <v-btn @click="changeCurrentVault(vault)" v-for="(vault, index) in vaults" :key="index" large>{{vault.vault_name}}</v-btn>
        </v-layout>
    </v-container>
</template>
<script>
import VueEmbedGist from 'vue-embed-gist'
export default {
    name: "Vaults",
    data(){
        return {
            vaults: [],
            currentVault: {},
            inspectingForm: false
        }
    },
              components: {
    VueEmbedGist
  },
    mounted(){
         if(this.getCookie("loggedIn") === ''){
            this.$router.push({name: 'LandingPage'})
        } else {
        var id = this.getCookie('userId')
        fetch(`https://secret-island-17002.herokuapp.com/users/${id}/vaults`)
        .then(response => response.json())
        .then(data => this.vaults = data.vaults)
        }
    },
    methods: {
        changeCurrentVault(obj){
            if(obj === this.currentVault){
                this.currentVault = {}
                this.inspectingForm = false
            } else {
            this.currentVault = obj
            this.inspectingForm = true
            }
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

</style>
