"use strict"

var dispatch

// handle :: Lens -> Action -> ()
const handle = lens => action => dispatch([action, lens])

// listen :: IO () -> Task () (Action, Lens)
const listen = io => Task((rej, res) => {
  dispatch = brief => {
    dispatch = undefined
    res(brief)
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
