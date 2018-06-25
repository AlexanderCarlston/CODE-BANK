<template>
   <vue-embed-gist 
      :gist-id="this.gistId" 
      :file="this.fileName"/>   
</template>
<script>
import VueGist from './components/VueGist.vue'
export default {
  name: 'vue-embed-gist',
  props: ['gistId', 'fileName'],
  render(h) {
    return h(VueGist, {
      props: {
        gistId: this.gistId
      }
    })
  }
}
</script>
