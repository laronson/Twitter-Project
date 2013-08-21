$(function(){
    var markers = new Array();
    var map;
    var reload = function(){
        $.get('/stream', {},  function(data){
            console.log("a");
            var array =data;
            console.log(data)
             var marker = new google.maps.Marker({
                    position: google.maps.LatLng(31.222,150.223),
                    map: map,
                    title: "Hey"
            });

            for(var i=0; i<array.length; i++)
            {
                console.log("hello")
                if (markers.length >40){
                    markers[0].setMap(null);
                    delete markers[0]
                }
                var pos = new google.maps.LatLng(array[i][2], array[i][1])
                var marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: array [i][0]
                });
                markers.push(marker)
                console.log("here")
            }
            console.log("END OF FOR LOOP")

            reload()            
        })
    }
    $(document).ready(function () {
        initialize = function(){
            console.log("hi")
            var mapOptions = {
            center: new google.maps.LatLng(39.8282, 98.5795),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
            // window.setTimeout(reload,2000 );
            reload()
                

        }


        
        

        google.maps.event.addDomListener(window, 'load', initialize);
        console.log("try")
        

        
          

    })
})
