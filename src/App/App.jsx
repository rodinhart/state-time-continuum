"use strict"

// Imports.
const Cause = require("../Cause.js")
const Form = require("antd/lib/form"); const { Item } = Form
const Lens = require("data-control").Lens
const Option = require("../Option/index.js")
const React = require("react")

const lensA = Lens.ofProp("optionA")
const lensB = Lens.ofProp("optionB")

// App :: State -> ReactComponent
module.exports = props => {
  const state = props.state

  return (
    <Form>
      <Item>
        <Option onChanged={ Cause.handle(lensA) } state={ state.optionA } />
      </Item>
      <Item>
        <Option onChanged={ Cause.handle(lensB) } state={ state.optionB } />
      </Item>
      <Item>
        <span>Selected: { state.selected(state) }</span>
        <br />
        <span>Count: { state.count }</span>
      </Item>
    </Form>
  )
}
