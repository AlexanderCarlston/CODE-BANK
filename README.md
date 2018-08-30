# code-bank

> Ultimate storage and export of github gists.

## Live Demo:
[![work](https://imgur.com/TC2S2YB.png)](http://www.youtube.com/watch?v=uF7JXXSvz4o&t)

## Origin:
This project started as my capstone for Galvanize, an end of program project where you spend approximately 10 days builidng something from scratch in an unfamilar environment. I ended up presenting this in front of the biggest number of people I've spoken in front of (https://www.youtube.com/watch?v=nHqyM-4Vqf8&t=4390s).
## My explanation:
* Problem: Github gists are messy
<br />You've probably used github, and by extension used their gist platform "Github gists". The main issues, or missed opportunities, with their current platform are the following: no way to organize, fastest way to import is copy and paste, and it's practically impossible to find other gists that you could use. 
* Bank
<br />This is my MVP. A bank is essentially a better way of organizing, and categorizing your gists. You probably have a ton of gists that you don't use constantly, but have to keep because you'll use it in a rare occasion.
* Vaults
<br />A vault is a way of exporting gists in to a project, they are based around when you would need them (occasions like animation). The interesting thing about vaults are that they are essential a npm package. You can have a vault right in your project, or you can use npm link for when you are in development mode. Using this and npm link make development extremely easy, and when you need to publish you can publish the vault as a npm package.

## Current Plans:
Currently I'm planning out my app, I've come to realize planning is the key to success. I'm doing this my creating wireframes, and ERDS. I'm also making sure that the general foundation of this application is expandable, so I can make any changes that I need to.
* Navbar wireframe:
![Navbar](https://imgur.com/haHo7rQ.png)

For the example page I need to consider what the user needs from this page:
* Introduction to what each page does
* Explanation of user functionality
* Explanation of how tags work
* Explanation of how they all work together
* Example page wireframe:
![Example Page](https://imgur.com/o2BNwKH.png)
* Mobile Example Page:
![Example Page Mobile](https://imgur.com/UukQIlM.png) 


## Built With:
* [Vue.js](https://vuejs.org/) - Front End Framework
* [Vuex](https://vuex.vuejs.org/) - State management 
* [Vuetify](https://vuetifyjs.com/en/) - Fast design prototyping (might change to vanilla)
* [Vue Router](https://router.vuejs.org/) - Navigation
* [Vue Authenticate](https://github.com/dgrubelic/vue-authenticate) - Github OAuth 

## Uses:
* [Package](https://github.com/AlexanderCarlston/code-bank-package) - Npm package
* [Server]() - PostgreSQL server

## Backend planning
I believe in whatever "end" I'm working on, I'll always be a full stack developer. When planning the back end I made sure that the user took precedent, so the first thing I did was plan out the user flow:
![User flow](https://i.imgur.com/NEf3oHw.png)
<br />Through the user flow I was able to see what functionality I would need from my API. I used a user functionality table to figure out how many tables I would actually need, the json column in postgreSQL is amazing:
![ERD](https://i.imgur.com/uZK3emL.png)


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```