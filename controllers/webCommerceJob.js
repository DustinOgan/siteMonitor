const config = require("config");
const fetch = require("node-fetch");
var unregisteredGuest = require('./unregisteredGuest.js')

var server = config.get('monitorConfig')

async function send() {

  let guestResp = await unregisteredGuest.send();
  let json = await guestResp.json()
  console.log(json)
  let guestId = await json.result.guestProfile.guestId
  let postParams = { "method": 'POST', "body": '{"externalGuestId": "${guestId}" }', "headers": { "Content-Type": "application/json" } };
  //let postParams = await create(guestId)
  let userTokensCall = await fetch(server.baseUrl + server.authN, postParams).catch(e => console.log('catch', e))
  let tokens = await userTokensCall.json()
  console.log(tokens);
  return tokens;
}



module.exports = {
  send: send
}