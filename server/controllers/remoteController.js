let request = require('request');

const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('C:/Users/jonth/.ssh/hospital-remote-firebase-adminsdk-n4yhi-7f476335cc.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hospital-remote.firebaseio.com/',
});

const db = admin.database();
const ref = db.ref('server/saving-data/');
const doctorTypeRefs = ref.child('doctorType');
const doctorRef = doctorTypeRefs.child('doctor');
const nurseRef = doctorTypeRefs.child('nurse');
const nurseAssistantRef = doctorTypeRefs.child('nurseAssistant');

// const data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: 'get good son' }];
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {
  app.post('/patientRequest/', urlencodedParser, (req, res) => {
    const requestBody = JSON.parse(Object.keys(req.body)[0]);
    console.log(requestBody);
    const requestType = requestBody.type;
    requestBody.status = 'open';
    if (requestType === 'food' || requestType === 'poop' || requestType === 'happy') {
      nurseAssistantRef.push(requestBody);
    } else if (requestType === 'medicine' || requestType === 'custom') {
      nurseRef.push(requestBody);
    } else if (requestType === 'emergency') {
      doctorRef.push(requestBody);
    }
    res.send(200);
  });

  app.delete('/patientRequest/', urlencodedParser, (req, res) => {
    const requestBody = JSON.parse(Object.keys(req.body)[0]);
    console.log('del'+ requestBody);
    const requestType = requestBody.type;
    const roomNum = requestBody.room;
    requestBody.status = 'open';
    if (requestType === 'food' || requestType === 'poop' || requestType === 'happy') {
      nurseAssistantRef.once('value', function(snapshot){
        snapshot.forEach(function(child){
            if(child.val().room === roomNum && child.val().type === requestType){
              nurseAssistantRef.child(child.key).remove();
            }
        });
    });
    } else if (requestType === 'medicine' || requestType === 'custom') {
      nurseRef.once('value', function(snapshot){
        snapshot.forEach(function(child){
            if(child.val().room === roomNum && child.val().type === requestType){
              nurseRef.child(child.key).remove();
            }
        });
    });
    } else if (requestType === 'emergency') {
      doctorRef.once('value', function(snapshot){
        snapshot.forEach(function(child){
            if(child.val().room === roomNum && child.val().type === requestType){
              doctorRef.child(child.key).remove();
            }
        });
      });
    }
    res.send(200);
  });
};

