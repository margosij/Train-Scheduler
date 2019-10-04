
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCXgKtXa6qtRXp4ONGCBYPFZ91wtPhU5H8",
    authDomain: "train-scheduler-e2bd6.firebaseapp.com",
    databaseURL: "https://train-scheduler-e2bd6.firebaseio.com",
    projectId: "train-scheduler-e2bd6",
    storageBucket: "",
    messagingSenderId: "959007788516",
    appId: "1:959007788516:web:69664dfd1c1d0245bd0bf1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


var database = firebase.database();

// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

var name = "";
var destination = "";
var firstTrain = "";
var frequency = 0;

$("#submit").on("click", function(event){
  event.preventDefault();

  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrain = $("#first-input").val().trim();
  frequency = $("#frequency-input").val().trim();
  addRow = "<tr><td>" + name + "</td>" + "<td>" + role + "</td>" + 

  database.ref().push({
      name: name,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
  });
});

database.ref().on("child_added", function(snapshot){
  $("#name-input").text(snapshot.val().name);
  $("#destination-input").text(snapshot.val().role);
  $("#first-input").text(snapshot.val().startDate);
  $("#frequency-input").text(snapshot.val().monthlyRate);

},

function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
