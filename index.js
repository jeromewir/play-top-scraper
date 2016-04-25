const gplay = require('google-play-scraper');

const apps = [];
const _ = require('lodash');
const fs = require('fs');

//name, nb download, note, mail adress dev

gplay.list({
  collection: gplay.collection.GROSSING,
  fullDetail: true,
  num: 120,
  lang: 'fr',
}).then(candidateApps => {
  const stream = fs.createWriteStream('GROSSING.csv');
  stream.write('title;downloads;note;mail;url;price\n');
  _.forEach(candidateApps, app => {
    const obj = {
      title: app.title,
      downloads: `${app.minInstalls} - ${app.maxInstalls}`,
      note: app.score,
      mail: app.developerEmail,
      url: app.url,
      price: app.price,
    };
    var s = '';
    _.keys(obj).forEach(key => {
      if (s != '') s += ';';
      s += obj[key];
    });
    stream.write(s + '\n');
  });
}).catch(err => {
  console.error(err.stack);
});