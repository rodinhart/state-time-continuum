"use strict"

const lang = require("./lang.js")

// data Effect a = Effect a (IO ())
const Effect = (state, io) => ({
  io: io,
  state: state
})

// combine :: [(State -> Effect State)] -> (State -> Effect State)
const combine = reducers => initial => {
  var i, io, state, t

  t = reducers[0](initial)
  state = t.state
  io = t.io
  for (i = 1; i < reducers.length; i++) {
    t = reducers[i](state)
    state = t.state
    io = io ? (t.io ? io.bind(() => t.io) : io) : t.io
  }

  return Effect(state, io)
}

module.exports = lang.mixin({
  combine: combine
})(Effect)
