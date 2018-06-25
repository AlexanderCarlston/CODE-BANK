<template>
    <h1>bank</h1>
</template>
<script>
export default {
    name: 'Bank',
    mounted(){
        var id = this.getCookie('userId')
        console.log(id)
        fetch(`http://localhost:3000/users/${id}`)
        .then(response => {
        return response.json()
        })
       .then(response => {
        console.log(response)
        })
    },
    methods: {
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
