var http = require('http');
var express = require("express");
var log = require('./libs/log')(module);
var app     = express();
var path    = require("path");
var fs = require("fs");
var logger = require('express-logger');
var calculator = require("./schemas/PlansPricesCalculator");
var help_scripts = require('./schemas/HelpScripts');
var node_port = help_scripts.NodePort();

app.use(logger({path: "./logs/logfile.txt"}));
app.use(express.static(path.join(__dirname, "public"))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)

app.get('/api/marathon', calculator.FindAllMarathon, calculator.FindAllMarathonDetail, function (req, res)
{
    res.send("Ok");
});

app.get('/api/marathon_london', calculator.GetLondonMarathon, function (req, res)
{
    res.send("Ok");
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});


app.listen(process.env.PORT || 300,function(){
  console.log("Started on PORT 300");
})


