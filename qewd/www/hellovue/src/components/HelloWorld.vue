<template>
  <button @click="sendMessage">Send message to QEWD-Up/QEWD.js</button>
  <p>message from QEWD-Up/QEWD.js:</p>
  <pre> {{ qewdMessage }}</pre>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';

const qewdMessage = ref('');
const { proxy } = getCurrentInstance();

const sendMessage = async () => {
  console.log('send message');
  // get $qewd from the proxy
  const $qewd = proxy.$qewd;
  console.log($qewd);

  try {
    debugger;
    let response = await $qewd.reply({
      type: 'helloworld'
    });

    console.log('oh');
    console.log('response', response);

    // set the qewdMessage data property with the response
    qewdMessage.value = response.message.error || '';
  } catch (e) {
    console.log('err');
    throw e;
  }
}
</script>
