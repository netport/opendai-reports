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
    app.use('/', express.static(__dirname + '/'));
    app.use('/assets/js', express.static(__dirname + '/assets/js'));
    app.use('/assets/css', express.static(__dirname + '/assets/css'));
    app.use('/img', express.static(__dirname + '/assets/img'));
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
      if(result == undefined) {
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
  var data = req.body.report;
  console.log(data);
  queryDB("INSERT INTO Reports.reports(title, types_id, description) VALUES('"+data.title+"', 2, '"+data.description+"')", function(result){
    res.send(200, result);
  });

});

app.put('/api/reports/:id', function(req, res){
  console.log('Saving data');
  var id = req.params.id;
  var report = req.body.report;
  queryDB("UPDATE Reports.reports SET title = '"+report.title+"', description = '"+report.description+"' WHERE id = "+id+"", function(){
    res.send(200, 'saving'+id);  
  });
});

app.listen(port);
console.log('Server running at port '+port);