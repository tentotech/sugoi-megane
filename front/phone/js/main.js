$(function(){
	var milkcocoa = new MilkCocoa('woodiu1f1mcm.mlkcca.com');

	var ds = milkcocoa.dataStore('test-ds');

	ds.on('send', function(res) {
  		console.log(res.value.trigger);
	});

	ds.send({trigger : 'photo'});

});