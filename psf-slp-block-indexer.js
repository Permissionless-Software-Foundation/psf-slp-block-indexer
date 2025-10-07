/*
  Entry point for the SLP block indexer.
*/

// Local libraries
import Adapters from './src/adapters/adapters-index.js'
import UseCases from './src/use-cases/use-cases-index.js'

async function start () {
  try {
    // Initialize the adapter libraries.
    const adapters = new Adapters()
    await adapters.initAdapters()

    // Initialize the use case libraries.
    const useCases = new UseCases({ adapters })
    await useCases.initUseCases()

    console.log('Starting SLP block indexer...')
  } catch (err) {
    console.error('Error in psf-slp-block-indexer.js/start(): ', err)
    process.exit(1)
  }
}
start()
