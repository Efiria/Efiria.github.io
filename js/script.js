$( document ).ready(function() {
	console.log( "ready!" );

	$('.loader').hide();
	$('.container').show();

	var rangewifi = 400;
	$("#rangeWifi").html("portée : " + rangewifi);
	$("#wifiRange1").val(rangewifi);


	var stage = new createjs.Stage("simulation")

	stage.mouseMoveOutside = true; 

	var wifi1 = new createjs.Shape();
	wifi1.graphics.beginFill("red").drawCircle(0, 0, 10);

	var range1 = new createjs.Shape();
	range1.graphics.beginFill("blue").drawCircle(0, 0, rangewifi);
	range1.alpha = 0.05
	range1.mouseEnabled = false

	var label1 = new createjs.Text("Wifi1", "14px Arial", "#00000");
	label1.textAlign = "center";
	label1.y = -30;

	var dragger1 = new createjs.Container();
	dragger1.x = 200
	dragger1.y = 180;
	dragger1.addChild(wifi1,range1,label1);
	stage.addChild(dragger1);

	$("#posWifi1").html("x : " + dragger1.x + "</br> y : " + dragger1.y);

	dragger1.on("pressmove",function(evt) {

		evt.currentTarget.x = evt.stageX;
		evt.currentTarget.y = evt.stageY;
		stage.update();   
		$("#posWifi1").html("x : " + evt.stageX + " </br> y : " + evt.stageY);
	});



	var wifi2 = new createjs.Shape();
	wifi2.graphics.beginFill("red").drawCircle(0, 0, 10);

	var range2 = new createjs.Shape();
	range2.graphics.beginFill("blue").drawCircle(0, 0, rangewifi);
	range2.alpha = 0.05
	range2.mouseEnabled = false

	var label2 = new createjs.Text("Wifi2", "14px Arial", "#00000");
	label2.textAlign = "center";
	label2.y = -30;

	var dragger2 = new createjs.Container();
	dragger2.x = 680
	dragger2.y = 290
	dragger2.addChild(wifi2,range2,label2);
	stage.addChild(dragger2);

	$("#posWifi2").html("x : " + dragger2.x + "</br> y : " + dragger2.y);

	dragger2.on("pressmove",function(evt) {

		evt.currentTarget.x = evt.stageX;
		evt.currentTarget.y = evt.stageY;
		stage.update();   
	});

	var wifi3 = new createjs.Shape();
	wifi3.graphics.beginFill("red").drawCircle(0, 0, 10);

	var range3 = new createjs.Shape();
	range3.graphics.beginFill("blue").drawCircle(0, 0, rangewifi+50);
	range3.alpha = 0.05
	range3.mouseEnabled = false

	var label3 = new createjs.Text("Wifi3", "14px Arial", "#00000");
	label3.textAlign = "center";
	label3.y = -30;

	var dragger3 = new createjs.Container(); 
	dragger3.x = 485
	dragger3.y = 405
	dragger3.addChild(wifi3,range3,label3);
	stage.addChild(dragger3);

	$("#posWifi3").html("x : " + dragger3.x + "</br> y : " + dragger3.y);

	dragger3.on("pressmove",function(evt) {

		evt.currentTarget.x = evt.stageX;
		evt.currentTarget.y = evt.stageY;
		stage.update();   
	});


	var user = new createjs.Shape();
	user.graphics.beginFill("yellow").drawCircle(0, 0, 10);

	var labeluser = new createjs.Text("user", "14px Arial", "#00000");
	labeluser.textAlign = "center";
	labeluser.y = -30;

	var draggerUser = new createjs.Container(); 
	draggerUser.x = 445
	draggerUser.y = 555
	draggerUser.addChild(user,labeluser);
	stage.addChild(draggerUser);

	draggerUser.on("pressmove",function(evt) {

		evt.currentTarget.x = evt.stageX;
		evt.currentTarget.y = evt.stageY;
		stage.update();   

		var distanceborne1 = getDistance(evt.stageX,evt.stageY,dragger1.x,dragger1.y)
		var distanceborne2 = getDistance(evt.stageX,evt.stageY,dragger2.x,dragger2.y)
		var distanceborne3 = getDistance(evt.stageX,evt.stageY,dragger3.x,dragger3.y)

		distances=[distanceborne1,distanceborne2,distanceborne3]
		var available=[]

		if (distanceborne1 >= rangewifi) { $("#distWifi1").css("background-color", "red");  available = available.filter(function(e) { return e !== 'wifi1' }) } else { $("#distWifi1").css("background-color", "green"); available.push('wifi1')  }
		if (distanceborne2 >= rangewifi) { $("#distWifi2").css("background-color", "red"); 	available = available.filter(function(e) { return e !== 'wifi2' })} else { $("#distWifi2").css("background-color", "green"); available.push('wifi2') }
		if (distanceborne3 >= rangewifi+50) { $("#distWifi3").css("background-color", "red"); available = available.filter(function(e) { return e !== 'wifi3' }) } else { $("#distWifi3").css("background-color", "green"); available.push('wifi3') }

		console.log(available);
	});
	
	stage.update();

	//----------------------




	//Si utilisateur est +400 distance d'une borne alors elle n'est pas choisi pour la triangulation
	//Si plus de 2 bornes sont disponible pour la triangulation alors on prends les deux plus proches

	//racine de (xb-xa)² + (yb-ya)²

	//Cette partie sert a simuler la porter d'une borne wifi.

	//Calcule distance avec borne 1

	var distanceborne1 = getDistance(draggerUser.x,draggerUser.y,dragger1.x,dragger1.y)
	var distanceborne2 = getDistance(draggerUser.x,draggerUser.y,dragger2.x,dragger2.y)
	var distanceborne3 = getDistance(draggerUser.x,draggerUser.y,dragger3.x,dragger3.y)

	if (distanceborne1 >= rangewifi) { $("#distWifi1").css("background-color", "red") } else { $("#distWifi1").css("background-color", "green") }
	if (distanceborne2 >= rangewifi) { $("#distWifi2").css("background-color", "red") } else { $("#distWifi2").css("background-color", "green") }
	if (distanceborne3 >= rangewifi+50) { $("#distWifi3").css("background-color", "red") } else { $("#distWifi3").css("background-color", "green") }

	function getUserPosition(evt, distances) {


		
	}
	

	function getDistance(xa, ya, xb, yb) {
		
		var distance = Math.round(Math.sqrt(Math.pow((xb - xa),2) + Math.pow((yb - ya),2)))

		return distance
	}

});

