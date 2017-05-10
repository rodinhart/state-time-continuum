"use strict"

const lang = require("../lang.js")

// Action -> State -> State
const changed = action => state => lang.mixin({ enabled: action.enabled })(state)

module.exports = changed // TODO switch/map
