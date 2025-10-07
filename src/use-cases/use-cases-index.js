/*
  Top-level library for the use cases.
*/

// Local libraries
import IndexBlocks from './index-blocks.js'

class UseCases {
  constructor (localConfig = {}) {
    // Throw error if adapters are not provided.
    if (!localConfig.adapters) {
      throw new Error('Adapters are required for the use cases.')
    }
    this.adapters = localConfig.adapters

    // Encapsulate dependencies
    this.indexBlocks = new IndexBlocks({ adapters: this.adapters })

    // Bind 'this' object to all subfunctions
    this.initUseCases = this.initUseCases.bind(this)
  }

  async initUseCases () {
    await this.indexBlocks.getStatus()

    console.log('Use cases initialized.')
    return true
  }
}

export default UseCases
