/**
  ## brightness method
  Brief description

  ### Parameters
    - imageData `Object`: ImageData object
    - option `Object` : Option object
      - level `Number` : brightness level
      - monochrome `Boolean` : output to be monochrome (single color depth) image

  ### Example
      //code sample goes here
 */
function brightness (imgData, option) {
  // check options object
  option = option || {}
  option.monochrome = option.monochrome || false
  option.level = option.level || 1

  var pixelSize = imgData.width * imgData.height
  var dataLength = imgData.data.length
  var colorDepth = dataLength / pixelSize
  var level = option.level

  if (colorDepth !== 4 && colorDepth !== 1) {
    throw new Error('ImageObject has incorrect color depth, please pass RGBA image')
  }
  var newPixelData = new Uint8ClampedArray(pixelSize * (option.monochrome || 4))
  var i, _index
  for (p = 0; p < pixelSize; p++) {
    // colorDepth 4 = the image has Alpha channel, skip brightness adjusting every 4th byte
    if (colorDepth === 1 || option.monochrome) {
      newPixelData[i] = imgData.data[p] * level
      continue
    }
    _index = p * 4
    newPixelData[_index] = imgData.data[_index] * level
    newPixelData[_index + 1] = imgData.data[_index + 1] * level
    newPixelData[_index + 2] = imgData.data[_index + 2] * level
    newPixelData[_index + 3] = imgData.data[_index + 3]
  }

  return formatter(newPixelData, imgData.width, imgData.height)
}

