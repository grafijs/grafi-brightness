/**
  ## brightness method
  Brief description

  ### Parameters
    - imageData `Object`: ImageData object
    - option `Object` : Option object
      - gamma `Number` : gamma level
      - monochrome `Boolean` : output to be monochrome (single color depth) image

  ### Example
      //code sample goes here
 */
function brightness (imgData, option) {
  // check options object
  option = option || {}
  option.monochrome = option.monochrome || false
  option.gamma = option.gamma || 1

  var pixelSize = imgData.width * imgData.height
  var dataLength = imgData.data.length
  var colorDepth = dataLength / pixelSize
  var gamma =  1 / option.gamma

  if (colorDepth !== 4 && colorDepth !== 1) {
    throw new Error('ImageObject has incorrect color depth, please pass RGBA image')
  }
  var newPixelData = new Uint8ClampedArray(pixelSize * (option.monochrome || 4))
  var i, _index
  for (p = 0; p < pixelSize; p++) {
    // colorDepth 4 = the image has Alpha channel, skip brightness adjusting every 4th byte
    if (colorDepth === 1 || option.monochrome) {
      newPixelData[i] = 255 * Math.pow((imgData.data[p] / 255), gamma)
      continue
    }
    _index = p * 4
    newPixelData[_index] = 255 * Math.pow((imgData.data[_index] / 255), gamma)
    newPixelData[_index + 1] = 255 * Math.pow((imgData.data[_index + 1] / 255), gamma)
    newPixelData[_index + 2] = 255 * Math.pow((imgData.data[_index + 2] / 255), gamma)
    newPixelData[_index + 3] = imgData.data[_index + 3]
  }

  return formatter(newPixelData, imgData.width, imgData.height)
}

