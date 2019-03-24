const bonjour = require('bonjour')();
const express = require('express');
const http = require('http');

const app = express();

// app.use(express.static(__dirname + '/public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

const server = http.createServer(app);

server.listen(1338, () => {
	console.log('Client-UI online on port: ' + 1338);
});

// Service found
// FQDN: imageService._http._tcp.local
// Hostname/IP: 192.168.0.193
// bonjour.find({
// 	type: 'http'
// }, (service) => {
// 	console.log('Service found');
// 	console.log('FQDN: ' + service.fqdn);
// 	console.log('Hostname/IP: ' + service.host);	
// });

// Service list
// [ 
//	{ addresses:
//      [ '192.168.0.193',
//        '2a02:8070:4c8:f000:e045:4fab:c5af:427c',
//        'fe80::962:3321:66b8:2fdf' ],
//     name: 'imageService',
//     fqdn: 'imageService._http._tcp.local',
//     host: '192.168.0.193',
//     referer:
//      { address: '192.168.0.193',
//        family: 'IPv4',
//        port: 5353,
//        size: 286 },
//     port: 1337,
//     type: 'http',
//     protocol: 'tcp',
//     subtypes: [],
//     rawTxt: <Buffer 00>,
//     txt: {} } 
// ]
const serviceBrowser = bonjour.find({ type: 'http' }, () => {
	console.log('Service list');
	console.log(serviceBrowser.services);
});

app.get('/', (req, res) => {
	// res.sendfile(__dirname + '/public/index.html');
	res.send(`
		<h1>Hi Client yooo</h1>
		<form id="imageForm" method="POST" enctype="multipart/form-data" action="http://${serviceBrowser.services[0].host}:${serviceBrowser.services[0].port}/imageUpload/upload">
		<input type="file" name="image" />
		<input type="submit" />
		</form>`
	);
});