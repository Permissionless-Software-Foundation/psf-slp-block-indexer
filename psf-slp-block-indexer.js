/*
  Entry point for the SLP block indexer.
*/

// Local libraries
import Adapters from './src/adapters/adapters-index.js'
import UseCases from './src/use-cases/use-cases-index.js'
import Controllers from './src/controllers/controllers-index.js'

// const EPOCH = 1000 // blocks between backups

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

    const status = await useCases.state.getStatus()
    console.log('Indexer State: ', status)
    console.log('')

    // const blockData = await useCases.indexBlocks.processBlock(status.syncedBlockHeight)
    // console.log('Block data: ', blockData)

    let nextBlockHeight = status.syncedBlockHeight + 1
    do {
      await useCases.indexBlocks.processBlock(nextBlockHeight)

      // Update the synced block height.
      nextBlockHeight = await useCases.state.updateIndexedBlockHeight({ lastIndexedBlockHeight: nextBlockHeight })

      // Shut down elegantly if the 'q' key was detected.
      const shouldStop = controllers.keyboard.stopStatus()
      // console.log('shouldStop: ', shouldStop)
      if (shouldStop) {
        console.log(
          `'q' key detected. Stopping indexing. Last block processed was ${
            100 - 1
          }`
        )
        process.exit(1)
      }
    // } while (nextBlockHeight < 543998)
    } while (nextBlockHeight < 543378)

    console.log('\n\nIndexing complete.')
    process.exit(0)
  } catch (err) {
    console.error('Error in psf-slp-block-indexer.js/start(): ', err)
    process.exit(1)
  }
}
start()
