var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var port = 80;

app.use(express.static(__dirname + '/public'));

var sendmailTransport = require('nodemailer-sendmail-transport');

var transport = nodemailer.createTransport(sendmailTransport({
	args: ["-t", "-f", "noreply@lamochalova.ru"]
}));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/mail',urlencodedParser, function(req, res) {
    console.log(req.body.name, req.body.email, req.body.message);

    transport.sendMail({
            sender: req.body.email,
            to: 'lamochalova@yandex.ru',
            subject:'Письмо с сайта от ' + req.body.name + " " + req.body.email,
            from: "noreply@lamochalova.ru",
            body: req.body.message,
            html: req.body.message
        },
        function(error, success){
            console.log(error);
            console.log(success);
            console.log('Message ' + success ? 'sent' : 'failed');
        });
        res.json({ status: "ok" });
});

app.get('*', function(req, res){
    res.sendStatus(404);
});

app.listen(port, 'lamochalova.ru');
console.log("Server listening on port " + port);