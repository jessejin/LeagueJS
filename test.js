var LolApi = require('./lib/lolapi'), wait=require('wait.for');
LolApi.init('73dd5ad9-b3a3-491f-ae9a-da8e6e9d1ff2', 'na');
LolApi.setRateLimit(10,500);
var startDate = new Date(2015,3,3,0);
var Mongo = require('mongodb').MongoClient;
function test(){


    
    Mongo.connect("mongodb://localhost:3001/meteor", function(err, db) {
  if(err) { return console.dir(err); }
  
  var collection = db.collection('games');
  collection.remove();
  var startDate = new Date(2015,3,1,0);
  
  var getNextGameSet = true;
  while(true){
      var gameIds = wait.forMethod(LolApi, 'getChallengeGames', startDate);
      console.log(gameIds);
      startDate = new Date(startDate.getTime() + 5*60000);
    }
    
    });
}





wait.launchFiber(test); 