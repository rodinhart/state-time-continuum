"use strict"

const assert = require("assert")
const Cause = require("../src/Cause.js")
const IO = require("data-control").IO

describe("Cause", function() {
  describe("#listen", function() {
    it("should listen to actions", function() {
      var action

      const io = IO(() => Cause.dispatch("test"))
      Cause.listen(io).fork(err => assert.fail(err, err), cause => action = cause.action)

      assert.strictEqual(action, "test")
    })

    it("should throw an error on double dispatch", function() {
      const io = IO(() => {
        Cause.dispatch("test1")
        Cause.dispatch("test2")
      })

      assert.throws(function() {
        Cause.listen(io).fork(err => assert.fail(err, err), cause => {})
      }, /Dispatch no longer set/)
    })

    it("should throw an error on double listen", function() {
      Cause.listen().fork(err => assert.fail(err, err), cause => {})

      assert.throws(function() {
        Cause.listen().fork(err => assert.fail(err, err), cause => {})
      }, /Dispatch already set/)
    })
  })
})
