;(function () {
  /**
    ## ImageData object constructor
    Every return from grafi method is formatted to an ImageData object.
    This constructor is used when `window` is not available.
   */
  function ImageData (pixelData, width, height) {
    this.width = width
    this.height = height
    this.data = pixelData
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
    var colorDepth = pixelData.length / (width * height)

    // Length of pixelData must be multipul of available pixels (width * height).
    // Maximum color depth allowed is 4 (RGBA)
    if (Math.round(colorDepth) !== colorDepth || colorDepth > 4) {
      throw new Error('data and size of the image does now match')
    }

    if (!(pixelData instanceof Uint8ClampedArray)) {
      throw new Error('pixel data passed is not an Uint8ClampedArray')
    }

    // If window is avilable create ImageData using browser API,
    // otherwise call ImageData constructor
    if (typeof window === 'object' && colorDepth === 4) {
      return new window.ImageData(pixelData, width, height)
    }
    return new ImageData(pixelData, width, height)
  }
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
    var gamma = 1 / option.gamma

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

  var grafi = {}
  grafi.brightness = brightness

  if (typeof module === 'object' && module.exports) {
    module.exports = grafi
  } else {
    this.grafi = grafi
  }
}())
