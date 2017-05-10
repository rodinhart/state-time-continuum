"use strict"

var dispatch

// handle :: Lens -> Action -> ()
const handle = lens => action => dispatch({
  action: action,
  lens: lens
})

// listen :: IO () -> Task () Cause
const listen = io => Task((rej, res) => {
  dispatch = cause => {
    dispatch = undefined
    res(cause)
  }

  if (io) io.unsafe()
})

// data Task e a = Task (e -> ()) (a -> ())
const Task = fork => ({
  bind: f => Task((rej, res) => fork(rej, x => f(x).fork(rej, res))),
  fork: fork,
  map: f => Task((rej, res) => fork(rej, x => res(f(x))))
})

// Exports.
Task.handle = handle
Task.listen = listen
module.exports = Task
