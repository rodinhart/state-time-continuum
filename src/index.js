"use strict"

// Imports.
const ActionBus = require("./ActionBus.js")
const App = require("./App/index.js")
const Effect = require("./Effect.js")
const Option = require("./Option/index.jsx")
const React = require("react")
const Reaction = require("./Reaction.js")
const reactDom = require("react-dom")

const bus = ActionBus()

// render :: Reaction State a
const render = Reaction(state => {
  reactDom.render(
    React.createElement(App, { state: state, dispatch: bus.dispatch }),
    document.getElementById("main") /* global document */
  )
})

// reduce :: Action -> State -> Effect State a
const reduce = action =>
  Effect.combine([
    state => {
      let e2
      if (action.id === "A") {
        e2 = Option.reduce(action)(state.optionA)
        return Effect(
          Object.assign({}, state, {
            optionA: e2.state
          }),
          e2.reduction
        )
      } else if (action.id === "B") {
        e2 = Option.reduce(action)(state.optionB)
        return Effect(
          Object.assign({}, state, {
            optionB: e2.state
          }),
          e2.reduction
        )
      }
    },
    App.reduce(action)
  ])

// app :: Task String (Effect State a)
const app = Reaction.app(render)(bus)(reduce)(
  Effect({
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
  })
)

// go
app.fork(console.log, console.log)
