"use strict"

// data Task e a = Task (e -> ()) (a -> ())
const Task = module.exports = fork => ({
  bind: f => Task((rej, res) => fork(rej, x => f(x).fork(rej, res))),
  fork: fork,
  map: f => Task((rej, res) => fork(rej, x => res(f(x))))
})
