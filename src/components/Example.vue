<template>
  <v-content>
    <v-container>
      <section>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline">Top western road trips</div>
            </div>
          </v-card-title>
        </v-card>
      </section>
      <section>
        <v-layout>
          <img src="https://avatars0.githubusercontent.com/u/21273399?v=4" height="200">
          <v-card>
            <v-layout column>
              <v-btn>IMPORT</v-btn>
              <v-btn>SYNC</v-btn>
              <v-btn>UPDATE</v-btn>
              <v-btn>FUTURE</v-btn>
            </v-layout>
          </v-card>
        </v-layout>
      </section>
    </v-container>
  </v-content>
</template>
<script>
export default {
  name: "Example"
};
</script>
