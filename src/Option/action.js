"use strict"

// Event -> Action
const changed = event => ({
  type: "OptionChanged",
  enabled: event.target.checked
})

module.exports = {
  changed: changed
}
