"use strict"

// Imports.
const Effect = require("../Effect.js")
const Lens = require("../lens.js")
const Option = require("../Option/index.js")

// reduce :: Cause -> State -> Effect
module.exports = cause => state => Effect(
  Lens.over(cause.lens)(Option.reduce(cause.action))(state)
)
