/**
  * Module dependencies.
  */

require("./extensions")

var command = require("./command")
  , git = require("./git")
  , scripts = require("./scripts")
  , _ = require("underscore")._

/**
  * Chocolat mixin.
  */

var mixin = module.exports = {}

/**
  * Events.
  */

var events = {}

events.search = function(val){
  git.baseDir(function(err, gitBaseDir){
    listFiles(gitBaseDir)
  })

  function listFiles(gitBaseDir){
    var cmd = [
      "cd " + gitBaseDir,
      "/usr/local/bin/ag --literal --ignore-case --ackmate " + val
    ]
    command.run(cmd, function(err, searchResults){
      Recipe.run(function(recipe) {
        recipe.selection = new Range(0, 0)
        scripts.clickMenuItem(["View", "Line Numbers"])
      })
    })
  }
}

/**
  * Private functions.
  */

var createWindow = function(){
  if (mixin.win && mixin.win.isVisible()) return

  var win = mixin.win = new Window()
  win.htmlPath = "public/silver_searcher.html"
  win.buttons = ["OK"]
  win.useDefaultCSS = false
  win.onButtonClick = function(){ win.close() }
  win.run()

  win.onMessage = function(name, args){
    events[name].apply(this, args)
  }
}

/**
  * Exported functions.
  */

mixin.openWindow = function(){
  createWindow()
}
