const lang = require("./lang.js")

// data Reaction e a = Reaction (((a -> ()), e) -> ())
const Reaction = run => ({
  run: run,

  // bind :: (a -> Reaction e b) -> Reaction e a -> Reaction e b
  bind: f => Reaction((ret, e) => run(x => f(x).run(ret, e), e))
})

// get :: Reaction e e
const get = Reaction((ret, e) => ret(e))

// of :: a -> Reaction e a
const of = x => Reaction((ret, e) => ret(x))

module.exports = lang.mixin({
  get: get,
  of: of
})(Reaction)
