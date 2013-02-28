var emit = chocolat.sendMessage
  , on   = chocolat.onMessage

var dom = {}

$(window).ready(function(){
  var searchBox = dom.searchBox = $("input[type='search']")

  searchBox.focus()

  searchBox.keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which)

    if (keycode === 13) { // enter
      emit("search", [searchBox.val()])
    }
  })

  $("body").on("click", "a.match", function(event){
    var el = $(event.target)
      , line = el.data("line").toString()
      , col = el.data("col").toString()
      , file = el.closest(".search-result").find("pre.file").html()

    emit("searchClick", [file, line, col])
  })
})

function searchResults(results){
  if (dom.listView) dom.listView.remove()

  var listView = dom.listView = new infinity.ListView($("#results"))
    , searchTerm = dom.searchBox.val()
    , wrappedTerm = "<span class='hl'>" + searchTerm + "</span>"
    , re = new RegExp(searchTerm, "gi")

  results.forEach(function(result, i){
    var oddOrEven = i % 2 == 0 ? "even" : "odd"
      , lines = _.compact(result.split("\n"))
      , listItems = ""

    lines.forEach(function(line, j){
      line = line.replace(/</gi, "&lt;")
                 .replace(/>/gi, "&gt;")
                 .replace(re, wrappedTerm)
                 .substr(0, 100)

      if (j == 0) {
        listItems += "<pre class='file'>" + line + "</pre>"
      } else {
        var matchedLine = line.match(/^(\d+);(\d+).+\d+:(.+)$/)
          , lineNumber = matchedLine[1]
          , columnNumber = matchedLine[2]
          , foundMatch = matchedLine[3].trim()

        listItems += "<pre>" +
                       "<a class='match' href='javascript:;' data-line='" +
                         lineNumber +
                         "' data-col='" +
                         columnNumber +
                         "'>" + lineNumber + ":" + columnNumber + "</a>" +
                       foundMatch +
                     "</pre>"
      }
    })

    listView.append(
      "<div class='search-result " + oddOrEven + "'>" + listItems + "</div>")
  })
}