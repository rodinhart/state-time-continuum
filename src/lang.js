"use strict"

const compose = g => f => x => g(f(x))

const mixin = x => y => {
  var k

  for (k in x) {
    y[k] = x[k]
  }

  return y
}

module.exports = {
  compose: compose,
  mixin: mixin
}
