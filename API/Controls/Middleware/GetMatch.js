// package needed

const stringSimilarity = require('string-similarity');

//Switching the video we have from the Youtube API to get the one that matches better with StringSimilarity
//We will a video that has ATLEAST stringsimilarity of 0.55
exports.chooseMatch = function (videos, match) {
  try {
    let _id = null
    let _similarity = 0
    for (let i = 0; i<3;i++) {
      let title = videos[i].snippet.title
      var similarity = stringSimilarity.compareTwoStrings(title, match)
      if(similarity > 0.55 && _similarity < similarity){
        _id = videos[i].id.videoId
        _similarity = similarity
      }
    }
    if(_id == null){
      return null
    }
    else{
      return _id
    }
  } catch (error) {
    console.error(error);
  }
}

