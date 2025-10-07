/*
  Business logic for indexing blocks.
*/

class IndexBlocks {
  constructor (localConfig = {}) {
    // Throw error if adapters are not provided.
    if (!localConfig.adapters) {
      throw new Error('Adapters are required for the index-blocks.js use case library.')
    }
    this.adapters = localConfig.adapters

    // Bind 'this' object to all subfunctions
    this.getStatus = this.getStatus.bind(this)
  }

  // Get the sync status of the indexer.
  async getStatus () {
    try {
      const status = await this.adapters.statusDb.getStatus()
      console.log('Status: ', status)
    } catch (err) {
      console.error('Error in IndexBlocks.getStatus(): ', err)
      throw err
    }
  }
}

export default IndexBlocks
