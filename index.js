var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');

url = 'https://cryptokittydex.com/cattributes';

let catData = {}

request(url, function (error, response, html) {
    if(error || response.statusCode != 200) return

    var $ = cheerio.load(html)
    $('ul.list-cattributes').find('li').each(function(i, e){

      let info = $(this).find('.cattribute-info-layer')
      if (info.html() != null) {
        var res = info.text().split("\n")

        let name = res[1].trim()
        let count = parseInt(res[2].substring(0, res[2].length - 7).trim().replace(',',''))
        let costTrim = res[5].trim()
        let cost = parseFloat(costTrim.substring(1, costTrim.length - 3).trim())

        catData[name] = {
          name, count, cost
        }
      }
      console.log(catData)
    })
})
