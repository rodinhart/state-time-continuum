"use strict"

// Imports.
const Lens = require("../lens.js")
const Option = require("../Option/index.js")

// reduce :: Cause -> State -> Effect
module.exports = cause => state => ({
  state: Lens.over(cause.lens)(Option.reduce(cause.action))(state)
})
