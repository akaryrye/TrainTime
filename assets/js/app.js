

$(document).ready(function () {
    
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
    firebase.initializeApp(config);
    var DB = firebase.database();

    let trains = {};
    let index;
    let snapshot;
    
    function currentTime () {
        let time = moment().format("hh:mm:ssA");
        $("#curr-time").html(`<h1>${time}</h1>`)
    }

    // add a child train to trains object on database
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

    // Loop through trains object and display
    function populateList() {
        $("#output").empty();
        for (let i = 0; i < index; i++) {
            $("#output").prepend(
                `<tr><th scope="row">${trains[i].name}</th>, 
                <td>${trains[i].dest}</td>
                <td>${trains[i].nextArr}</td>
                <td>${trains[i].interval}</td>`);
        }
    }

    let clock = setInterval(currentTime, 1000);

    // load stored list on page load
    DB.ref('TrainApp/trains').once('value', function (snapshot) {
        trains = snapshot.val();
        index = Object.keys(trains).length;
        populateList();
    });

    $('#submit').on('click', function (e) {
        e.preventDefault();
        addTrain();
        populateList();
    });
});
