/*
  This library contains business logic for maintaining the state of the indexer.
*/

// Public npm libraries
import RetryQueue from '@chris.troutner/retry-queue'

class State {
  constructor (localConfig = {}) {
    if (!localConfig.adapters) {
      throw new Error('Adapters are required for the state.js use case library.')
    }
    this.adapters = localConfig.adapters

    // Encapsulate dependencies
    this.retryQueue = new RetryQueue({})

    // Bind 'this' object to all subfunctions
    this.getStatus = this.getStatus.bind(this)
  }

  // Get the sync status of the indexer.
  async getStatus () {
    try {
      const status = await this.adapters.statusDb.getStatus()
      // console.log('Indexer State: ', status)

      return status
    } catch (err) {
      console.error('Error in IndexBlocks.getStatus(): ', err)
      throw err
    }
  }
}

export default State
