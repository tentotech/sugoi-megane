$(function(){

	var milkcocoa = new MilkCocoa('woodiu1f1mcm.mlkcca.com');

	var ds = milkcocoa.dataStore('test-ds');

	ds.on('send', function(res) {
  		console.log(res.value.trigger);
	});

	$(".action-menu > li > p").on("click",function(){
		action = $(this).attr("action");
		ds.send({trigger : action});

		// transition page .
		var now  = $("section > div.show");
		var next = $("section > div." + action);

		$(now).addClass("hide").removeClass("show");
		$(next).addClass("show");
	});

	$(".back span").on("click",function(){
		var now  = $("section > div.show");
		var prev = $("section > div.hide");

		$(now).removeClass("show");
		$(prev).removeClass("hide").addClass("show");

		ds.send({trigger : "home"});
	});
});