// var config = {
//     apiKey: "AIzaSyD7V-U9UlV3OmsScd9JBX_ZMCQKsl5UsiE",
//     authDomain: "fir-recent-user.firebaseapp.com",
//     databaseURL: "https://fir-recent-user.firebaseio.com",
//     storageBucket: "fir-recent-user.appspot.com"
//   };


//   firebase.initializeApp(config);

// var database = firebase.database();


// var name = "";
// var role = "";
// var startDate = "";
// var monthlyRate = 0;

// $("#submit").on("click", function(event){
//   event.preventDefault();

//   name = $("#name-input").val().trim();
//   role = $("#role-input").val().trim();
//   startDate = $("#date-input").val().trim();
//   monthlyRate = $("#rate-input").val().trim();

//   database.ref().push({
//       name: name,
//       role: role,
//       startDate: startDate,
//       monthlyRate: monthlyRate
//   });
// });

// database.ref().on("child_added", function(snapshot){
//   $("#name-input").text(snapshot.val().name);
//   $("#role-input").text(snapshot.val().role);
//   $("#date-input").text(snapshot.val().startDate);
//   $("#rate-input").text(snapshot.val().monthlyRate);
// },

// function(errorObject) {
//     console.log("Errors handled: " + errorObject.code);
//   });
