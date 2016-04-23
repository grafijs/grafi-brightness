;(function () {
  /**
    ## ImageData object constructor
    Every return from grafi method is formatted to an ImageData object.
    This constructor is used when `window` is not available.
    (for example you are using grafi in node)
   */
  function GrafiImageData (pixelData, width, height) {
    this.width = width
    this.height = height
    this.data = pixelData
  }

  /**
    ## Color Depth Checker
    To maintain simplicity of code, grafi only accepts ImageData in RGBA
    Length of pixelData must be 4 times as much as available pixels (width * height).
   */
  function checkColorDepth (dataset, width, height) {
    var colorDepth
    if (dataset.width && dataset.height) {
      // When ImageData object was passed as dataset
      colorDepth = dataset.data.length / (dataset.width * dataset.height)
    } else {
      // When just an array was passed as dataset
      colorDepth = dataset.length / (width * height)
    }

    if (colorDepth !== 4) {
      throw new Error('data and size of the image does now match')
    }
  }

  /**
    ## formatter
    Internal function used to format pixel data into ImageData object

    ### Parameters
      - pixelData `Uint8ClampedArray`: pixel representation of the image
      - width `Number`: width of the image
      - hight `Number`: height of the image

    ### Example
        formatter(new Uint8ClampedArray[400], 10, 10)
        // ImageData { data: Uint8ClampedArray[400], width: 10, height: 10, }
   */
  function formatter (pixelData, width, height) {
    // check the size of data matches
    checkColorDepth(pixelData, width, height)

    if (!(pixelData instanceof Uint8ClampedArray)) {
      throw new Error('pixel data passed is not an Uint8ClampedArray')
    }

    // If window is available create ImageData using browser API,
    // otherwise call ImageData constructor
    if (typeof window === 'object') {
      return new window.ImageData(pixelData, width, height)
    }
    return new GrafiImageData(pixelData, width, height)
  }
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

  var grafi = {}
  grafi.brightness = brightness

  if (typeof module === 'object' && module.exports) {
    module.exports = grafi
  } else {
    this.grafi = grafi
  }
}())
