"use strict"

const lang = require("./lang.js")

// data Effect a = Effect a (IO ())
const Effect = (state, io) => ({
  // concat :: Effect a -> Effect a -> Effect a
  concat: y => Effect(
    lang.concat(state)(y.state),
    io ? (y.io ? io.bind(() => y.io) : io) : y.io
  ),
  io: io,
  state: state
})

module.exports = Effect
