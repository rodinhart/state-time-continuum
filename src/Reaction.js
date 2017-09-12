const Effect = require("./Effect.js")
const lang = require("./lang.js")
const Task = require("data-control").Task

// data Reaction e a = Reaction (e -> ())
const Reaction = run => ({
  run: run,

  // bind :: (a -> Reaction e b) -> Reaction e a -> Reaction e b
  bind: f => Reaction(e => f(run(e)).run(e))
})

// app :: Reaction s a -> ActionBus -> (a -> s -> Effect s a) -> Effect s a -> Task String (Effect s a)
const app = render => bus => reduce => effect => {
  // loop :: Effect s a -> Task () (Effect s a)
  const loop = effect =>
    bus
      .listen(effect)
      .map(action => {
        const effect2 = reduce(action)(effect.state)
        const reaction2 = effect2.reaction
          ? render.bind(() => effect2.reaction)
          : render

        return Effect(effect2.state, reaction2)
      })
      .bind(loop)

  return loop(Effect(effect.state, effect.reaction || render))
}

// of :: a -> Reaction e a
const of = _ => Reaction(e => {})

module.exports = lang.mixin({
  app: app,
  of: of
})(Reaction)
