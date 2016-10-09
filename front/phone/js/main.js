$(function(){

	var milkcocoa = new MilkCocoa('woodiu1f1mcm.mlkcca.com');

	var ds = milkcocoa.dataStore('test-ds');

	// test
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

	$(".camera-btn > div i").on("click",function(){
		$(".photo").addClass("flash");
		ds.send({trigger : "take"});
		setTimeout(function(){
			$(".photo").removeClass("flash");
		},500);
	});

	$("ul.sns > li p").on("click",function(){
		sns = $(this).attr("sns");
		if(sns){
			$(".fil").show();
			$("." + sns + "-form").show();
		}
	});

	$(".twi-send").on("click",function(){
		twisend();
	});
	$(".ig-send").on("click",function(){
		igsend();
	});

	$(".cancel i").on("click",function(){
		$(".ig-id").val("");
		$(".ig-pw").val("");
		$(".twi-id").val("");
		$(".twi-pw").val("");

		$(".twi-form").hide();
		$(".ig-form").hide();
		$(".fil").hide();
	})

	function twisend(){
		data = {	
			method: "POST",
			sns: "twitter",
			id: $(".twi-id").val(),
			pw: $(".twi-pw").val()
		}
		
		$.ajax({
		   	type: "POST",
		   	url: "http://nagix2.webcrow.jp/halloween-chikara/api/setting.php",
		    data: data,
		    success: function(res){
		    	$(".twi-id").val("");
				$(".twi-pw").val("");
				$(".fil").hide();
				$(".twi-form").hide();

		    },
		    error: function(XMLHttpRequest) {
		    	console.log(XMLHttpRequest);
		    }
		});
	}
	function igsend(){
		/*data = {	
			method: "POST",
			sns: "instagram",
			id: $(".ig-id").val(),
			pw: $(".ig-pw").val()
		}
		
		$.ajax({
		   	type: "POST",
		   	url: "http://nagix2.webcrow.jp/halloween-chikara/api/setting.php",
		    data: data,
		    success: function(res){
		    	$(".ig-id").val("");
				$(".ig-pw").val("");
				$(".fil").hide();
				$(".ig-form").hide();
		    },
		    error: function(XMLHttpRequest) {
		    	console.log(XMLHttpRequest);
		    }
		});
		*/
	}
});