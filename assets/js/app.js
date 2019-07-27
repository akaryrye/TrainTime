var config = {
    apiKey: "AIzaSyANasD6oaAkIJSHg5qPW39CsI9FViLHsj4",
    authDomain: "ralldrin-test-fec5f.firebaseapp.com",
    databaseURL: "https://ralldrin-test-fec5f.firebaseio.com",
    projectId: "ralldrin-test-fec5f",
    storageBucket: "ralldrin-test-fec5f.appspot.com",
    messagingSenderId: "864145895805",
    appId: "1:864145895805:web:ddc9704a2426812b"
};

firebase.initializeApp(config);

var DB = firebase.database();


let trains = {};
let index;
let snapshot;

DB.ref('TrainApp/trains').once('value', function (snapshot) {
    trains = snapshot.val();
    index = Object.keys(trains).length;
    populateList();
});

console.log(index)

function addTrain() {
    let obj = {};
    obj.name = $("#train-name").val();
    obj.dest = $("#destination").val();
    obj.nextArr = $("#next-arrival").val();
    obj.interval = $("#time-between").val();
    trains[index] = obj;
    index++;
    DB.ref('TrainApp/trains').set(trains)
}

function populateList() {
    $("#output").empty();
    for (let i = 0; i < index; i++) {

        $("#output").prepend(
            `<h4>Name: ${trains[i].name}, 
            Destination: ${trains[i].dest}
            Next Arrival: ${trains[i].nextArr}
            Interval: ${trains[i].interval}</h4>`);
    }
}

$('#submit').on('click', function (e) {
    e.preventDefault();
    addTrain();
    populateList();


});
