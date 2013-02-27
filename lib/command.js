/**
  * Module dependencies.
  */

var exec = require("child_process").exec

/**
  * Command helpers.
  */

var command = module.exports = {}

command.run = function(cmds, callback){
  var cmd = cmds.join(" && ")

  exec(cmd, function(err, stdout, stderr){
    callback(stderr, stdout)
  })
}
