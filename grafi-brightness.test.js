var assert = require('assert')
var grafi = require('./grafi-brightness.js')

var inputData = {data: [10, 20, 30, 255], width: 1, height: 1}
var brightenData = grafi.brightness(inputData, {level: 10})
var darkenData = grafi.brightness(inputData, {level: -10})

assert(brightenData.constructor.toString().match(/function\s(\w*)/)[1] === 'GrafiImageData',
  'returned object is an instance of GrafiImageData')

assert(brightenData.data[0] > inputData.data[0],
  'returned pixel data is blighter than input pixel data')

assert(brightenData.data[3] === inputData.data[3],
  'for RGBA mode, alpha channel is not altered')

assert(darkenData.data[0] < inputData.data[0],
  'returned pixel data is darker than input pixel data')
