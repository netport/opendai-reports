var express = require('express');
var pg = require('pg');
var app = express();
var port = 8001;

var cache = false;

//Config
app.use(express.bodyParser());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.configure(function(){
  /*app.use(function(req, res) {
    var newUrl = req.protocol + '://' + req.get('Host') + '' + req.url;
    return res.redirect(newUrl);
  });
    app.use(function(req, res){
      console.log(req.url);
      express.static(__dirname + req.url);
    });
*/
    app.use('/', express.static(__dirname + '/'));
    app.use('/reports', express.static(__dirname + '/'));
    //app.use('/report/*', express.static(__dirname + '/'));
    app.use('/app/', express.static(__dirname + '/app/'));
    app.use('/app/styles', express.static(__dirname + '/app/styles'));
    app.use('/app/img', express.static(__dirname + '/app/img'));
    //app.use('/fonts', express.static(__dirname + '/public/fonts'));
});

/**
 * Variables
 * Connection string: This is going to change. Dont forget to update ip when upload.
 */
var dbConn = "pg://user:user@194.116.110.159:35432/ReportsVDB";
var data = {
  response: 200,
  dataType: 'Application/JSON',
  license: '',
  reports: null
};

function queryDB(query, callback) {
  var data;
  pg.connect(dbConn, function(err, client, done) {
    if(err) console.log(err);

    client.query(query, function(err, result){
      if(err) console.log(err);
      if(result === undefined) {
        data = null;
      } else {
        data = result.rows;
      }
      callback(data);
    });

    done();//call done() to signal you are finished with the client
  });
}

app.get('/api/reports', function(req, res){
  queryDB('SELECT Reports.reports.id, Reports.reports.title, Reports.reports.lat, Reports.reports.lng, Reports.reports.types_id, Reports.reports.description, Reports.types.title AS type FROM Reports.reports INNER JOIN Reports.types ON Reports.reports.types_id = Reports.types.id', function(result){
    data.reports = result;
    res.send(data);
  });
});

app.get('/api/reports/:id', function(req, res){
  var id = req.params.id;
  queryDB('SELECT * FROM Reports.reports WHERE id = '+id+' LIMIT 1', function(result){
    res.send(result);
  });
});

app.post('/api/reports', function(req, res){
  var data = req.body;
  console.log(req.body.title);
  queryDB("INSERT INTO Reports.reports(title, types_id, description, lat, lng) VALUES('"+data.title+"', "+data.types_id+", '"+data.description+"', '"+data.lat+"', '"+data.lng+"')", function(result){
    res.send(200, result);
  });

});

app.put('/api/reports/:id', function(req, res){
  console.log('Saving data');
  var id = req.params.id;
  var report = req.body.report;
  console.log(res);
  queryDB("UPDATE Reports.reports SET title = '"+report.title+"', description = '"+report.description+"' WHERE id = "+id+"", function(){
    res.send(200, 'saving'+id);  
  });
});

app.listen(port);
console.log('Server running at port '+port);