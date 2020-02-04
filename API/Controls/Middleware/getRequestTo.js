//Auxiliary function to automatically request and parse data
exports.getRequestTo = async function(url){
  return new Promise((resolve, reject) => {
    var request = require('request');

    request(url, function (error, response, body){
        if(!error && response.statusCode == 200){
          resolve(body);
        }
        else{
          reject('Error in request')
        }
    })
  })
}
