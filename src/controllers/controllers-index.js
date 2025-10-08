/*
  This is a top-level library that encapsulates all the additional Controllers.
  The concept of Controllers comes from Clean Architecture:
  https://troutsblog.com/blog/clean-architecture
*/

// Public npm libraries.

// Local libraries
import Keyboard from './keyboard.js'

class Controllers {
  constructor (localConfig = {}) {
    // Dependency Injection
    if (!localConfig.useCases) {
      throw new Error('Use cases are required for the controllers.')
    }
    this.useCases = localConfig.useCases
    if (!localConfig.adapters) {
      throw new Error('Adapters are required for the controllers.')
    }
    this.adapters = localConfig.adapters

    // Encapsulate dependencies
    this.keyboard = new Keyboard(localConfig)

    // Bind 'this' object to all subfunctions.
    this.initControllers = this.initControllers.bind(this)
  }

  async initControllers () {
    this.keyboard.initKeyboard()
  }
}

export default Controllers
