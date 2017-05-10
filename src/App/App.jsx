"use strict"

// Imports.
const Cause = require("../Cause.js")
const Form = require("antd/lib/form"); const { Item } = Form
const Lens = require("../lens.js")
const Option = require("../Option/index.js")
const React = require("react")

// App :: State -> ReactComponent
module.exports = props => {
  const state = props.state

  return (
    <Form>
      <Item>
        <Option onChanged={ Cause.handle(Lens.ofProp("optionA")) } state={ state.optionA } />
      </Item>
      <Item>
        <Option onChanged={ Cause.handle(Lens.ofProp("optionB")) } state={ state.optionB } />
      </Item>
      <Item>
        <span>Selected: { state.selected(state) }</span>
      </Item>
    </Form>
  )
}
