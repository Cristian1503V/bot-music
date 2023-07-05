"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
var spotify_web_api_node_1 = require("spotify-web-api-node");
// Configura las credenciales de tu aplicación
var spotifyApi = new spotify_web_api_node_1.SpotifyWebApi({
    clientId: '[YOU CLIENT ID SPOTIFY ]',
    clientSecret: '[YOU CLIENTSECRET ID SPOTIFY]',
    redirectUri: 'http://localhost:5173'
});
// Obtén un token de acceso utilizando el flujo de autorización de "Autorización de cliente de credenciales"
spotifyApi.clientCredentialsGrant().then(function (data) {
    var accessToken = data.body.access_token;
    // Establece el token de acceso en la instancia del cliente de la API de Spotify
    spotifyApi.setAccessToken(accessToken);
    // Busca una canción
    spotifyApi.searchTracks('Play canción').then(function (data) {
        var trackUri = data.body.tracks.items[0].uri;
        // Reproduce la canción en el dispositivo activo
        spotifyApi.play({
            uris: [trackUri]
        }).then(function () {
            console.log('Canción reproducida exitosamente.');
        }).catch(function (error) {
            console.log('Error al reproducir la canción:', error);
        });
    }).catch(function (error) {
        console.log('Error al buscar la canción:', error);
    });
}).catch(function (error) {
    console.log('Error al obtener el token de acceso:', error);
});
