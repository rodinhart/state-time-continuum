"use strict"

// changed :: String -> Event -> Action
const changed = id => event => ({
  type: "OptionChanged",
  id: id,
  enabled: event.target.checked
})

module.exports = {
  changed: changed
}
