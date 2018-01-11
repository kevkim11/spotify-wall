const express = require('express');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');

var SpotifyWebApi = require('spotify-web-api-node');


let scopes = ['user-read-private', 'user-read-email', 'user-library-read', 'user-top-read', 'user-read-recently-played'],
  state = 'some-state-of-my-choice';
const app = express();
const dev = app.get('env') !== 'production'; // so test or development environment


// change the redirectURL depending on production or development environment
let redirectURL;
let redirectCallbackURL;
// Production setting
if(!dev) {
  redirectURL = 'https://spotify-wall.herokuapp.com/callback/';
  redirectCallbackURL = path.join(__dirname, '/react-ui/build/index.html');
  app.disable('x-powered-by');
  app.use(compression());
  app.use(morgan('common'));
  // The production static files will be in the build directory of the react app
  // app.use(express.static(path.resolve(__dirname, 'build')));
  app.use(express.static(path.join(__dirname, 'react-ui/build/static')));
  // on every request that comes in.
  app.get('*', (req, res) =>{
    // res.sendFile(path.join(__dirname, '/react-ui/build/index.html'))
    res.sendFile(redirectCallbackURL)
  })
}

// Development settings
if(dev){
  redirectURL = 'http://localhost:8888/callback/';
  redirectCallbackURL = 'http://localhost:3000/';
  app.use(morgan('dev'))
}

let credentials = {
  clientId : 'e55391b719e94dc78334fcdb648cdec6',
  clientSecret : 'a9349597d37b4e3382662df64cffb3d9',
  // redirectUri : 'http://localhost:8888/callback/',
  redirectUri: redirectURL
};

let spotifyCredentials = {
  client_id: 'e55391b719e94dc78334fcdb648cdec6',
  client_secret: 'a9349597d37b4e3382662df64cffb3d9',
  refresh_token: 'AQDmuDH363SKiUU4SOQqYe4G2rrMiVMq8MP7f_OSGO2fmBSZjlkqwjiOsHOZ1HLM8RFoqCoZGdAiJLv3H-wNR-PX832uAAVJ0iu3diEgA9dd5z6MD0vR93Kjagwdovn3PDg'
};

const port = process.env.PORT || 8888;

// Serve static files from the React app

var spotifyApi = new SpotifyWebApi(credentials);
var tokenExpirationEpoch;

app.get('/', (req, res) => {
  // When our access token will expire
  let authorizeURL = spotifyApi.createAuthorizeURL(scopes, state, false);
  console.log(authorizeURL);
  res.redirect(authorizeURL);
});

// 1) Need to first GET an access and refresh token. Then can use the refresh token to obtain new access token when
//    the access token expires (which is 3600 sec or one hour)
app.get('/callback', function(req, res) {
  console.log("!!!!!!!!!!!!!");
  console.log(req);
  let code = req.query.code || null;
  // var state = req.query.state || null;
  spotifyApi.authorizationCodeGrant(code)
    .then(function(data) {
      // Set the access token and refresh token
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);
      // Save the amount of seconds until the access token expired
      tokenExpirationEpoch = (new Date().getTime() / 1000) + data.body['expires_in'];
      // Send data to the react-ui.
      // res.json(data);
      console.log('Retrieved token. It expires in ' + Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) + ' seconds!');
    }, function(err) {
      console.log('Something went wrong when retrieving the access token!', err.message);
    })
    .then(function(){
      console.log("2nd then!!!!!");
      res.redirect(redirectCallbackURL);
    });
});

// 2) url to get the AccessToken from the server.
app.get('/api/spotify', (req, res) => {
  spotifyApi.setRefreshToken(spotifyCredentials.refresh_token);
  spotifyApi.refreshAccessToken()
    .then(function(data){
      spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
      console.log('Could not refresh access token', err);
    }).then(function(){
    let accessToken = spotifyApi.getAccessToken();
    console.log(`CURRENT ACCESSTOKEN: ${accessToken}`);
    let refreshToken = spotifyApi.getRefreshToken();
    console.log(`CURRENT REFRESHTOKEN: ${refreshToken}`);
      res.json([{accessToken}]);
  });
});

// 3) setInterval function to get a new access token using the refresh token when access token expires.
//    https://developer.spotify.com/web-api/authorization-guide/
let timePassed = 0;
// setInterval(function(){
//   console.log('Time left: ' + Math.floor((tokenExpirationEpoch - new Date().getTime() / 1000)) + ' seconds left!');
//   // console.log(`timePassed = ${timePassed}`);
//   // console.log(`tokenExpirationEpoch = ${tokenExpirationEpoch}`);
//   // if(timePassed > 10) {
//   if(Math.floor((tokenExpirationEpoch - new Date().getTime() / 1000)) <= 0){
//     timePassed = 0;
//     console.log(`access token: ${spotifyApi.getAccessToken()}`);
//     console.log(`refresh token: ${spotifyApi.getRefreshToken()}`);
//     spotifyApi.refreshAccessToken()
//       .then(function(data) {
//         console.log('The access token has been refreshed!');
//         // Save the access token so that it's used in future calls
//         spotifyApi.setAccessToken(data.body['access_token']);
//         // Re-save the amount of seconds until the access token expired
//         tokenExpirationEpoch = (new Date().getTime() / 1000) + data.body['expires_in'];
//         // Re-set the timePassed variable
//         timePassed = 0;
//       }, function(err) {
//         console.log('Could not refresh access token', err);
//       });
//   }
//   timePassed += 1;
// }, 1000);

app.use(express.static(path.join(__dirname, '/react-ui/build')));
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.

app.use('/dist', express.static(path.join(__dirname, 'dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/react-ui/build/index.html'));
// });

app.listen(port);

console.log(`spotify-wall-server listening on ${port}`);