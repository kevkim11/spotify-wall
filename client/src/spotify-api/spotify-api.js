var SpotifyWebApi = require('spotify-web-api-node');

let accessToken = "BQCuBr7zKIuUX-ZekY0LSl0Kv7A7tpeYzUzeT9FZ7nvCBy5RIHCZ9dA6zmPiHe0LTwuS9odJQQsiXj0fPmzCRtI1WXsF3eyG5YwrTwKIG3FPHRe7VTMdavZ3L47wRZAsySXeopGcq2FQwpNMG-eqYAI7C51roRyewqyToMdTUnGn6AAUNVpJ0Lk";

var credentials = {
  clientId : 'e55391b719e94dc78334fcdb648cdec6',
  clientSecret : 'a9349597d37b4e3382662df64cffb3d9',
  redirectUri : 'http://localhost:3000/'
};

let spotifyApi = new SpotifyWebApi(credentials);
spotifyApi.setAccessToken(accessToken);
// console.log(spotifyApi);

var scopes = ['user-read-private', 'user-read-email', 'user-library-read', 'user-top-read', 'user-read-recently-played'],
  state = 'some-state-of-my-choice';
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
// console.log(authorizeURL);

/*********************************/

class SpotifyService {
  constructor(){
    let credentials = {
      clientId : 'e55391b719e94dc78334fcdb648cdec6',
      clientSecret : 'a9349597d37b4e3382662df64cffb3d9',
      redirectUri : 'http://localhost:3000/'
    };
    let scopes = ['user-read-private', 'user-read-email', 'user-library-read', 'user-top-read', 'user-read-recently-played'];
    this.accessToken = "";
    this.refreshToek = "";
  }

  getSpotifyRecentlyPlayed(){

  }
}

export default accessToken;