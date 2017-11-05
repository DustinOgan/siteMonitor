const config = require("config");
const fetch = require("node-fetch");
var unregstieredGuest = require('../models/UnregisteredGuestCall.js');


var authnPath = config.get("authConfig.path")
var server = config.get('SystemConfig.baseUrl')


// async function
async function fetchAsync () {
  // await response of fetch call
  var myGuest = unregstieredGuest.createCall()
  console.log(myGuest.url)
  console.log(myGuest.postParams)
  let guestCall = await fetch(myGuest.url, myGuest.postParams);
  // only proceed once promise is resolved
  let json = await guestCall.json();
  
  let guestId = await json.result.guestProfile.guestId;

  let postParams = { method: 'POST', body: '{"externalGuestId": "${guestId}" }'  , headers: { "Content-Type": "application/json" } };
  
  let userTokensCall = await fetch(server + authnPath, postParams)
  // only proceed once second promise is resolved
  let tokens = await userTokensCall.json()
  console.log(tokens);
  return tokens;
}

// trigger async function
// log response or catch error of fetch promise
//fetchAsync()
   // .then(data => console.log(data))
   // .catch(reason => console.log(reason.message))


module.exports = {
  fetchAsync : fetchAsync
}