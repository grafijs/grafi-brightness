/**
  ## brightness method
  Adjust brightness of an image based on level passed

  ### Parameters
    - imageData `Object`: ImageData object
    - option `Object` : Option object
      - level `Number` : brightness level

  ### Example
      var input = { data: Uint8ClampedArray[400], width: 10, height: 10 }
      // brighten image
      grafi.brightness(input, {level: 10})
      // darken image
      grafi.brightness(input, {level: -10})
 */
function brightness (imgData, option) {
  // sanitary check for input data
  checkColorDepth(imgData)

  // check options object
  option = option || {}
  option.level = option.level || 0

  var pixelSize = imgData.width * imgData.height
  var level = option.level

  var newPixelData = new Uint8ClampedArray(pixelSize * 4)
  var pixel, index
  for (pixel = 0; pixel < pixelSize; pixel++) {
    index = pixel * 4
    newPixelData[index] = imgData.data[index] + level
    newPixelData[index + 1] = imgData.data[index + 1] + level
    newPixelData[index + 2] = imgData.data[index + 2] + level
    newPixelData[index + 3] = imgData.data[index + 3]
  }

  return formatter(newPixelData, imgData.width, imgData.height)
}

