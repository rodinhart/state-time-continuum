"use strict"

// data Identity a = Identity a
const Identity = module.exports = x => ({
  // map :: (a -> b) -> Identity a -> Identity b
  map: f => Identity(f(x)),

  // x :: a
  x: x
})
