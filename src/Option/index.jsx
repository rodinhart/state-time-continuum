"use strict"

const action = require("./action.js")
const lang = require("../lang.js")
const React = require("react")

// Imports.
const Checkbox = require("antd/lib/checkbox")

const Option = props => {
  const id = props.id
  const state = props.state
  const dispatch = props.dispatch

  return (
    <Checkbox
      checked={state.enabled}
      onChange={
        props.dispatch ? lang.compose(dispatch)(action.changed(id)) : undefined
      }
    >
      {state.label}
    </Checkbox>
  )
}

module.exports = Option
