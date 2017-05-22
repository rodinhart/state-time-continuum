"use strict"

// Imports.
const App = require("./App/index.js")
const Cause = require("./Cause.js")
const Effect = require("./Effect.js")
const IO = require("data-control").IO
const Option = require("./Option/index.jsx")
const React = require("react")
const reactDom = require("react-dom")

// render :: State -> IO ()
const render = state => IO(() => reactDom.render(
  React.createElement(App, { state: state }),
  document.getElementById("main") /* global document */
))

// reduce :: Cause -> State -> Effect State
const reduce = cause => Effect.combine
  (App.reduce(cause.action))
  (cause.apply(Option.reduce))

// app :: Task String (Effect State)
const app = Cause.app(render)(reduce)(Effect({
  count: 0,
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
}))

// go
app.fork(console.log, console.log)
