"use strict"

// data IO a = IO (() -> a)
const IO = module.exports = unsafe => ({
  bind: f => IO(() => f(unsafe()).unsafe()),
  map: f => IO(() => f(unsafe())),
  unsafe: unsafe
})
