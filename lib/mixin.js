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

var events = mixin.events = {}

events.search = function(val){
  git.baseDir(function(err, gitBaseDir){
    if (err) return Alert.show(err.message, "Please open up a document")

    mixin.gitBaseDir = gitBaseDir
    listFiles(gitBaseDir)
  })

  function listFiles(gitBaseDir){
    var cmd = [
      "cd " + gitBaseDir,
      "/usr/local/bin/ag --literal --ignore-case --ackmate " + val
    ]
    command.run(cmd, function(err, searchResults){
      mixin.win.applyFunction("searchResults", [formatSearch(searchResults)])
    })
  }
}

events.searchClick = function(file, line, col){
  line = parseInt(line, 10)
  col = parseInt(col, 10)

  Document.open(mixin.gitBaseDir + "/" + file, "MainWindow", function(doc){
    Recipe.run(function(recipe){
      var range = recipe.characterRangeForLineIndexes(new Range(line - 1, 0))
      recipe.selection = new Range(range.min() + col, 0)
      scripts.clickMenuItem(["Text", "Select", "Jump to Selection"])
    })
  })
}

/**
  * Private functions.
  */

var debugWindow = function(text){
  var win = new Window()
  win.html = text
  win.buttons = ["OK"]
  win.useDefaultCSS = true
  win.onButtonClick = function(){ win.close() }
  win.run()
}

var formatSearch = function(searchResults){
  return searchResults.split(/:\.\//gi).splice(1)
}

/**
  * Exported functions.
  */

mixin.createWindow = function(){
  if (mixin.win != null) {
    mixin.win.show()
    mixin.win.applyFunction("focusWindow", [])
    return
  }

  var win = mixin.win = new Window()
  win.htmlPath = "public/silver_searcher.html"
  win.buttons = ["OK"]
  win.useDefaultCSS = false
  win.onButtonClick = function(){ win.close() }
  win.run()

  win.onMessage = function(name, args){
    events[name].apply(this, args)
  }
  win.onUnload = function(){
    mixin.win = null
  }
}

mixin.openWindow = function(){
  mixin.createWindow()
}
