/**
  * Module dependencies.
  */

var git = require("./git")
  , applescript = require("applescript")
  , _ = require("underscore")._

/**
  * Applescripts.
  */

var scripts = module.exports = {}

scripts.clickMenuItem = function(menuItems){
  git.baseDir(function(err, gitBaseDir){
    var script = gitBaseDir + "/applescripts/click_menu_item.applescript"
    applescript.execFile(script, menuItems, function(err, rtn){})
  })
}
