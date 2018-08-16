const assert = require("assert")
const Effect = require("../src/Effect.js")
const Reaction = require("../src/Reaction.js")

describe("Effect", function() {
  describe("#combine", function() {
    it("should combine in order", function() {
      const r = []

      const effect = Effect.combine([
        s => Effect(s.concat([1]), Reaction(() => r.push("a"))),
        s => Effect(s.concat([2]), Reaction(() => r.push("b")))
      ])([])

      assert.deepStrictEqual(effect.state, [1, 2])
      assert.deepStrictEqual(r, [])

      effect.reaction.run()
      assert.deepStrictEqual(r, ["a", "b"])
    })
  })
})
