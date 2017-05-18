"use strict"

// Imports.
const Effect = require("./Effect.js")
const lang = require("./lang.js")
const Task = require("./Task.js")

// data Cause = Cause Action Lens
const Cause = (action, lens) => ({
  action: action,
  lens: lens
})

// app :: (a -> IO ()) -> (Cause -> a -> Effect a (IO ())) -> a -> Task String Effect
const app = render => reduce => state => {
  // loop :: Effect -> Task () Effect
  const loop = effect => Cause.listen(effect.io).map(cause => {
    const newEffect = reduce(cause)(effect.state)
    var io = newEffect.io

    io = io ? io.bind(() => render(newEffect.state)) : render(newEffect.state)

    return Effect(newEffect.state, io)
  }).bind(loop)

  return loop(Effect(state, render(state)))
}

var dispatch

// handle :: Lens -> Action -> ()
const handle = lens => action => dispatch(Cause(action, lens)) // split into handle and handleAt

// listen :: IO () -> Task () Cause
const listen = io => Task((rej, res) => {
  dispatch = cause => {
    dispatch = undefined
    res(cause)
  }

  if (io) io.unsafe()
})

// Exports.
module.exports = lang.mixin({
  app: app,
  handle: handle,
  listen: listen
})(Cause)
