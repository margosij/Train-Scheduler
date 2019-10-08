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

var nextTrain = "";

$("#submit-info").on("click", function(event){
  event.preventDefault();
  
  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrain = $("#first-input").val().trim();
  frequency = $("#frequency-input").val().trim();
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

  $("#name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");

});

database.ref().on("child_added", function(childSnapshot) {
  var firstTimeConverted = moment(childSnapshot.val().firstTrain, "HH:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % childSnapshot.val().frequency;
  var tMinutesTillTrain = childSnapshot.val().frequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  $("#schedule").append("<tr><td><span class='member-name'> " +
    childSnapshot.val().name +
    " </td>" + "<td><span class='member-destination'> " + childSnapshot.val().destination +
    " </td>" + "<td><span class='member-frequency'> " + childSnapshot.val().frequency +
    " </td>" + "<td> " + moment(nextTrain).format("HH:mm") +
    " </td>" + "<td> " + tMinutesTillTrain +
    " </span></td></tr>");


}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  $("#name-display").text(snapshot.val().name);
  $("#frequency-display").text(snapshot.val().frequency);
  $("#destination-display").text(snapshot.val().destination);
  $("#firstTrain-display").text(snapshot.val().firstTrain);

});

