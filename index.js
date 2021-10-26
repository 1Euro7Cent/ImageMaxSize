var defaultOptions = {
    resizeType: 'exact', // exact, fast
    mode: 'auto', // maximize, minimize, auto
    devideValue: 1.05,
    subtractValue: 1,
    stepTimeout: 100000000,// to prevent infinite loops
    logging: 'off',// verbose, off, minimal
    logger: (message) => {
        console.log('[DEBUG]:', message)
    }
}

/**
 * 
 * @param {number} width 
 * @param {number} height
 * @param {number} maxWidth
 * @param {number} maxHeight
 * @param {object} options 
 * @returns {object}
 */
function resize(width, height, maxWidth, maxHeight, options = defaultOptions) {
    var steps = 0
    var startTime = Date.now()
    if (typeof width !== 'number' || typeof height !== 'number' || typeof maxWidth !== 'number' || typeof maxHeight !== 'number') return {
        width: 0,
        height: 0,
        timeTook: Date.now() - startTime,
        steps: steps
    }
    if (width == maxWidth || height == maxHeight) return {
        width: width,
        height: height,
        timeTook: Date.now() - startTime,
        steps: steps
    }
    ///*
    if (!options.resizeType) options.resizeType = defaultOptions.resizeType
    if (!options.mode) options.mode = defaultOptions.mode
    if (!options.devideValue) options.devideValue = defaultOptions.devideValue
    if (!options.subtractValue) options.subtractValue = defaultOptions.subtractValue
    if (!options.stepTimeout) options.stepTimeout = defaultOptions.stepTimeout
    if (!options.logging) options.logging = defaultOptions.logging
    if (!options.logger) options.logger = defaultOptions.logger
    //*/
    if (options.logging == 'minimal' || options.logging == 'verbose') options.logger(`Options:`)
    if (options.logging == 'minimal' || options.logging == 'verbose') options.logger(options)
    var mode
    var nWidth, nHeight;
    if (options.mode == 'auto') {

        if (width > maxWidth || height > maxHeight) {
            mode = 'minimize'
        }
        else {
            mode = 'maximize'
        }
    }
    else {
        mode = options.mode
    }
    if (options.logging == 'minimal' || options.logging == 'verbose') options.logger(`Resize mode is: ${mode}`)


    var looping = true
    while (looping) {
        steps++
        if (steps >= options.stepTimeout) return {
            width: nWidth,
            height: nHeight,
            timeTook: Date.now() - startTime,
            steps: steps
        }


        var out = sizeStep(width, height, options, mode)
        nWidth = out.width
        nHeight = out.height
        if (options.logging == 'verbose') options.logger(`Resizing to ${nWidth}x${nHeight} (${mode})`)


        var imOut = sizeStep(nWidth, nHeight, options, mode)
        var imHeight = imOut.height
        var imWidth = imOut.width
        // if (nWidth >=)
        // break
        switch (mode) {
            case 'minimize':
                looping = imWidth >= maxWidth || imHeight >= maxHeight
                break
            case 'maximize':
                looping = imWidth > maxWidth || imHeight > maxHeight
                looping = !looping
                break
        }
        // looping = !looping
        if (!looping) {
            return {
                width: nWidth,
                height: nHeight,
                timeTook: Date.now() - startTime,
                steps: steps
            }
        }
        else {
            width = nWidth
            height = nHeight
        }
    }


}
/**
 * @param {number} width 
 * @param {number} height 
 * @param {object} options 
 */
function sizeStep(width, height, options = defaultOptions, mode) {
    var nWidth, nHeight;
    switch (options.resizeType) {
        case 'fast':
            switch (mode) {
                case 'minimize':
                    nWidth = Math.ceil(width / options.devideValue)
                    nHeight = Math.ceil(height / options.devideValue)
                    break;
                case 'maximize':
                    nWidth = Math.ceil(width * options.devideValue)
                    nHeight = Math.ceil(height * options.devideValue)
                    break;
            }
            break
        case 'exact':
            switch (mode) {
                case 'minimize':
                    nWidth = Math.round(width - options.subtractValue)
                    nHeight = Math.round(height - options.subtractValue)
                    break;
                case 'maximize':
                    nWidth = Math.round(width + options.subtractValue)
                    nHeight = Math.round(height + options.subtractValue)
                    break;
            }
            break
    }
    return {
        width: nWidth,
        height: nHeight
    }

}



module.exports = {
    defaultOptions,
    resize
}