"use strict"

const Task = require("./Task.js")

// data Cause = Cause Action Lens
const Cause = (action, lens) => ({
  action: action,
  lens: lens
})

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

Cause.handle = handle
Cause.listen = listen
module.exports = Cause
