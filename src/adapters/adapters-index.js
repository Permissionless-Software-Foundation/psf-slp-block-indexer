/*
  This is a top-level library that encapsulates all the additional Adapters.
  The concept of Adapters comes from Clean Architecture:
  https://troutsblog.com/blog/clean-architecture
*/

// Local libraries
import StatusDb from './status-db.js'

class Adapters {
  constructor (localConfig = {}) {
    // Encapsulate dependencies
    this.statusDb = new StatusDb()

    // Bind 'this' object to all subfunctions
    this.initAdapters = this.initAdapters.bind(this)
  }

  async initAdapters () {
    console.log('Adapter libraries initialized.')
    return true
  }
}

export default Adapters
