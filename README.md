# s0urce.io BOT

### How to use
* Go to http://source.io, pick a name and start the game.
* In your browser, open the developer console (typically: View -> Developer -> JavaScript Console)
* Paste the content of [bot.js](bot.js).
* Type `bot.start()` to start the bot
* Type `bot.stop()` if you need to stop it.


### Minified version
    var bot,dc=null,hl=null,mensaje="puto el que lee! 👽",frecuencia=1e3,esperar=5e3,db="https://raw.githubusercontent.com/jorge-matricali/s0urce-bot/master/data/words.json";function log(o,t){null===t&&(t="background: #ffffff; color: #666"),console.log("%c[!]%c "+o,"background: #222; color: #bada55",t)}function lw(o){log(o,"background: #ffffff; color: #ffcc00")}function le(o){log(o,"background: #ffffff; color: #ff0000")}$("#window-msg2").remove(),$("#desktop-wrapper").css("top","0"),bot={start:function(){$.getJSON(db,function(o){dc=o,bot.automate()})},automate:function(){!1===$("#player-list").is(":visible")&&(lw("Target list must be open"),$("#desktop-list").children("img").click());var o=$("#player-list").children("tr"),t=o.eq(Math.floor(Math.random()*o.length))[0];if(log("New target "+t.innerText),t.click(),$("#window-other-button").click(),-1===$("#window-other-port1").attr("style").indexOf("opacity: 1"))return lw("Hack too expensive, waiting..."),void setTimeout(bot.automate,esperar);$("#window-other-port1").click(),hl=setInterval(bot.hl,frecuencia)},hl:function(){if(!0===$("#targetmessage-input").is(":visible"))return $("#targetmessage-input").val(mensaje),$("#targetmessage-button-send").click(),void bot.restart();bot.go()},restart:function(){bot.stop(),bot.automate()},stop:function(){null!==hl||null!==defLoop?(clearInterval(hl),hl=null,log("Stopped loops")):le("No loops to stop")},go:function(){var o=$(".tool-type-img").prop("src");if("http://s0urce.io/client/img/words/template.png"!==o)if("http://www.s0urce.io/client/img/words/template.png"!==o){if(!0===dc.hasOwnProperty(o)){var t=dc[o];return log("Found word: ["+t+"]"),void bot.submit(t)}log("Found word: ["+o+"]"),le("Not seen in the word list")}else le("Can't find the word link..."),bot.restart();else le("Can't find the word link..."),bot.restart()},submit:function(o){$("#tool-type-word").val(o),$("#tool-type-word").submit()}};
