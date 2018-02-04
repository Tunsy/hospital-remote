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
// Create a new ref and save data to it in one step
nurseRef.set({
  room: '300',
  name: 'Meet Patel',
  fallrisk: '3',
  requestType: 'Poop',
  status: 'Open',
});

doctorRef.set({
  room301: {
    name: 'Chris Wong',
    fallrisk: '3',
    requestType: 'Emergency',
    status: 'Open',
  },
});

// const data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: 'get good son' }];
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {
  app.post('/patientRequest/', urlencodedParser, (req, res) => {
    const requestType = req.body.type;
    req.body.status = 'open';
    if (requestType === 'food' || requestType === 'poop' || requestType === 'happy') {
      nurseAssistantRef.push(req.body);
    } else if (requestType === 'medicine' || requestType === 'custom') {
      nurseRef.push(req.body);
    } else if (requestType === 'emergency') {
      doctorRef.push(req.body);
    }
  });

  app.delete('/todo/:item', (req, res) => {

  });
};

