<template>
    <v-layout align-center justify-center>
        <v-flex xs12 md10>
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                    <v-checkbox 
                    v-for="(code, index) in gists"
                    :key="code.id"
                    :v-model="index"
                    :label="code.files[Object.keys(code.files)[0]].filename"
                    @click="addBankGist(code, code.id)"
                    ></v-checkbox>
                    <h1>Your bank:</h1>
                    <vue-embed-gist 
                    v-for="code in bank_gists" 
                    :key="code.id"
                    :gist-id="code.id"
                    :file="code.files[Object.keys(code.files)[0]].filename"
                    />
                </v-form> 
              </v-card-text>
              <v-card-actions>
                <v-btn @click="postUser" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import VueEmbedGist from 'vue-embed-gist'
var request = require('request')
export default {
    name: 'Form',
      components: {
    VueEmbedGist
  },
    mounted(){
    const code = this.getParameterByName('code')
    fetch(`http://localhost:3000/github_login/${code}`)
    .then(function(response){
    return response.json()
    })
    .then(data => {
    this.user_token = data
    fetch(`https://api.github.com/user?access_token=${data}`)
    .then(function(response){
    return response.json()
    })
    .then(data =>{
    this.username = data.login
    document.cookie = `username=${data.login}`
    fetch(`https://api.github.com/users/${data.login}/gists`)
    .then(response => {
    return response.json()
    })
    .then(data => {
        this.gists = data
    })
    })
    })

    },
    data () {
      return {
        checkbox: [],
        user_token: '',
        username: '',
        gists: [],
        bank_gists: []
      }
    },
    methods: {
        addBankGist(obj, id){
            if(!this.bank_gists.filter(obj => obj.id === id)[0]){
            this.bank_gists.push(obj)
            } else {
                for(var i = 0; i < this.bank_gists.length; i++){
                    var index = 0
                    if(this.bank_gists[i].id === id){
                    this.bank_gists.splice(i,1)
                        return index
                    }
                    return index
                }
                this.bank_gists.splice(index,1)
            }
        },
    postUser(){
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: new Headers({
          "content-type": "application/json"
    }),
    body: JSON.stringify({
      github_token: this.user_token,
      github_name : this.username,
      user_code_snippets: {
          data: this.bank_gists
      }
    })
  })
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    document.cookie = `userId=${data.userItem.id}`
  })
//   this.$router.push({ name: 'Bank', params: { userId: this.userId}})
  this.$router.push({ name: 'Bank'})
    },
    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
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
/* @import url(https://assets-cdn.github.com/assets/gist-embed-1baaff35daab552f019ad459494450f1.css);
@import url(https://assets-cdn.github.com/assets/gist-embed-1baaff35daab552f019ad459494450f1.css); */
/* .div-style[data-v-59f78dee]{
    width:50%;
    -ms-flex-item-align:center;align-self:center;
    -ms-flex-line-pack:center;align-content:center;
    text-align:center;margin:0 auto
    } */

</style>
