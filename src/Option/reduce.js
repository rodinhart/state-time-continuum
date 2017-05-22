"use strict"

const Effect = require("../Effect.js")
const lang = require("../lang.js")

// reduce :: Action -> State -> Effect State
module.exports = action => state => {
  switch (action.type) {
    case "OptionChanged":
      return Effect(lang.mixin({ enabled: action.enabled })(state))
  }

  return Effect(state)
}
