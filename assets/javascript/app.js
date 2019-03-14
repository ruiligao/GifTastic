$(document).ready(function () {
    // creat a vaiable to a arry hold the animals
    var topics = ["minion", "Belle", "snow white", "ariel", "aurora", "rapunzel", "cinderella", "tiana"];
    //generate renderbutton
    function renderButton() {
        $("#button-view").empty();
        for (let i = 0; i < topics.length; i++) {
            var buttonDiv = $("<button>");
            buttonDiv.attr("data", topics[i]);
            buttonDiv.attr("class", "clickButton")
            buttonDiv.text(topics[i]);
            console.log(buttonDiv);
            $("#button-view").append(buttonDiv);
        };
        $(".clickButton").click(function () {
            $(".outputInfor").empty();
            console.log("BUTTON:" + $(this));
    
            var animal = $(this).attr("data");
            console.log(animal);
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=rhlVmYzbfhR5PR4P298Pz7vPgX69oPf3&limit=10";
            //ajax send the requst to api by GET method
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                var result = response.data;
    
                for (let i = 0; i < result.length; i++) {
    
                    var dataDiv = $("<div class='div'>");
                    var rating = result[i].rating
                    var p = $("<p>");
                    p.text("Rating: " + rating);
                    var animalImage = $("<img>");
    
                    animalImage.attr("src", result[i].images.fixed_height_still.url);
                    animalImage.attr("data-animate", result[i].images.fixed_height.url);
                    animalImage.attr("data-still", result[i].images.fixed_height_still.url);
                    animalImage.attr("data-state", "still");
                    animalImage.attr("class", "gif")
                    console.log(animalImage);
    
                    dataDiv.append(p);
                    dataDiv.append(animalImage);
                    $(".outputInfor").append(dataDiv);
                };
    
                $("img").click(function () {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                        console.log(state);
                    }
                    else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                        // console.log(state);
                    }
                });
            });
        });
    };
    //create the click event to the event listener submit button
    $("#submit").click(onSubmitButtonClicked);

    function onSubmitButtonClicked(event) {
        console.log("CLICK");
        event.preventDefault();
        var input = $("#inputAnimal").val().trim();
        topics.push(input);
        console.log(topics);
        renderButton();
        
    };

    renderButton();
    //creat the URL 
});