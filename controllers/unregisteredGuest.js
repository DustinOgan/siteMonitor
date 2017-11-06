const config = require("config");
const fetch = require("node-fetch");


function create() {

    var server = config.get('monitorConfig')
    var url = server.baseUrl + server.unreg;
    var postParams = { "method": 'POST', "body": '{"guestProfile":{"sourceId":"${service.webSourceId}"}}', "headers": { 'Content-Type': 'application/json' } };
    return { url, postParams };
}



async function send() {
    let guestCall = await create()
    let guestResp = await fetch(guestCall.url, guestCall.postParams).catch(e => console.log('catch', e))
    return guestResp;
}


module.exports = {
    send: send,

}