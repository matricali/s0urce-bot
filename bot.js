var bot
var diccionario = null
var hackLoop = null
var mensaje = 'puto el que lee! 👽'
var frecuencia = 1000
var esperar = 5000
var db = 'https://raw.githubusercontent.com/jorge-matricali/s0urce-bot/master/data/words.json'

// Sacar anuncios
$('#window-msg2').remove()
$('#desktop-wrapper').css('top', '0')

bot = {
  start: function () {
    $.getJSON(db, function (data) {
      diccionario = data
      bot.automate()
    })
  },
  automate: function () {
    // first check the windows are open, and open them if they aren't
    if ($('#player-list').is(':visible') === false) {
      log_warn('Target list must be open')
      $('#desktop-list').children('img').click()
    }
    // Random target
    var targets = $('#player-list').children('tr')
    var target = targets.eq(Math.floor(Math.random() * targets.length))[0]
    log('New target ' + target.innerText)
    // Click it, and then hack, and then port B
    target.click()
    $('#window-other-button').click()
    // Check for money
    if ($('#window-other-port1').attr('style').indexOf('opacity: 1') === -1) {
      // this port costs too much, let's wait a bit
      log_warn('Hack too expensive, waiting...')
      setTimeout(bot.automate, esperar)
      return
    }
    $('#window-other-port1').click()
    hackLoop = setInterval(bot.hackLoop, frecuencia)
  },
  hackLoop: function () {
    if ($('#targetmessage-input').is(':visible') === true) {
      // :D
      $('#targetmessage-input').val(mensaje)
      $('#targetmessage-button-send').click()
      bot.restart()
      return
    }
    bot.go()
  },
  restart: function () {
    bot.stop()
    bot.automate()
  },
  stop: function () {
    if (hackLoop === null && defLoop === null) {
      log_error('No loops to stop')
      return
    }
    clearInterval(hackLoop)
    hackLoop = null
    log('Stopped loops')
  },
  go: function () {
    var link = $('.tool-type-img').prop('src')
    if (link !== 'http://s0urce.io/client/img/words/template.png') {
      if (link !== 'http://www.s0urce.io/client/img/words/template.png') {
        if (diccionario.hasOwnProperty(link) === true) {
          var word = diccionario[link]
          log('Found word: [' + word + ']')
          bot.submit(word)
          return
        }
        log('Found word: [' + link + ']')
        log_error('Not seen in the word list')
      } else {
        log_error('Can\'t find the word link...')
        bot.restart()
      }
    } else {
      log_error('Can\'t find the word link...')
      bot.restart()
    }
  },
  submit: function (word) {
    $('#tool-type-word').val(word)
    $('#tool-type-word').submit()
  }
}
function log (message, style) {
  if (style === null) {
    style = 'background: #ffffff; color: #666'
  }
  console.log('%c[!]%c ' + message, 'background: #222; color: #bada55', style)
}
function log_warn (message) {
  log(message, 'background: #ffffff; color: #ffcc00')
}
function log_error (message) {
  log(message, 'background: #ffffff; color: #ff0000')
}
