$(function(){
    $(document).ready(function () {
        initialize = function(){
            console.log("hi")
            var mapOptions = {
            center: new google.maps.LatLng(39.8282, 98.5795),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);

            $.get('/stream', {},  function(data){
            console.log("a");
            console.log(data);
            var array =data;
            console.log(array);

             var marker = new google.maps.Marker({
                    position: google.maps.LatLng(31.222,150.223),
                    map: map,
                    title: "Hey"
                });

            for(var i=0; i<array.length; i++)
            {
                console.log("hello")
                console.log(array[i][0])
                console.log(array[i][1])

                var pos = new google.maps.LatLng(array[i][2], array[i][1])
                var marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: array [i][0]
                });
            }
        })

        }


        
        

        google.maps.event.addDomListener(window, 'load', initialize);
        console.log("try")
        

        
          

    })
})
