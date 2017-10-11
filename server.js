const express = require('express');
const path = require('path');
var SpotifyWebApi = require('spotify-web-api-node');


var credentials = {
  clientId : 'e55391b719e94dc78334fcdb648cdec6',
  clientSecret : 'a9349597d37b4e3382662df64cffb3d9',
  redirectUri : 'http://localhost:8888/callback/',
};
let scopes = ['user-read-private', 'user-read-email', 'user-library-read', 'user-top-read', 'user-read-recently-played'],
  state = 'some-state-of-my-choice';
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
// app.get('/api/tokens', (req, res) => {
//   const count = 5;
//
//   // Generate some passwords
//   const passwords = Array.from(Array(count).keys()).map(i =>
//     generatePassword(12, false)
//   )
//
//   // Return them as json
//   res.json(passwords);
//
//   console.log(`Sent ${count} passwords`);
// });


var spotifyApi = new SpotifyWebApi(credentials);
var tokenExpirationEpoch;
app.get('/', (req, res) => {
  // When our access token will expire
  let authorizeURL = spotifyApi.createAuthorizeURL(scopes, state, false);
  console.log(authorizeURL);
  res.redirect(authorizeURL);
});

app.get('/callback', function(req, res) {
  console.log("!!!!!!!!!!!!!");
  console.log(req);
  var code = req.query.code || null;
  var state = req.query.state || null;

  // var code = 'AQCkP3fMYAs-95ObJFoFh5hh2Eg0bmhvLnLFRzrXcqXX7m7xjcYsyJNcarf7AG8vxrFLhO2kXmT-6s-yRq1UNsekRRCPBMRYrQd3SrJC00z9ewglfShGgrfHZSRvBhY5P_tRAjep0LA8nQ_UP4a4VpJGdrvsUxTZHwwqpBnM_ZAY1lYOBzeaznNPx0qMh8uMZN-5AVkJgTXpuZVQAcEeNmcsx7yOQKO5N_V-PodXL1nZY3ez2KCT_xGgootymD2ol4uNsxo_mrpEFvr5oUaBgLFpgIXI2fY7DccZxCfskUo4xWrqziJ-_jmthDViNGwbHkwxq9kB'
  console.log("@@@@@@@@@@@@@");
  console.log(code);
  spotifyApi.authorizationCodeGrant(code)
    .then(function(data) {

      // Set the access token and refresh token
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);

      res.json(data);

      // Save the amount of seconds until the access token expired
      tokenExpirationEpoch = (new Date().getTime() / 1000) + data.body['expires_in'];
      console.log('Retrieved token. It expires in ' + Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) + ' seconds!');
    }, function(err) {
      console.log('Something went wrong when retrieving the access token!', err.message);
    });
});


var timePassed = 0;
setInterval(function(){
  console.log('Time left: ' + Math.floor((tokenExpirationEpoch - new Date().getTime() / 1000)) + ' seconds left!');
  if(timePassed > 60) {
    timePassed = 0;
    console.log(`access token: ${spotifyApi.getAccessToken()}`);
    console.log(`refresh token: ${spotifyApi.getRefreshToken()}`);
    spotifyApi.refreshAccessToken()
      .then(function(data) {
        console.log('The access token has been refreshed!');

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
      }, function(err) {
        console.log('Could not refresh access token', err);
      });
  }
  timePassed += 1;
}, 1000);

app.get('/api/spotify', (req, res) => {
  let accessToken = spotifyApi.getAccessToken();
  console.log(`CURRENT ACCESSTOKEN: ${accessToken}`);
  res.json([{accessToken}]);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 8888;
app.listen(port);

console.log(`spotify-wall-server listening on ${port}`);