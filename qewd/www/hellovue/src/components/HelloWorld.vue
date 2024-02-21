<template>
  <button @click="sendMessage">Send message to QEWD-Up/QEWD.js</button>
  <p>message from QEWD-Up/QEWD.js:</p>
  <pre> {{ qewdMessage }}</pre>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      // add a reactive property to hold a message coming back from QEWD-Up/QEWD.js
      qewdMessage: ''
    }
  },
  methods: {
    async sendMessage() {
      console.log('send message');
      // preserve Vue.js's this for use in QEWD's reply
      let self = this
      // add a debugger statement if you want to debug your Vue app
      /* eslint-disable no-debugger, no-console */
      // send a test 'helloworld' message to QEWD-Up/QEWD.js

      try {
        debugger;
        let response = await this.$qewd.reply({
          type: 'helloworld'
        });

      } catch(e) {
        console.log('err');
        throw e
      }

      console.log('oh');

      console.log('response', response);
      // .then(response => {
      //   // log QEWD's response on the console
      //   console.log(response)
      //   // show an error message in the app
      //   self.qewdMessage = response.message.error || ''
      // }) 
    }
  }
}
</script>