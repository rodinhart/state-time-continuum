"use strict"

// Imports.
const Lens = require("../lens.js")
const Option = require("../Option/index.js")

// reduce :: Brief -> State -> (State, IO ())
module.exports = brief => state =>
  [Lens.over(brief[1])(Option.reduce(brief[0]))(state)]
