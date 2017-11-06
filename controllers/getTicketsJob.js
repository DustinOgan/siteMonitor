const config = require("config");
const fetch = require("node-fetch");
var unregisteredGuest = require('./unregisteredGuest.js')


function create(guestId) {
    var server = config.get('monitorConfig')

    var url = server.baseUrl + server.getTick
    var postBody = '{"externalGuestId":"${guestId}","sessionId":"${guestId}","cards":"Tickets_SC_Web","catalogId":"10551","ip":"ip_Tickets_01","ic":"UO website","firstTimeVisitor":"N","geoLocation":"OUS","ticketsPageNumberOfDays":"3","ticketsPageNumberOfAdults":"2","ticketsPageNumberOfChildren":"0","ticketsPageFloridaResidentFlag":"N","persona":"","attractionExperience":"","attractionInterest":"","attractionLocation":"","mapLocation":"","pageBrowsed":"","ticketsPageSelectedTicketDate":"","dates":"","seasons":"","adobeTags":{"OrlandoFL":"success","TicketsContentNoPurch":"Success","ticketscontentviewnopurchasefl30days":"success","ticketscontentviewnopurchasefl7days":"success"}}'
    var postParams = { "method": 'POST', "body": postBody, "headers": { 'Content-Type': 'application/json' } };
    return { url, postBody, postParams };
}


async function send() {
    let guestResp = await unregisteredGuest.send();
    let json = await guestResp.json()
    console.log(json)
    let guestId = await json.result.guestProfile.guestId
    let tickets = await create(guestId)
    let ticketsResp = await fetch(tickets.url, tickets.postParams).catch(e => console.log('catch', e))
    let ticketsJson = await ticketsResp.json()
    console.log(ticketsJson)
}

module.exports = {
    send: send
}