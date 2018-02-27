//modules to run the node server

var formidable = require('formidable');
var fs = require('fs');

var express = require('express')
var app = express()
var fileUpload = require('express-fileupload');


app.use(fileUpload());
app.use(express.static('www'));


app.get('/logs', function(req, res) {
	console.log();
	console.log('ajax is connecting');
	var fn = fs.readdirSync('node_storage');
	
	res.send(fn);
	res.end();
});


app.post('/', function(req, res) {
	console.log();
	console.log('ajax posting');
	console.log('file path: ' + req.path);
	console.log(req.files);
	if(req.files){
		console.log('number of files: '+req.files.ftu.length);
		
		if(req.files.ftu.length > 1){
			req.files.ftu.forEach(function(i){
				var file = i, 
				fn = file.name;
				file.mv("./node_storage/" + fn);
			});
		res.end();
		}
		else{
			var file = req.files.ftu,
			fn = file.name;
			file.mv("./node_storage/" + fn);
		}
		res.end();
	}
});


app.post('/delete', function(req, res){
	console.log();
	console.log('Got delete req');
	console.log('Deleting: ' + req)
	
	res.end();
});


var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Express app listening at http://%s:%s', host, port)

});





/*
	old test to upload files

// http creates a server listening on port 8080 (on localhost)
http.createServer(function (req, res) {

		if (req.url == '/fileupload') {
		// we get the form data
		var form = new formidable.IncomingForm();
		//Parses an incoming node.js request containing form data
		form.parse(req, function (err, fields, files) {
			console.log("Got a new file");	
			var oldpath = files.filetoupload.path;
			var newpath = 'C:/Users/Jerry/Documents/js_games/node_server/node_storage/' + files.filetoupload.name;
		// this rewrites the file to the new path. This is in the node storage folder on the server
			fs.rename(oldpath, newpath, function (err) {
				if (err) throw err;
				res.write('File uploaded and moved!');
				res.end();
				});
			}
		)
	}
}
).listen(8080, "172.17.111.153", function(){
	console.log("listening on port" + 8080 )
	});
	
	
	
	
	
	var file = req.files.ftu[i], 
			fn = file.name;
			file.mv("./node_storage/" + fn);
	
	
	fs.readdirSync('node_storage', function(err, files) {
		files.forEach(file) {
			var index=0;
			fn.push(file);
			index++;
			console.log(file);
		});
	
*/
	
	
	
	
	