"use strict"

// data Effect a = Effect a (IO ())
module.exports = (state, io) => ({
  io: io,
  state: state
})
