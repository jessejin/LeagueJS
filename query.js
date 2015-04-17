var wait=require('wait.for');
var Mongo = require('mongodb').MongoClient;

// Connect to the db
wait.launchFiber(query); 


function query(){
  
  var db = wait.forMethod(Mongo, "connect", "mongodb://localhost:3001/meteor");
  var collection = db.collection('games');
  
  var match = wait.forMethod(collection, "findOne");
  console.log(match);

    var startDateCollection = db.collection('startDate');
  
  var startDate = wait.forMethod(startDateCollection, "findOne");
  console.log(startDate);
       collection.aggregate([
           { $project : { "matchId":1, "timeline.frames.events": 1}},
           { $unwind: "$timeline.frames"},
           { $unwind: "$timeline.frames.events"},
           { $match:{ "timeline.frames.events.eventType" : 'CHAMPION_KILL', matchId: 1783157597} },
           ], function(err, match) {
           if(err) console.log(err);
          
           for (var i = 0; i < match.length; i++) {
               //console.log(match[i].timeline.frames.events);
               var event = match[i].timeline.frames.events;
              
              
               console.log(i+ ' - '+ event.killerId + ' kill ' + event.victimId + ' @ ' + event.timestamp);
           }
       });
      
      
db.games.aggregate([
{ $match:{ matchId: 1780632207} },
{ $project : { "matchId":1, "timeline.frames.events": 1}},
{ $unwind: "$timeline.frames"},
{ $unwind: "$timeline.frames.events"},
{ $match:{ "timeline.frames.events.eventType" : 'CHAMPION_KILL'} },
{ $group:{ _id: { "matchId":"$matchId", "killerId":"$timeline.frames.events.killerId"}, kills:{$sum: 1}}},
{ $sort:{kills:-1}},
{ $limit: 1},
{ $project : { matchId: '$_id.matchId', killerId: '$_id.killerId', kills:1   }
]);


db.games.aggregate([
{ $match:{ matchId: 1780632207} },
{ $project : { "matchId":1, "timeline.frames.events": 1}},
{ $unwind: "$timeline.frames"},
{ $unwind: "$timeline.frames.events"},
{ $match:{ "timeline.frames.events.eventType" : 'CHAMPION_KILL'} },
{ $group:{ _id: { "matchId":"$matchId", "killerId":"$timeline.frames.events.killerId"}, kills:{$sum: 1}}},
{ $sort:{kills:-1}},
{ $limit: 1}
]);

db.topKills.aggregate([
{ $project : { "_id":0, "matchId":"$_id.matchId", "killerId":"$_id.killerId", "kills":"$kills" }},
{ $out:"mostKills"}
]);



//insert all kills

  
db.games.aggregate([
{ $match:{ matchId: 1780632207} },
{ $project : { "matchId":1, "participants": 1}},
{ $unwind: "$participants"},
{ $sort:{"$participants.stats.kills":-1}},
{ $limit: 20},
{ $out:"topKills"}
])






db.games.aggregate([
{ $match:{ matchId: 1780632207} },
{ $unwind: "$timeline.frames"},
{ $unwind: "$timeline.frames.events"},
{ $match:{ "timeline.frames.events.participantId" : 2,
           "timeline.frames.events.eventType" : 'ITEM_PURCHASED'} },
{ $project : { 
          
  
              "timeline.frames.events.timestamp": 1,
              "timeline.frames.events.itemId": 1,}}
]);


1779724488 7

db.mostKills.find({}).forEach(
 function(kill){
   
db.topBuilds.insert(
  db.games.aggregate([
    { $match:{ matchId: kill.matchId} },
    { $unwind: "$participants"},
    { $match:{ "participants.participantId": 7} },  
    { $project : { "matchId":"$matchId",
                "championId": "$participants.championId",
                 "masteries":"$participants.masteries",
                     "runes":"$participants.runes",
                  "spell1Id":"$participants.spell1Id", 
                  "spell2Id":"$participants.spell2Id"}},
    { $limit: 1}
    ]).toArray());
    
db.topBuilds.update(
  {matchId:kill.matchId}
  ,
  
   {$set:
   {purchases:
               db.games.aggregate([
                { $match:{ matchId: kill.matchId} },
                { $unwind: "$timeline.frames"},
                { $unwind: "$timeline.frames.events"},
                { $match:{ "timeline.frames.events.participantId" : kill.killerId,
                           "timeline.frames.events.eventType" : 'ITEM_PURCHASED'} },
                { $project : { _id:0,
                              "timestamp":"$timeline.frames.events.timestamp",
                              "itemId":"$timeline.frames.events.itemId"}}
                ]).toArray()}
   }
  );
  
  
  
 }
  
)



db.topBuilds.insert(
      db.games.aggregate([
  { $match:{ matchId: 1779724488} },
  { $unwind: "$participants"},
  { $match:{ "participants.participantId": 7} },  
  { $project : { "matchId":"$matchId",
                 "championId": "$participants.championId", 
                "spell1Id":"$participants.spell1Id", 
                "spell2Id":"$participants.spell2Id"}},
  { $limit: 1}
  ]).toArray());
  
  
  
db.topBuilds.update(
  {matchId:1779724488}
  ,
   {$set:
   {purchases:
               db.games.aggregate([
                { $match:{ matchId: 1779724488} },
                { $unwind: "$timeline.frames"},
                { $unwind: "$timeline.frames.events"},
                { $match:{ "timeline.frames.events.participantId" : 7,
                           "timeline.frames.events.eventType" : 'ITEM_PURCHASED'} },
                { $project : { _id:0,
                              "timestamp":"$timeline.frames.events.timestamp",
                              "itemId":"$timeline.frames.events.itemId"}}
                ]).toArray()}
   }
  );
  
  
  
  
db.games.aggregate([
{ $project : { "matchId":1, "participants": 1}},
{ $unwind: "$participants"},
{ $sort:{"participants.stats.kills":-1}},
{ $project : { "matchId": "$matchId",
            "championId": "$participants.championId",
         "participantId": "$participants.participantId",
             "masteries": "$participants.masteries",
                 "runes": "$participants.runes",
                 "stats": "$participants.stats",
              "spell1Id": "$participants.spell1Id", 
              "spell2Id": "$participants.spell2Id"}},
{ $limit: 10},
{ $out:"topKills2"}
], 
{ 
    allowDiskUse : true
})



db.topKills2.find({}).forEach(
 function(kill){
   
db.topKills2.update(
  {matchId:kill.matchId},
  {$set:
  {purchases:
               db.games.aggregate([
                { $match:{ matchId: kill.matchId} },
                { $unwind: "$timeline.frames"},
                { $unwind: "$timeline.frames.events"},
                { $match:{ "timeline.frames.events.participantId" : kill.participantId,
                           "timeline.frames.events.eventType" : 'ITEM_PURCHASED'} },
                { $project : { _id:0,
                              "timestamp":"$timeline.frames.events.timestamp",
                              "itemId":"$timeline.frames.events.itemId"}}
                ]).toArray()}
   }
  );
 }
)