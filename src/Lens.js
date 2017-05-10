// data Lens s t a b = Functor f => Lens (a -> f b) -> s -> f t

"use strict"

const Identity = require("./Identity.js")
const lang = require("./lang.js")

// ofProp :: String -> Lens (Object String a) (Object String b) a b
const ofProp = key => f => obj =>
  f(obj ? obj[key] : undefined).map(x => {
    var k, r

    r = {}
    for (k in obj) {
      if (k !== key) {
        r[k] = obj[k]
      } else if (x !== undefined) {
        r[k] = x
      }
    }

    return r
  })

// over :: Lens s t a b -> (a -> b) -> s -> t
const over = lens => f => s => lens(lang.compose(Identity)(f))(s).x

// Exports.
module.exports = {
  ofProp: ofProp,
  over: over
}
