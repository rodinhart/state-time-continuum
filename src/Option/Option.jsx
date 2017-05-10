"use strict"

const action = require("./action.js")
const lang = require("../lang.js")
const React = require("react")

// Imports.
const Checkbox = require("antd/lib/checkbox")

const Option = props => {
  const state = props.state

  return <Checkbox checked={ state.enabled } onChange={ props.onChanged ? lang.compose(props.onChanged)(action.changed) : undefined }>
    { state.label }
  </Checkbox>
}

module.exports = Option
