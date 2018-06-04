const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const _ = require('lodash');

exports = Object.assign(exports, {getActual});

const vocableUrl = 'http://www.vokabel-des-tages.de/vokabel-des-tages-auf-englisch';

https://www.openligadb.de/api/getmatchdata/wmrussland
Ligaid =  4220
LigaShortcut = wmrussland


function findVocableText(page) {
  const text = page.querySelector('div #gelbbox').innerHTML;
  const lines = text.split('<br>')
    .filter(value => value !== '&nbsp;')
    .map(value => value.replace(/[\n]/g, '').replace(/<i>/g,'').replace(/<\/i>/g, ''));
  // console.log(JSON.stringify(lines));
  return lines.splice(2);
}

function getActual() {
    return JSDOM.fromURL(vocableUrl)
        .then(dom => {
            const document = dom.window.document;
            const vocableText = findVocableText(document).reduce((result, value) => {
              result.$last = result.$last ? (result[result.$last] = value, undefined) : value;
              return result;
            }, {});
            delete vocableText.$last;
            return new Map(Object.entries(vocableText));
        })
        .catch(error => {
            console.log('Error occured:', error);
        });
}
