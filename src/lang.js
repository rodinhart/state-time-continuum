"use strict"

const compose = g => f => x => g(f(x))

const concat = x => y => {
  var k, r

  r = {}
  for (k in x) {
    r[k] = x[k]
  }

  for (k in y) {
    r[k] = y[k]
  }

  return r
}

const mixin = x => y => {
  var k

  for (k in x) {
    y[k] = x[k]
  }

  return y
}

module.exports = {
  compose: compose,
  concat: concat,
  mixin: mixin
}
