# id-generator

Generates unique ids using uuid and an running number. Useful for enviroments where the cost of generating a new uuid each time is too high. By default, when the counter reaches 2^53 it will reset and a new uuid will be generated

### Install
```
	npm install id-generator
```

### Usage
```
	var generator = require('id-generator')
	var id = generator.newId()

	generator.on('reset', function(g) {
		console.log(g.prefix)
	})
```
from command line:
```
	> id-generator --count=10
```

