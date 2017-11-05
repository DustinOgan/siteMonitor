const config = require("config");
const fetch = require("node-fetch");
var unregstieredGuest = require('../models/UnregisteredGuestCall.js');


var authnPath = config.get("authConfig.path")
var server = config.get('SystemConfig.baseUrl')

async function send () {
  var myGuest = unregstieredGuest.createCall()
  console.log(myGuest.url)
  console.log(myGuest.postParams)
  let guestCall = await fetch(myGuest.url, myGuest.postParams);

  let json = await guestCall.json();
  
  let guestId = await json.result.guestProfile.guestId;

  let postParams = { method: 'POST', body: '{"externalGuestId": "${guestId}" }'  , headers: { "Content-Type": "application/json" } };
  
  let userTokensCall = await fetch(server + authnPath, postParams)

  let tokens = await userTokensCall.json()
  console.log(tokens);
  return tokens;
}


module.exports = {
  send : send
}