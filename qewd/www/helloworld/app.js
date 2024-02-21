import { QEWD } from '../qewd-client.js';


document.addEventListener('DOMContentLoaded', () => {
  let messageBtn = document.getElementById('messageBtn');
  messageBtn.style = 'display: none';
  QEWD.on('ewd-registered', () => {
    QEWD.log = true;
    messageBtn.addEventListener('click', async () => {
      let responseObj = await QEWD.reply({
        type: 'hello'
      });
      document.getElementById('content').textContent = 'Hello ' + responseObj.message.hello;
    });
    messageBtn.style = 'display:';
  });

  // - standard start, no proxies, disable Caddy
  QEWD.start({
    application: 'helloworld',
    io_transports: [ 'websocket' ],
    log: true,
  });


  //- standard start, for caddy's subdomains, enable caddy
  // QEWD.start({
  //   application: 'helloworld',
  //   // use a url to allow correct startup of WebSocket using a namespace /qewd
  //   // you *need* to pass a url here too to make the Websocket transport=websocket mode work 
  //   // (it will fall back to polling mode if the url is not passed in)
  //   url: 'https://be.dev.localhost/qewd',
  //   // pass the io_path to the WebSocket
  //   log: true,
  //   io_path: '/qewd',
  //   // optional: control the transport mode(s) the websocket will use
  //   io_transports: [ 'websocket' ]
  // });
});