#!/usr/bin/env node
var uuid = require('node-uuid')
var EventEmitter = require('events').EventEmitter
var util = require('util')
var argv = require('minimist')(process.argv.slice(2));

module.exports = IdGenerator

var MAX = Math.pow(2, 53)

util.inherits(IdGenerator, EventEmitter)
function IdGenerator(prefixGenerator) {
	EventEmitter.call(this)
	this.prefixGenerator = prefixGenerator || uuid
	this.max = MAX
	this.separator = '.'
	this.reset()
}

IdGenerator.prototype.reset = function () {
	this.count = 0
	this.prefix = this.prefixGenerator()
	this.emit('reset', this)
}

IdGenerator.prototype.newId = function() {
	if (this.count++ === this.max) {
		this.reset()
	}

	return this.prefix + this.separator + this.count
}

if (require.main === module) {

	var g = new IdGenerator()
	for (var count = argv.count || 1; count > 0; count--)
		console.log(g.newId())
}