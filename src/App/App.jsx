"use strict"

// Imports.
const Form = require("antd/lib/form")
const { Item } = Form
const Lens = require("data-control").Lens
const Option = require("../Option/index.js")
const React = require("react")
const Reaction = require("../Reaction.js")

const lensA = Lens.ofProp("optionA")
const lensB = Lens.ofProp("optionB")

// App :: State -> ReactComponent
module.exports = props => {
  const state = props.state
  const dispatch = props.dispatch

  return (
    <Form>
      <Item>
        <Option id="A" dispatch={dispatch} state={state.optionA} />
      </Item>
      <Item>
        <Option id="B" dispatch={dispatch} state={state.optionB} />
      </Item>
      <Item>
        <span>Selected: {state.selected(state)}</span>
        <br />
        <span>Count: {state.count}</span>
      </Item>
    </Form>
  )
}
