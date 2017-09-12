const assert = require("assert")
const Reaction = require("../src/Reaction.js")

const run = (m, e) => {
  let r

  m.run(x => (r = x), e)

  return r
}

describe("Reaction", function() {
  describe("#of", function() {
    it("should act as the unit of Monad", function() {
      const m = Reaction.of(42)

      assert.strictEqual(run(m, 100), 42)
    })
  })

  describe("#bind", function() {
    it("should continue the calculation", function() {
      const m = Reaction.of(3).bind(x => Reaction.of(x * x))

      assert.strictEqual(run(m, 100), 9)
    })
  })

  describe("#get", function() {
    it("should get the env", function() {
      assert.strictEqual(run(Reaction.get, 100), 100)
    })
  })
})
