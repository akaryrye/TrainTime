

$('#submit').on('click', function(e) {
    e.preventDefault();
    $("#name").text($("#train-name").val());
    $("#dest").text($("#destination").val());
    $("#nextArr").text($("#next-arrival").val()); 
    $("#interval").text($("#time-between").val()); 
});
