/**
  * Module dependencies.
  */

var command = require("./command")

/**
  * Git helpers.
  */

var git = module.exports = {}

git.baseDir = function(callback){
  var doc = Document.current()
  if (doc == null) return callback(new Error("No document opened"))

  var cmd = [
    "cd " + doc.pathNoExt(),
    "git rev-parse --show-toplevel"
  ]
  command.run(cmd, function(err, gitBaseDir){
    gitBaseDir = gitBaseDir || ""
    callback(err, gitBaseDir.removeLinebreaks())
  })
}
