const resizer = require('./index')



console.log(resizer.resize(2, 2, 300, 300, {
    resizeType: 'exact', // exact, fast
    // mode: 'auto', // maximize, minimize, auto
    // // devideValue: 1.05,
    // // subtractValue: 1,
    // stepTimeout: 100000000
}))