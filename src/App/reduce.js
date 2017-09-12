"use strict"

// Imports.
const Effect = require("../Effect.js")
const lang = require("../lang.js")
const Option = require("../Option/index.js")

// reduce :: Action -> State -> Effect State a
module.exports = action => state => {
  switch (action.type) {
    case "OptionChanged":
      return Effect(
        lang.concat(state)({
          count: state.count + 1
        })
      )
  }

  return Effect(state)
}
