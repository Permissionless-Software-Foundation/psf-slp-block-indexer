/*
  Adapter library for the status database.
*/

// Global libraries
import axios from 'axios'
import RetryQueue from '@chris.troutner/retry-queue'

// Local libraries
import config from '../../config/index.js'
import RPC from './rpc.js'

class StatusDb {
  constructor (localConfig = {}) {
    // Encapsulate dependencies
    this.axios = axios
    this.config = config
    this.rpc = new RPC()
    this.retryQueue = new RetryQueue({})

    // Bind 'this' object to all subfunctions
    this.getStatus = this.getStatus.bind(this)
  }

  async getStatus () {
    try {
      const response = await this.axios.get(`${this.config.psfSlpDbUrl}/level/status/status`)
      // console.log('Response: ', response.data)

      return response.data
    } catch (err) {
      // console.error('Error in StatusDb.getStatus(): ', err.message)
      console.log('State not found. Creating fresh state.')

      // Get the current block height
      const biggestBlockHeight = await this.retryQueue.addToQueue(this.rpc.getBlockCount, {})
      // console.log('Current chain block height: ', biggestBlockHeight)

      // New database, so there is no status. Create it.
      const statusData = {
        startBlockHeight: 543376,
        syncedBlockHeight: 543376,
        chainTipHeight: biggestBlockHeight
      }

      await this.axios.post(`${this.config.psfSlpDbUrl}/level/status`, {
        statusKey: 'status',
        statusData
      })

      return statusData
    }
  }
}

export default StatusDb
