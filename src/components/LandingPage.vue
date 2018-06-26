<template>
    <v-container>
        <Form v-if="logIn"/>
        <v-layout>
            <div id="cssSelector">      
            <div class="line">
                <div class="square el"></div>
                <div id="duration">
                <h1 class="text">CODE BANK</h1>
                </div>
                <div class="square el"></div>
            </div>
            </div>
        </v-layout>
        <br>
        <v-layout justify-center>
            <v-icon size="200" color="primary">code</v-icon>
            <h2>Enabling developers, starting with their gists.</h2>
        </v-layout>
                <v-layout justify-center>
            <v-icon size="200" color="primary">account_balance</v-icon>
            <h2>Allowing a clean centralized place for reusable, easily accesible code.</h2>
        </v-layout>
    </v-container>
</template>
<script>
import anime from 'animejs'
import Form from '@/components/Form.vue'
export default {
    name: 'LandingPage',
    mounted(){
        anime({
  targets: '#cssSelector .el',
  translateX: 250,
  duration: 8000
})
anime({
  targets: '#duration .text',
  translateX: 250,
  duration: 8000
});
    },
    components: {
    Form
  },
  props: ["logIn"],
  methods: {
  }
}
</script>

<style>

.square{
    height: 10px;
    width: 600px;
    color: green;
    background-color: black;
}
h1 {
    font-size: 95px;
}
h2 {
    font-size: 50px;
    width: 650px;
}
</style>
