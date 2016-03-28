;(function(){

import '../node_modules/grafi-formatter/src/formatter'
import 'brightness'

  var grafi = {}
  grafi.brightness = brightness

  if (typeof module === 'object' && module.exports) {
    module.exports = grafi
  } else {
    this.grafi = grafi
  }
}())
