$(document).ready(function(){
	
	// initializing firebase
	var config = {
	    apiKey: "AIzaSyAR5jXlx4dOK_Kv29GHSW5DKM6aFblGfbo",
	    authDomain: "trainscheduler-a98cf.firebaseapp.com",
	    databaseURL: "https://trainscheduler-a98cf.firebaseio.com",
	    projectId: "trainscheduler-a98cf",
	    storageBucket: "trainscheduler-a98cf.appspot.com",
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
	 	// why subtract 10 years???? found this online when I couldn't get mine to work.
	 	var trainTime = moment($("#time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
	 	var trainFreq = $("#frequency-input").val().trim();

	 	// console.log(trainName);
	 	// console.log(trainDest);
	 	// console.log(trainTime);
	 	// console.log(trainFreq);

	 	// temp object to hold new train data
	 	var newTrain = {
	 		name: trainName,
	 		dest: trainDest,
	 		time: trainTime, 
	 		freq: trainFreq
	 	}

	 	// upload new data to firebase
	 	database.ref().push(newTrain);

	 	// logs
		// console.log("test object and individuals");
		// console.log(newTrain);

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

	 // 	console.log("test childSnapshot from firebase");
		// console.log(childSnapshot.val());

		// store data from firebase
		var fireTrainName = childSnapshot.val().name;
		var fireTrainDest = childSnapshot.val().dest;
		var fireTrainTime = childSnapshot.val().time;
		var fireTrainFreq = childSnapshot.val().freq;

		// logs
		// console.log("test new vars made from firebase");
		// console.log(fireTrainName);
		// console.log(fireTrainDest);
		// console.log(fireTrainTime);
		// console.log(fireTrainFreq);

		// calculate minutes away
		var differenceInTime = 	moment().diff(moment.unix(fireTrainTime), "minutes");
		var remainder = 		moment().diff(moment.unix(fireTrainTime), "minutes") % fireTrainFreq;
		var minutesAway = 		fireTrainFreq - remainder;
		
		// calculate next arrival
		var nextArrival = moment().add(minutesAway, "m").format("HH:mm A");
		
		// add new trains to the table
		$("#train-table > tbody").append("<tr><td>" + fireTrainName + "</td><td>" + fireTrainDest + "</td><td>" + fireTrainFreq + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
	 });
 });