const cron = require('node-cron');
const poop = require ('../controllers/example.js')

// async function runMonitorJob () {
//       console.log('running a task every 5 second');  
//       await poop.fetchAsync()
//       console.log('finished poop call ')
//   }
  


cron.schedule('0,5 * * * * * *', async function runMonitorJob () {
      console.log('running a task every 5 second');  
      await poop.fetchAsync()
      console.log('finished poop call ')
  }

);