$( document ).ready(function() {

    loadJson("head")
    
});



function loadJson(file) {
	$.getJSON( "json/"+file+".json", function( data ) {

		$.each( data, function( key, val ) {

			console.log(key)

			$.each (val, function(attr, value) {
				console.log(attr + ' ' + value)
			})
			
		});

	});
}