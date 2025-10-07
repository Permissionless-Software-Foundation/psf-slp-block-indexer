/*
  Entry point for the SLP block indexer.
*/

async function start() {
  try {
    console.log('Starting SLP block indexer...')
  } catch(err) {
    console.error('Error in psf-slp-block-indexer.js/start(): ', err)
    process.exit(1)
  }
}
start()