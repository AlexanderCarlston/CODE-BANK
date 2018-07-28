<template>
    
</template>

<script>
    import VueEmbedGist from 'vue-embed-gist'
    export default {
        name: "Vaults",
        data() {
            return {
                vaults: [],
                currentVault: {},
                inspectingForm: false
            }
        },
        components: {
            VueEmbedGist
        },
        mounted() {
            if (this.getCookie("loggedIn") === '') {
                this.$router.push({
                    name: 'LandingPage'
                })
            } else {
                var id = this.getCookie('userId')
                fetch(`https://secret-island-17002.herokuapp.com/users/${id}/vaults`)
                    .then(response => response.json())
                    .then(data => this.vaults = data.vaults)
            }
        },
        methods: {
            changeCurrentVault(obj) {
                if (obj === this.currentVault) {
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
                for (var i = 0; i < ca.length; i++) {
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
