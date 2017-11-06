const config = require("config");
const fetch = require("node-fetch");


function create() {

  var server = config.get('monitorConfig')
  var url =  server.baseUrl + server.unreg;
  var postParams = { method: 'POST', body: '{"guestProfile":{"sourceId":"${service.webSourceId}"}}' , headers: { 'Content-Type': 'application/json' }};
  return {url, postParams};
}
  


async function send(){
    let guestCall = await create()
    console.log("Guest Call using URL : " + guestCall.url)
    console.log ("Guest Call using postParms: "  + guestCall.postParams.toString())
    let guestResp = await fetch(guestCall.url, guestCall.postParams)
    return guestResp; 
}



module.exports = {
    send : send
}
  

  