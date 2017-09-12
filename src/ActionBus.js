const Task = require("data-control").Task

module.exports = () => {
  let _

  return {
    // dispatch :: Action -> ()
    dispatch: action => {
      if (!_)
        throw new Error(
          "Dispatch no longer set, nobody is listening, action lost: " +
            action.type
        )
      _(action)
    },

    // listen :: Effect Action a -> Task () Action
    listen: effect =>
      Task((rej, res) => {
        if (_) throw new Error("Dispatch already set, someone is listening...")
        _ = action => {
          _ = undefined
          res(action)
        }

        if (effect.reaction) effect.reaction.run(effect.state)
      })
  }
}
