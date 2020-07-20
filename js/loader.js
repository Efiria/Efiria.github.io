$.getJSON( "json/head.json", function( data ) {

	$.each( data, function( key, val ) {
		console.log(key + ' ' + val)
	});

});