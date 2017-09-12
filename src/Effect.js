"use strict"

const lang = require("./lang.js")

// data Effect s a = Effect s (Reaction s b)
const Effect = (state, reaction) => ({
  state: state,
  reaction: reaction
})

// combine :: [(State -> Effect State Action)] -> (State -> Effect State Action)
const combine = reducers => initial => {
  var i, reaction, state, t

  if (reducers.length === 0) return Effect(initial)

  t = reducers[0](initial)
  state = t.state
  reaction = t.reaction
  for (i = 1; i < reducers.length; i++) {
    t = reducers[i](state)
    state = t.state
    reaction = reaction
      ? t.reaction ? reaction.bind(() => t.reaction) : reaction
      : t.reaction
  }

  return Effect(state, reaction)
}

module.exports = lang.mixin({
  combine: combine
})(Effect)
