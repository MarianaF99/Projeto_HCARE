function render(data) {
    
    var html = "<div class='commentBox'><div class='leftPanelImg'><img src='http://via.placeholder.com/100x100'/></div><div class='rightPanel'><span>" + data.name + "</span><div class='date'>" + data.date + "</div><p>" + data.body + "</p></div><div class='clear'></div></div>";

    $('#container').append(html);

}

$(document).ready(function() {

    var comment = [];

    if(!localStorage.comentData){
        localStorage.comentData = [];
    }else{
        comment = JSON.parse(localStorage.comentData);
    }

    
    for (var i = 0; i < comment.length; i++) {
        render(comment[i]);
    }

    $('#addComent').click(function() {
        var addObj = {
            "name": $('#name').val(),
            "date": $('#date').val(),
            "body": $('#bodyText').val()
        };

        comment.push(addObj);
        localStorage.comentData = JSON.stringify(comment);
        render(addObj);
        $('#name').val('');
        $('#date').val('dd/mm/yyyy');
        $('#bodyText').val('');
    });
});