/*
  Entry point for the SLP block indexer.
*/

// Local libraries
import Adapters from './src/adapters/adapters-index.js'
import UseCases from './src/use-cases/use-cases-index.js'
import Controllers from './src/controllers/controllers-index.js'

async function start () {
  try {
    // Initialize the adapter libraries.
    const adapters = new Adapters()
    await adapters.initAdapters()

    // Initialize the use case libraries.
    const useCases = new UseCases({ adapters })
    await useCases.initUseCases()

    // Initialize the controller libraries.
    const controllers = new Controllers({ useCases, adapters })
    await controllers.initControllers()

    console.log('Starting SLP block indexer...')

    const status = await useCases.indexBlocks.getStatus()
    console.log('Status: ', status)

    const blockData = await useCases.indexBlocks.processBlock(status.syncedBlockHeight)
    console.log('Block data: ', blockData)

    // do {

    //   // Shut down elegantly if the 'q' key was detected.
    //   const shouldStop = controllers.keyboard.stopStatus()
    //   console.log('shouldStop: ', shouldStop)
    //   if (shouldStop) {
    //     console.log(
    //       `'q' key detected. Stopping indexing. Last block processed was ${
    //         100 - 1
    //       }`
    //     )
    //     process.exit(1)
    //   }
    // } while (i < 10000000)
  } catch (err) {
    console.error('Error in psf-slp-block-indexer.js/start(): ', err)
    process.exit(1)
  }
}
start()
