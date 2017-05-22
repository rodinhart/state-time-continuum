"use strict"

const lang = require("./lang.js")

// data Effect a = Effect a (IO ())
const Effect = (state, io) => ({
  io: io,
  state: state
})

// combine :: (State -> Effect State) -> (State -> Effect State) -> (State -> Effect State)
const combine = g => f => state => {
  const x = f(state)
  const y = g(x.state)

  return Effect(
    y.state,
    x.io ? (y.io ? x.io.bind(y.io) : x.io) : y.io
  )
}

module.exports = lang.mixin({
  combine: combine
})(Effect)
