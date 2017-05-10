"use strict"

// data Effect = Effect State (IO ())
module.exports = (state, io) => ({
  io: io,
  state: state
})
