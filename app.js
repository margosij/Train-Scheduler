  var firebaseConfig = {
    apiKey: "AIzaSyCXgKtXa6qtRXp4ONGCBYPFZ91wtPhU5H8",
    authDomain: "train-scheduler-e2bd6.firebaseapp.com",
    databaseURL: "https://train-scheduler-e2bd6.firebaseio.com",
    projectId: "train-scheduler-e2bd6",
    storageBucket: "",
    messagingSenderId: "959007788516",
    appId: "1:959007788516:web:69664dfd1c1d0245bd0bf1"
  };

firebase.initializeApp(firebaseConfig);


var database = firebase.database();

var name = "";
var destination = "";
var firstTrain = "";
var frequency = 0;

//maybe make the moment.js into a function
// var currentDate = moment().format("HH:mm");
// var train = moment().format("HH:mm");
// var firstTimeConverted = moment(train, "HH:mm").subtract(1, "years");
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// var remainder = diffTime % frequency;
// var tMinutesTillTrain = frequency - tRemainder; //minutes until next train
// var nextTrain = moment().add(tMinutesTillTrain, "minutes"); //next train arrival time

$("#submit-info").on("click", function(event){
  event.preventDefault();

  //current time in military
  
  // tMinutesTillTrain = frequency - remainder; //minutes until next train
  // nextTrain = moment().add(tMinutesTillTrain, "minutes"); //next train arrival time
  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrain = $("#first-input").val().trim();
  frequency = $("#frequency-input").val().trim();
  // addRow = $("#schedule").append("<tr><td>" + name + "</td>" + "<td>" + destination + "</td>" + "<td>" + firstTrain + "</td>" + "<td>" + frequency + "</td></tr>");
  database.ref().push({
      name: name,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
  });
});

database.ref().on("child_added", function(snapshot){
  $("#name-input").text(snapshot.val().name);
  $("#destination-input").text(snapshot.val().role);
  $("#first-input").text(snapshot.val().startDate);
  $("#frequency-input").text(snapshot.val().monthlyRate);
  // snapshot.val().tMinutesTillTrain;
  // snapshot.val().nextTrain;

  $("#name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");

});

database.ref().on("child_added", function(childSnapshot) {

  $("#schedule").append("<tr><td><span class='member-name'> " +
    childSnapshot.val().name +
    " </td>" + "<td><span class='member-destination'> " + childSnapshot.val().destination +
    " </td>" + "<td><span class='member-frequency'> " + childSnapshot.val().frequency +
    // " </td>" + "<td><span class='member-firstTrain'> " + childSnapshot.val().firstTrain +
    " </span></td></tr>");

    minutesLeft(childSnapshot.val().firstTrain, childSnapshot.val().frequency);


}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  $("#name-display").text(snapshot.val().name);
  $("#frequency-display").text(snapshot.val().frequency);
  $("#destination-display").text(snapshot.val().destination);
  $("#firstTrain-display").text(snapshot.val().firstTrain);
  // $("#minutesAway-display").text(tMinutesTillTrain = frequency - remainder)
});

function minutesLeft(firstTrain, frequency){
//current time in military
  // var currentDate = moment().format("HH:mm");
  var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  var train = moment().format("HH:mm");
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % frequency;
  var tMinutesTillTrain = frequency - tRemainder; //minutes until next train
  console.log(tMinutesTillTrain)
  // var nextTrain = moment().add(tMinutesTillTrain, "minutes"); //next train arrival time
}
minutesLeft();
function followingTrain(){
  var nextTrain = moment().add(minutesLeft(), "minutes"); //next train arrival time
  // console.log(nextTrain)
}
followingTrain();