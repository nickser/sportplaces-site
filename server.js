var http = require('http');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000; //change 3000 on other port if needed

app
    .use(express.static('dist')) // change 'dist' on name of the app folder
    .all('/*', function ( req, res ) {
      res
          .status( 200 )
          .set( { 'content-type': 'text/html; charset=utf-8' } )
          // .sendfile('dist/index.html' ); 
          .sendFile('/var/www/sportplaces-site/dist/index.html' );// change 'dist' on name of the app folder
    })
    .on( 'error', function( error ){
      console.log( "Error: \n" + error.message );
      console.log( error.stack );
    });

http
    .createServer( app ).listen( PORT )
    .on( 'error', function( error ){
      console.log( "Error: \n" + error.message );
      console.log( error.stack );
    });