const cron = require('node-cron');
const webCommerceTokens = require('../controllers/webCommerceJob.js')
const getTickets = require('../controllers/getTicketsJob.js')
const unregisteredGuest = require('../controllers/unregisteredGuest.js')

cron.schedule('0,30 * * * * * *', async function wcCall() {
    console.log('statring webCommerce call')
    await webCommerceTokens.send()
    console.log('finished webCommerce Tokens call ')
    console.log('statring ticket call')
    await getTickets.send()
    console.log('finished tickets Tokens call ')
    console.log('statring guest call')
    let guest = await unregisteredGuest.send()
    let guestLog = await  guest.json()
    console.log(guestLog)
    console.log('finished guest call ')
  }

);