$(window).ready(function(){
  var searchBox = $("input[type='search']")

  searchBox.focus()

  searchBox.keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which)

    if (keycode === 13) { // enter
      chocolat.sendMessage("search", [searchBox.val()])
    }
  })
})
