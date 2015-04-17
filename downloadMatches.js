var LolApi = require('./lib/lolapi'), wait=require('wait.for');
LolApi.init('RIOT_ID', 'na');
LolApi.setRateLimit(10,500);
var Mongo = require('mongodb').MongoClient;
    
wait.launchFiber(main); 

function main(){
    // Connect to the db
  var db = wait.forMethod(Mongo, "connect", "mongodb://localhost:3001/meteor");
  var collection = db.collection('games');

  var startDateCollection = db.collection('sdate');
  
  var startDateObj =  wait.forMethod(startDateCollection, "findOne");
  
  if(startDateObj ==  null) {
      startDateObj = {startDate:new Date(2015,3,2,0, 25)};
      startDateCollection.insert(startDateObj);
  }
  
  var startDate = new Date(2015,3,11,0, 25)
  
  try {
    while(true){
      wait.for(download, startDate, collection);
      startDate = new Date(startDate.getTime() + 5*60000);
      
      startDateCollection.remove();
      startDateObj = {startDate:startDate};
      startDateCollection.insert(startDateObj);
    }
  } catch (e) {
      console.log(e);
      console.log('retry download');
      db.close();
      main();
  }

}

function download(startDate, collection){
      console.log('Getting game at ' + startDate);
      var gameIds = wait.forMethod(LolApi, 'getChallengeGames', startDate);
  
       for (var i = 0; i < gameIds.length; i++) {
            if(  wait.forMethod(collection, 'find', {matchId: gameIds[i]}).count() ==0  ){
                var match = wait.forMethod(LolApi, 'getMatch', gameIds[i], true);
                console.log('got game:' + match.matchId);
                collection.insert(match);
                console.log('game inserted:' + match.matchId);
           }else{
               console.log(gameIds[i] + ' already downloaded');
           }
       }
}