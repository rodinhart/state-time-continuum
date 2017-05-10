"use strict"

// Event -> Action
const changed = event => ({
  type: "optionChanged",
  enabled: event.target.checked
})

module.exports = {
  changed: changed
}
