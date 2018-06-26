<template>
    <v-layout>
        <h1>C
    <v-progress-circular :size="150" :width="15" indeterminate color="black"></v-progress-circular>
    DE BANK</h1>
    </v-layout>
</template>
<script>
export default {
     name: "Loading",
    mounted(){
        setTimeout(() => {
            this.$router.push({name: "Bank"})
        }, 3000);
    }
}
</script>
<style scoped>
h1 {
    font-size: 200px;
}
</style>
