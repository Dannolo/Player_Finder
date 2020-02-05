// Constant methods

var YouTube = require('youtube-node');
const chooseMatch = require('./GetMatch').chooseMatch

const youtubeKEY = process.env.YOUTUBE_KEY

var youTube = new YouTube();
youTube.setKey(youtubeKEY);

////////////////////////////////////

// Auxiliary functions //

///////////////////////////////////

function validateName(name) {
  for (let index = 0; index < name.length; index++) {
    if (name[index] == "|") {
      name = name.substring(index + 1, name.length)
      return name.trim()
    }
  }
  return name
}

function divide(displayName) {
  for (let index = 0; index < displayName.length; index++) {
    let names = []
    if (displayName[index] == "-") {
      names.push(displayName.substring(0, index - 3))
      names.push(displayName.substring(index + 2, displayName.length - 2))
      return names
    }
  }
  return displayName
}

// Main function, we fetch to url for Youtube and we analyze what we get back to see if it allowed to be posted

exports.MatchSelector = async function (tourney, game, phase, displayScore) {
  
  players = divide(displayScore)
  players[0] = validateName(players[0]).toLowerCase()
  players[1] = validateName(players[1]).toLowerCase()

  let url = tourney + ' ' + phase + ' ' + players[0] + ' ' + players[1] + ' ' + game
  console.log(url)

  return await new Promise((resolve, reject) => {

    youTube.search(url, 3, function (error, result) {
      if (error) {
        reject(error)
      }
      else {
        let id = chooseMatch(result.items, url)
        if (id == null) {
          reject(error)
        }
        else {
          resolve(id)
        }
      }
    })
  })

}
