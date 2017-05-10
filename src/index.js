"use strict"

// Imports.
const App = require("./App/index.js")
const IO = require("./IO.js")
const React = require("react")
const reactDom = require("react-dom")
const Task = require("./Task.js")

// render :: State -> IO ()
const render = state => IO(() => reactDom.render(
  React.createElement(App, { state: state }),
  document.getElementById("main") /* global document */
))

// app :: (State, IO ()) -> Task () (State, IO ())
const app = charge =>
  Task.listen(charge[1]).map(brief => {
    const newCharge = App.reduce(brief)(charge[0])
    var io = newCharge[1]

    io = io ? io.bind(() => render(newCharge[0])) : render(newCharge[0])

    return [newCharge[0], io]
  }).bind(app)

// go
const state = {
  optionA: {
    label: "Option A",
    enabled: false
  },
  optionB: {
    label: "Option B",
    enabled: true
  },
  selected: s => {
    var r = []
    if (s.optionA.enabled) r.push("A")
    if (s.optionB.enabled) r.push("B")

    return r.length ? r.join(" & ") : "None"
  }
}

app([state, render(state)]).fork(console.log, console.log)
