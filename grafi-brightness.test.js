var assert = require('assert')
var grafi = require('./grafi-brightness.js')

var inputData = {data: [10, 20, 30, 255], width: 1, height: 1}
var monoInputData = {data: [10, 20, 30, 40], width: 2, height: 2}
var imageData = grafi.brightness(inputData, {level: 10})
var monoData = grafi.brightness(monoInputData, {level: 10, monochrome: true})

assert(imageData.constructor.toString().match(/function\s(\w*)/)[1] === 'ImageData',
  'returned object is an instance of ImageData')

assert(imageData.data[0] > inputData.data[0],
  'returned pixel data is blighter than input pixel data')

assert(imageData.data[3] === inputData.data[3],
  'for RGBA mode, alpha channel is not altered')

assert(monoData.data.length === monoInputData.width * monoInputData.height,
  'with monochrome flag, returned pixel data is single channel')
