# Installation

```
npm i imagemaxsize
```

# usage

```js
const resizer = require("imagemaxsize");

var options = {// The default values. Note: everything in this options is OPTIONAL
  resizeType: "exact", // exact, fast
  mode: "auto", // maximize, minimize, auto
  devideValue: 1.05,
  subtractValue: 1,
  stepTimeout: 100000000, // to prevent infinite loops
  logging: "off", // verbose, off, minimal
  logger: (message) => {
    console.log("[DEBUG]:", message);
  },
};

//resizer.resize(originalWidth, originalHeight, maxWidth, maxHeight, options)
//Example:
console.log(resizer.resize(123, 224, 1920, 1080)); // { width: 979, height: 1080, timeTook: 6, steps: 856 }
```
