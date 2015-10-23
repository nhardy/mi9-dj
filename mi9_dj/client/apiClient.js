import fetch from 'isomorphic-fetch';

let ENDPOINT = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=video&key=AIzaSyDnbR2WrTk8Qf1jQMvbm9ZNEL0Qo2xqb84&q=';

function search(query) {
  return fetch(ENDPOINT + encodeURIComponent(query)).then(function(response) {
    return response.json();
  });
}

export function results(query) {
  return search(query).then(function(rawJSON) {
    const list = rawJSON.items.map(function(item) {
      return {
        code: item.id.videoId,
        title: item.snippet.title,
        image: item.snippet.thumbnails.high.url,
      }
    });
    return list;
  });
}

results('rick astley').then(function(result) {
  console.log(result);
});
