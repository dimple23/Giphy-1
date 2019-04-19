$('document').ready(function () {
    var cartoon = [
        "Tweety","Minnie Mouse","Spiderman","Winnie the Phoo","Popeye","Tom-Jerry","Batman"
               ];
    function displayCartoon() {
        for (var i = 0; i < cartoon.length; i++) {
            $('#buttons').append('<div class="btn btn-info get-giphy" data-attribute=' + cartoon[i] + '>' + cartoon[i] + '</div>');
        }
       
    }
    console.log(buttons);
    displayCartoon();
    $('#buttons').on('click', '.get-giphy', function () {
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).data('attribute') + "&api_key=O2X0wRMnWEjylyUypx1F5UVxCz5Jp8kr&limit=10";
        $.ajax({
            'url': queryURL,
            'method': 'GET'
        }).then(function (response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r") {
                    var gifDiv = $("<div class='item'/>").prependTo("#gifs-appear-here");
                                  $("<img class='cartoonImage '/>")
                                  .attr
                                  ({'src': results[i].images.fixed_height_still.url
                                   })
                                  .data({
                                 'state': 'still',
                                 'images': results[i].images
                                  }).appendTo(gifDiv);
                                  $('<p/>').text("Rating: " + results[i].rating).appendTo(gifDiv);
                                
                                
                   
                                }
            }
        });
    });
   

    $('#gifs-appear-here').on('click', '.cartoonImage', function () {
        var data = $(this).data();
        if (data.state === 'still') {
            $(this).attr('src', data.images.fixed_height.url);
            data.state = 'animate';
        } else {
            $(this).attr('src', data.images.fixed_height_still.url);
            data.state = 'still';
        }
    });
    $('button[type="submit"]').click(function () {
        var inputValue = $('.form-control').val().trim();
            cartoon.push(inputValue);
            $('#buttons').empty();
            displayCartoon();
        });

   
    $('.form-control').keypress(function (e) {
        if (e.which == 13) { 
            $('button[type="submit"]').click(); 
        }
    });
  
});