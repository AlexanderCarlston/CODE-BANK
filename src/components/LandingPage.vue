<template>
  <v-content>
    <section>
      <v-layout column wrap class="my-5" align-center>
        <img src="static/bank.png" height="200">
        <h1 class="black--text mb-2 display-1 text-xs-center">CODE BANK</h1>
        <v-flex xs12 sm4 class="my-3">
          <div class="text-xs-center">
            <h2 class="headline">Enabling developers, starting with their gists.</h2>
            <span class="subheading">
                    With an emphasis on sharable, mantainable, and easily accesible code snippets in your project.
                </span>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="black--text">error_outline</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Problem</div>
                  </v-card-title>
                  <v-card-text>
                    The problem is simple, github gists are messy. There is currently no way to organize your gists, and you eventually keep adding gist after gist until it becomes a pain to find the gist you need. You also end up only copying and pasting.
                  </v-card-text>
                </v-card>
              </v-flex>
  
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="black--text">account_balance</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Bank</div>
                  </v-card-title>
                  <v-card-text>
                    Your bank is essentially a better way of organizing, and categorizing your gists. You are able to have easy access to these gists, and can actually store your gists however you need to. You are able to have a centralized place to store your gists.
                  </v-card-text>
                </v-card>
              </v-flex>
  
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="black--text">work</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Vaults</div>
                  </v-card-title>
                  <v-card-text>
                    Vaults are a way of exporting gists in to a project, they are a npm package that adapts to what you need. They are easy to develop with, and as soon as you are done developing you can just install it as a dependency.
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>

    <section>
      <v-parallax src="../static/code.jpg" height="380">
      </v-parallax>
    </section>
  
    <section>
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-5">
          <v-flex xs12 sm4>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">About me</div>
              </v-card-title>
              <v-card-text>
                My name is Alexander Carlston, and I am a full stack web developer. I'm a Denver native, and am extremely excited about coding. Right now coding is a hobby, and making this hobby my profression is my dream. I've created CODE-BANK, but would love any help
                from anybody (whether it be code or job leads).
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Contact me</div>
              </v-card-title>
              <v-card-text>
                Alexander Carlston - Full Stack Web Developer
                <br/> I am currently looking for work!
              </v-card-text>
              <v-list class="transparent">
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="black--text">phone</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>720-400-6336</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="black--text">place</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Denver, US</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="black--text">email</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>alekscarlston@yahoo.com</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <section>
      <v-layout column text-xs-center>
        <span class="display-3">This is a demo.</span>
        <span class="display-1">I have high standards for myself, and want this product to be good.</span>
        <span class="display-1">This website is currently a proof of concept, and I'm constantly working on it.</span>
        <span class="display-1">I'm also trying to find my first developer job, so I have to but aside my love of coding to fill out applications.</span>
      </v-layout>
    </section>
  </v-content>
</template>

<script>
  export default {
    name: "LandingPage",
    mounted() {
  
    }
  };
</script>

<style>
  
</style>
