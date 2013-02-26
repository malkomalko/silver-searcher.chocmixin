/**
  * Module dependencies.
  */

var mixin = require("./lib/mixin")

/**
  * Mixin hooks.
  */

Hooks.addMenuItem("Go/Silver Searcher", "ctrl+g", function(){ mixin.ag() })
