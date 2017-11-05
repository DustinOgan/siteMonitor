const config = require("config");
const fetch = require("node-fetch");


async function send () {
  var tickets = createCall()
  console.log(tickets.url)
  console.log(tickets.postParams)
  let ticketsCall = await fetch(tickets.url, tickets.postParams);

  let json = await ticketsCall.json();
  
  console.log(json);
  return json
}



function createCall() {
  var path = config.get("ticketsConfig.path")
  var server = config.get('SystemConfig.baseUrl')
  this.url =  server+path
  console.log(this.url);
  var postBody = '{"externalGuestId":"5572cef0-9b17-11e7-aaf3-bd4c20405e42","sessionId":"5572cef0-9b17-11e7-aaf3-bd4c20405e42","cards":"Tickets_SC_Web","catalogId":"10551","ip":"ip_Tickets_01","ic":"UO website","firstTimeVisitor":"N","geoLocation":"OUS","ticketsPageNumberOfDays":"3","ticketsPageNumberOfAdults":"2","ticketsPageNumberOfChildren":"0","ticketsPageFloridaResidentFlag":"N","persona":"","attractionExperience":"","attractionInterest":"","attractionLocation":"","mapLocation":"","pageBrowsed":"","ticketsPageSelectedTicketDate":"","dates":"","seasons":"","adobeTags":{"OrlandoFL":"success","TicketsContentNoPurch":"Success","ticketscontentviewnopurchasefl30days":"success","ticketscontentviewnopurchasefl7days":"success"}}'
  this.postParams = { method: 'POST', body: postBody , headers: { 'Content-Type': 'application/json' }};
  return this;
}


async function send(){
    let  tickets = await  createCall()
    let  ticketsResp = await  fetch(tickets.url, tickets.postParams)
    let ticketsJson = await ticketsResp.json()
    console.log(ticketsJson)
}

module.exports = {
  send : send
}