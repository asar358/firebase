$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyD-yKm0XccV2F-UXKKr8hoJECsmnXhvoJ0",
        authDomain: "train-schedule-69fa7.firebaseapp.com",
        databaseURL: "https://train-schedule-69fa7.firebaseio.com",
        projectId: "train-schedule-69fa7",
        storageBucket: "",
        messagingSenderId: "384951244961"
    };
    firebase.initializeApp(config);
    
    var database = firebase.database();

    $('#form-submit').on('click', function (event) {
        event.preventDefault()
        var train = $('#train-name').val().trim();
        var destination = $('#destination').val().trim();
        var trainTime = moment($("#train-time").val().trim(), "HH:mm").subtract(10, "years").format("X");
        var frequency = $('#frequency').val().trim();
       
           var newSchedule = {
                train: train,
                destination: destination,
                frequency: frequency,
                trainTime: trainTime
            }
            database.ref().push(newSchedule);             

        $('#train-name').val('');
        $('#destination').val('');
        $('#train-time').val('');
        $('#frequency').val('');

        return false;
    });

    database.ref().on('child_added', function (childSnapshot) {
       
       
       var trainName = childSnapshot.val().train;
       var destinationTab = childSnapshot.val().destination;
       var frequencyTab = childSnapshot.val().frequency;
       var traintimeTab = childSnapshot.val().trainTime

       var tRemainder = moment().diff(moment.unix(traintimeTab), "minutes") % frequencyTab;
       var tMinutes = frequencyTab - tRemainder;
       let tArrival = moment().add(tMinutes, "m").format("hh:mm A");

       $("#tableSetup > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationTab + "</td><td class='min'>" + frequencyTab + "</td><td class='min'>" + tArrival + "</td><td class='min'>" + tMinutes + "</td></tr>");


    })
});