const cron = require('node-cron');
const webCommerceTokens = require ('../controllers/webCommerceJob.js')
const getTickets = require ('../controllers/getTicketsJob.js')


cron.schedule('0,5 * * * * * *', async function runMonitorJob () {
      console.log('statring webCommerce call')
      await webCommerceTokens.send()
      console.log('finished webCommerce Tokens call ')
  }
  
  );
cron.schedule('0,5 * * * * * *', async function runMonitorJob () {
      console.log('statring ticket call')
      await getTickets.send()
      console.log('finished tickets Tokens call ')
  }


  );