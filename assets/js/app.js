// firebase config / variables / etc
var config = {
    apiKey: "AIzaSyANasD6oaAkIJSHg5qPW39CsI9FViLHsj4",
    authDomain: "ralldrin-test-fec5f.firebaseapp.com",
    databaseURL: "https://ralldrin-test-fec5f.firebaseio.com",
    projectId: "ralldrin-test-fec5f",
    storageBucket: "ralldrin-test-fec5f.appspot.com",
    messagingSenderId: "864145895805",
    appId: "1:864145895805:web:ddc9704a2426812b"
};
// Initialize Firebase
firebase.initializeApp(config);
var DB = firebase.database();

let trains = {};
let index;
let snapshot;

// display current time
function currentTime() {
    let time = moment().format("hh:mm:ssA");
    $("#curr-time").html(`<h1>${time}</h1>`)
}

/*
get next train time:
1: get current time and first arrival in minutes 
2: add interval time to first until greater than current time
*/

// calculate when the next train arrives
function getNextTrain(fist, interval) {
    let curr = parseInt(moment().format("HH") * 60) + parseInt(moment().format("mm"))
    let next = 65;
    while (next < curr) {
        next += 65;
    }
    return next;
}

//let testTrain = getNextTrain('120', '50')
//console.log(testTrain)

// add a child train to trains object on database
function addTrain() {
    let obj = {};
    obj.name = $("#train-name").val();
    obj.dest = $("#destination").val();
    obj.nextArr = $("#first-arrival").val();
    obj.interval = $("#hour-btw").val() + $("#min-btw").val();
    trains[index] = obj;
    index++;
    DB.ref('TrainApp/trains').set(trains)
}

// Loop through trains object and display
function populateList() {
    $("#output").empty();
    for (let i = 0; i < index; i++) {
        $("#output").prepend(
            `<tr><th scope="row">${trains[i].name}</th>, 
                <td>${trains[i].dest}</td>
                <td>${trains[i].nextArr}</td>
                <td>${trains[i].interval}</td></tr>`);
    }
}

let clock = setInterval(currentTime, 1000);

// load stored list on page load
DB.ref('TrainApp/trains').once('value', function (snapshot) {
    trains = snapshot.val();
    index = Object.keys(trains).length;
    console.log(index, trains);
    populateList();
});

$('#submit').on('click', function (e) {
    e.preventDefault();
    addTrain();
    populateList();
});
