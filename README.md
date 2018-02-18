# id-generator

Generates unique ids using uuid and an running number. 

Useful for enviroments where the cost of generating a new uuid each time is too high or
when id generation is distributed and one does not want to coordinate uniqueness.

By default, when the counter reaches 2^53 it will reset and a new uuid will be generated.

### Install
```
    npm install id-generator
```

### Usage
```js
    var Generator = require('id-generator')
    var g = new Generator()
    
    console.log(g.newId()) // outputs: 049f2d25-f1ec-424a-999b-51d2a34aedff.1
    console.log(g.newId()) // outputs: 049f2d25-f1ec-424a-999b-51d2a34aedff.2
    console.log(g.newId()) // outputs: 049f2d25-f1ec-424a-999b-51d2a34aedff.3

    g.reset() // reset will occur after 2^53 invocations of newId() by default, but you can change that by doing g.max=123

    console.log(g.newId()) // outputs: 4ea9b5d9-e616-45f6-bdf4-11d382062fdc.1
    console.log(g.newId()) // outputs: 4ea9b5d9-e616-45f6-bdf4-11d382062fdc.2
    console.log(g.newId()) // outputs: 4ea9b5d9-e616-45f6-bdf4-11d382062fdc.3
    
    g.on('reset', function(g) {
        console.log(g.prefix) // outputs 4ea9b5d9-e616-45f6-bdf4-11d382062fdc
    })

    // Override uuid prefix with something else
    var anotherG = new Generator(function () { return 'bar' })
    console.log(g.newId()) // outputs: bar.1
    console.log(g.newId()) // outputs: bar.2
```

from command line:
```
    > id-generator --count=10
```
