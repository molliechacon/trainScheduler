// initializing firebase
var config = {
    apiKey: "AIzaSyAR5jXlx4dOK_Kv29GHSW5DKM6aFblGfbo",
    authDomain: "trainscheduler-a98cf.firebaseapp.com",
    databaseURL: "https://trainscheduler-a98cf.firebaseio.com",
    projectId: "trainscheduler-a98cf",
    storageBucket: "",
    messagingSenderId: "9625916010"
 };
 
 firebase.initializeApp(config);

 var database = firebase.database();

 // button for adding new trains
 $("#add-train").on("click", function(event) {
 	event.preventDefault();

 	// gather input
 	var trainName = $("#name-input").val().trim();
 	var trainDest = $("#destination-input").val().trim();
 	var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
 	var trainFreq = moment($("#frequency-input").val().trim(), "mm");
 	//!!!!!!!!!!!!!!!!!!!! or var trainFreq = $("#frequency-input").val().trim();

 	// temp object to hold new train data
 	var newTrain = {
 		name: trainName,
 		dest: trainDest,
 		time: trainTime, 
 		freq: trainFreq
 	}

 	// upload new data to firebase
 	database.ref().push(newTrain);

 	logs
	console.log("test object and individuals");
	console.log(newEmp);

	// alert
	alert("New train successfully added");

	// clear boxes
	$("#name-input").val("");
	$("#destination-input").val("");
	$("#time-input").val("");
	$("#frequency-input").val("");

 })

 // retrieve info from firebase
 database.ref().on("child_added", function(childSnapshot, prevChildKey) {
 	console.log("test childSnapshot from firebase");
	console.log(childSnapshot.val());
 });