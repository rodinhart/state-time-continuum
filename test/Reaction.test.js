const assert = require("assert")
const Reaction = require("../src/Reaction.js")

describe("Reaction", function() {
  describe("#of", function() {
    it("should act as the unit of Monad", function() {
      let r

      const m = Reaction(e => (r = e))
      m.run(32)

      assert.strictEqual(r, 32)
    })
  })

  describe("#bind", function() {
    it("should continue the calculation", function() {
      let r = []

      const m = Reaction(e => r.push(e)).bind(() =>
        Reaction(e => r.push(e * e))
      )

      m.run(3)

      assert.deepStrictEqual(r, [3, 9])
    })
  })
})
