"use strict"

// Imports.
const Effect = require("./Effect.js")
const lang = require("./lang.js")
const Lens = require("data-control").Lens
const Task = require("data-control").Task

// data Cause = Cause Action Lens
const Cause = (action, lens) => ({
  action: action,
  // apply :: (Action -> State -> Effect State) -> Cause -> State -> Effect State
  apply: reduce => state => {
    const sub = reduce(action)(Lens.view(lens)(state))

    return Effect(Lens.set(lens)(sub.state)(state), sub.io)
  },
  lens: lens
})

// app :: (a -> IO ()) -> (Cause -> a -> Effect a (IO ())) -> Effect a -> Task String (Effect a)
const app = render => reduce => effect => {
  // loop :: Effect -> Task () Effect
  const loop = effect => Cause.listen(effect.io).map(cause => {
    const newEffect = reduce(cause)(effect.state)
    var io = newEffect.io

    io = io ? io.bind(() => render(newEffect.state)) : render(newEffect.state)

    return Effect(newEffect.state, io)
  }).bind(loop)

  return loop(Effect(effect.state, effect.io || render(effect.state)))
}

var _dispatch

// dispatch :: Action -> ()
const dispatch = action => _dispatch(Cause(action, Lens.Id))

// dispatchAt :: Lens -> Action -> ()
const dispatchAt = lens => action => _dispatch(Cause(action, lens))

// listen :: IO () -> Task () Cause
const listen = io => Task((rej, res) => {
  _dispatch = cause => {
    _dispatch = undefined
    res(cause)
  }

  if (io) io.unsafe()
})

// Exports.
module.exports = lang.mixin({
  app: app,
  dispatch: dispatch,
  dispatchAt: dispatchAt,
  listen: listen
})(Cause)
