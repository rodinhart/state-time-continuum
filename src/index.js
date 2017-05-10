"use strict"

// Imports.
const App = require("./App/index.js")
const Effect = require("./Effect.js")
const IO = require("./IO.js")
const React = require("react")
const reactDom = require("react-dom")
const Task = require("./Task.js")

// render :: State -> IO ()
const render = state => IO(() => reactDom.render(
  React.createElement(App, { state: state }),
  document.getElementById("main") /* global document */
))

// app :: Effect -> Task () Effect
const app = effect =>
  Task.listen(effect.io).map(cause => {
    const newEffect = App.reduce(cause)(effect.state)
    var io = newEffect.io

    io = io ? io.bind(() => render(newEffect.state)) : render(newEffect.state)

    return Effect(newEffect.state, io)
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

app(Effect(state, render(state))).fork(console.log, console.log)
