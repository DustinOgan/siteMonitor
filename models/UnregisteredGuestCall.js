// Foo.js
'use strict';

const config = require("config");


function createCall() {
  // always initialize all instance properties
  var guestCall = config.get("guestConfig.path");
  var server = config.get('SystemConfig.baseUrl')
  this.sourceId =  "1000002";
  this.url =  server+guestCall
  console.log(this.url);
  this.postParams = { method: 'POST', body: '{"guestProfile":{"sourceId":"1000002"}}' , headers: { 'Content-Type': 'application/json' }};
  this.responseValues = new Map();
  this.responseValues.set("guestId", "guestId: ${json.result.guestProfile.guestId}");
  return this;
}


async function sendCall() {
  var poop = await createCall();
  var response = await fetch(poop.url, poop.postParams)
  return response;
}


module.exports = {
    createCall : createCall,
    sendCall : sendCall
};



