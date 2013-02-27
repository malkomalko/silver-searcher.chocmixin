/**
  * Module dependencies.
  */

var _ = require("underscore")._

/**
  * Chocolat mixin.
  */

var mixin  = module.exports = {}

/**
  * Events.
  */

var events = {}

events.search = function(val){
  Alert.show("search", val)
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
