<template>
  <button @click="sendMessage">Send message to QEWD-Up/QEWD.js</button>
  <p>message from QEWD-Up/QEWD.js:</p>
  <pre> {{ qewdMessage }}</pre>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, defineProps } from 'vue';

const props = defineProps(['msg']);
const qewdMessage = ref('');
const { proxy } = getCurrentInstance();

const sendMessage = async () => {
  console.log('send message');
  // get $qewd from the proxy
  const $qewd = proxy.$qewd;

  try {
    $qewd.reply({
      type: 'helloworld'
    }).then(response => {
      // log QEWD's response on the console
      console.log(response)
      // show an error message in the app
      qewdMessage = response.message.error || ''
    })



  } catch (e) {
    console.log('err');
    throw e;
  }
};

onMounted(() => {
  // Access $qewd from the proxy and set up any necessary event handlers
  const $qewd = proxy.$qewd;
  $qewd.log = true;

  $qewd.on('ewd-registered', function () {
    console.log('ewd-registered');
    // Your QEWD environment is ready, set the qewdReady data property to true
    // Optionally turn on logging to the console
  });
});
</script>

<style scoped>
/* Add any necessary styles here */
</style>
