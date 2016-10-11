var date = new Date();
var hour = date.getHours();
var minutes = date.getMinutes();
var seconds = date.getSeconds();
var merdiem = "AM";
var currentdayslide = 0;
var currentnightslide = 0;
var dayslideshow,nightslideshow;
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
	$("#btn1").removeClass("display");
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
	$("#btn1").addClass("display");
}

function openRightNav(){
	document.getElementById("rightNav").style.width = "250px";
	$("#btn2").removeClass("display");
}
function closeRightNav() {
    document.getElementById("rightNav").style.width = "0";
	$("#btn2").addClass("display");
}
function fetchImages(){
	$("#loadimg").empty();
	var searchtext = $("#search").val();
	if(searchtext==='') {
		alert("Please enter a search key");
		return;
	}
	var requestNameURL = "https://api.flickr.com/services/rest/?api_key=083c208ccd52686160f1a5fed4a071d3&format=json&text=" + searchtext +"&per_page=50&method=flickr.photos.search&jsoncallback=?"
	$.getJSON(requestNameURL,function(data) {
		console.log(data);
		$(data.photos.photo).each(function(index,photo) {
			var newEntry = document.createElement("img");
			var imgUrl = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server +"/" + photo.id + "_" + photo.secret + ".jpg";
			var img2 = 'https://farm1.staticflickr.com/2/1418878_1e92283336_m.jpg';
			newEntry.setAttribute("src",imgUrl);
			$("#loadimg").append(newEntry);
		});
	});
	clear("#search");
}
function change(){
	date = new Date();
	hour = date.getHours();
	minutes = date.getMinutes();
	seconds = date.getSeconds();
	if(hour >= 0&&hour <= 12) { 
		if(!$("#dayslider").hasClass('display')) return;
		clearInterval(nightslideshow);
		$("#orb").removeClass('moon').addClass('sun');
		$("#moonspot1").hide();
		$("#moonspot2").hide();
		$("#moonspot3").hide();
		$("#dayslider").removeClass('display');
		$("#nightslider").addClass("display");
		var dayslider = $("#dayslider");
		var $dayslidecontainer = dayslider.find(".dayslides");
		var dayslides = $dayslidecontainer.find(".bg");
		dayslideshow = setInterval(function(){
			$(".dayactive").animate({"left":"-100%"},1000,function(){
				var active = $(".dayactive");
				var num = $(active).css('z-index') - dayslides.length;
				$(active).css('z-index',num);
				$(active).css('left','0');
				currentdayslide++;
				console.log($(active).css('z-index'));
				if(currentdayslide === dayslides.length){
					currentdayslide = 0;
					dayslides.last().addClass("dayactive");
					$(active).removeClass("dayactive");
					dayslides.css('z-index',10);
				} else {
					$(".dayactive").prev().addClass("dayactive");
					$(active).removeClass("dayactive");
				}
			});
		},3000
		);
	} else {
		if(!$("#nightslider").hasClass('display')) return;
		clearInterval(dayslideshow);
		$("#orb").removeClass('sun').addClass('moon');
		$("#moonspot1").fadeIn();
		$("#moonspot2").fadeIn("slow");
		$("#moonspot3").fadeIn(2000);
		$("#dayslider").addClass('display');
		$("#nightslider").removeClass("display");
		var nightslider = $("#nightslider");
		var $nightslidecontainer = nightslider.find(".nightslides");
		var nightslides = $nightslidecontainer.find(".bg");
		nightslideshow = setInterval(function(){
			$(".nightactive").animate({"left":"-100%"},1000,function(){
				var active = $(".nightactive");
				var num = $(active).css('z-index') - nightslides.length;
				$(active).css('z-index',num);
				$(active).css('left','0');
				currentnightslide++;
				console.log($(active).css('z-index'));
				if(currentnightslide === nightslides.length){
					currentnightslide = 0;
					nightslides.last().addClass("nightactive");
					$(active).removeClass("nightactive");
					nightslides.css('z-index',10);
				} else {
					$(".nightactive").prev().addClass("nightactive");
					$(active).removeClass("nightactive");
				}
			});
		},3000
		);

	}
};
function formatMinutes(minutes) {
	if(minutes < 10) return "0" + minutes;
	return minutes;
}
function formatSecond(seconds) {
	if(seconds < 10) return "0" + seconds;
	return seconds;
}
function formatHour(hour) {
	if(merdiem === "PM") {
		var displayh = hour - 12;
		if(displayh < 10)  return "0" + displayh;
		else return displayh;
	} else {
		if(hour < 10) return "0" + hour;
		else return hour;
	}
}
function tick() {
	date = new Date();
	hour = date.getHours();
	if(hour > 12) {
		merdiem = "PM";
	} else {
		merdiem = "AM";
	}
	minutes = date.getMinutes();
	seconds = date.getSeconds();
	$("#clock").html(formatHour(hour) + ":" + formatMinutes(minutes) + ":" + formatSecond(seconds) + "   " + merdiem);
}; 
function showVal(){
	return new Date($("#me").val());
}
function playAudio(){
	var audio = document.getElementById("myAudio");
	audio.play();
}
function newTask() {
	var newEntry = document.createElement("a");
	newEntry.href = "#";
	var text = $("#entertask").val();
	if(text === "") {
		alert("You must write something!");
		return;
	}
	var textnode = document.createTextNode(text);
	newEntry.appendChild(textnode);
	newEntry.setAttribute('class','removeButton');
	$("#mySidenav").append(newEntry);
	clear("#entertask");
}
function removeTask(){
	alert(this.value);
}
function clear(selector){
	$(selector).val("");
}
$(document).ready(function() {
	tick();
	change();
	var bglist = new Array();
	bglist.push($("#dayslider"));
	bglist.push($("#nightslider"));
	var changeTime = setInterval("tick()",1000);
	var picChange = setInterval("change()",3000);
	$("#submitb").click(function(){ 
		var past = moment($("#me").val()).toDate();
		var now = new Date();
		if(now > past) {
			alert('Invalid time!');
			return;
		}
		var timeDiff = Math.floor((Math.abs(now - past)));
		console.log(now);
		console.log(past);
		console.log(timeDiff);
		var alarm = setTimeout("playAudio();",timeDiff);
	});
	$(document).on('click','.removeButton',function() {
        $(this).toggleClass("checked");
	});
	$(document).on('dblclick','.removeButton',function() {
        $(this).closest("a").remove();
	});
	
	
});