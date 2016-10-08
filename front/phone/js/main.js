$(function(){
	var milkcocoa = new MilkCocoa('woodiu1f1mcm.mlkcca.com');

	var ds = milkcocoa.dataStore('test-ds');

	ds.on('send', function(res) {
  		console.log(res.value.trigger);
	});

	$(".action-menu > li > p").on("click",function(){
		action = $(this).attr("action");
		ds.send({trigger : action});
	});
});