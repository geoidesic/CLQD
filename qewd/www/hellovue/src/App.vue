<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { ref, onMounted, getCurrentInstance } from 'vue'
import io from 'socket.io-client'

const qewdReady = ref(false);
const { proxy } = getCurrentInstance();

onMounted(() => {
  proxy.$qewd.log = true;
  // Event handler when QEWD's connection is registered/ready
  proxy.$qewd.on('ewd-registered', function() {
    console.log('ewd-registered');
    // Your QEWD environment is ready, set the qewdReady data property to true
    qewdReady.value = true;
    // Optionally turn on logging to the console
  });
  // Start QEWD-Up/QEWD.js client
  // - standard start, no proxies, disable Caddy
  proxy.$qewd.start({
    application: 'helloworld',
    io_transports: [ 'websocket' ],
    log: true,
  });


  //- standard start, for caddy's subdomains, enable caddy
  proxy.$qewd.start({
  //   application: 'helloworld',
  //   // use a url to allow correct startup of WebSocket using a namespace /qewd
  //   // you *need* to pass a url here too to make the Websocket transport=websocket mode work 
  //   // (it will fall back to polling mode if the url is not passed in)
  //   url: 'https://be.dev.localhost/qewd',
  //   // pass the io_path to the WebSocket
  //   log: true,
  //   io_path: '/qewd',
  //   io,
  //   // optional: control the transport mode(s) the websocket will use
  //   io_transports: [ 'websocket' ]
  // });

});

</script>

<template>
  <header>
    <pre> qewdReady {{ qewdReady }} </pre>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <!-- show your app's main component when QEWD's websocket is ready -->
      <HelloWorld v-if="true" msg="Welcome to Your Vue.js App"/>
      <!-- during startup, show a startup indicator -->
      <h1 v-else>Starting QEWD-Up/QEWD.js... ... </h1>
    </div>
  </header>

</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
