var IdGenerator = require('../index.js')
var assert = require('assert')

describe('IdGenerator', function () {
	var generator

	it('generates ids', function () {
		generator.prefix = 'abc'

		assert.strictEqual(generator.newId(), 'abc' + generator.separator + '1')
		assert.strictEqual(generator.newId(), 'abc' + generator.separator + '2')
	})

	it('resets when max is reached', function () {
		generator.max = 2
		generator.newId()
		assert.strictEqual(generator.count, 1)
		generator.newId()
		assert.strictEqual(generator.count, 2)
		generator.newId()
		assert.strictEqual(generator.count, 0)
	})

	it('emits an event when resets', function(done) {
		generator.max = 1

		generator.on('reset', function(g) {
			assert.strictEqual(g, generator)
			done()
		})

		generator.newId()
		generator.newId()
	})

	it('can have an external id prefix generator', function() {
		var aGenerator = new IdGenerator(function () { return 'foo' })

		assert.strictEqual(aGenerator.newId(), 'foo.1')
		assert.strictEqual(aGenerator.newId(), 'foo.2')
	})

	beforeEach(function () {
		generator = new IdGenerator()
	})
})