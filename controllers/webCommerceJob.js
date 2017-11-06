const config = require("config");
const fetch = require("node-fetch");
var unregisteredGuest = require('./unregisteredGuest.js')

var server = config.get('monitorConfig')

async function send () {

  let guestResp = await unregisteredGuest.send();
  //console.log("Here is the JSON: "  + json.result.guestProfile)
   let json = await guestResp.json()
   
  let guestId = await json.result.guestProfile.guestId;

  let postParams = { method: 'POST', body: '{"externalGuestId": "${guestId}" }'  , headers: { "Content-Type": "application/json" } };
  
  let userTokensCall = await fetch(server.baseUrl + server.authN, postParams)

  let tokens = await userTokensCall.json()
  console.log(tokens);
  return tokens;
}


module.exports = {
  send : send
}