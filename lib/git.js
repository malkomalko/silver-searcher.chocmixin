/**
  * Module dependencies.
  */

var command = require("./command")

/**
  * Git helpers.
  */

var git = module.exports = {}

git.baseDir = function(callback){
  var cmd = [
    "cd " + Document.current().pathNoExt(),
    "git rev-parse --show-toplevel"
  ]
  command.run(cmd, callback)
}
