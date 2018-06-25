<template>
    <v-container>
        <Form v-if="logIn"/>
    </v-container>
</template>
<script>
import Form from '@/components/Form.vue'
export default {
    name: 'LandingPage',
    components: {
    Form
  },
  props: ["logIn"],
  methods: {
  }
}
</script>

<style>

</style>
