
(function($){

	$('a').bind('touchstart', function(){
	    $(this).addClass('touch');
	}).bind('touchend', function(){
	    $(this).removeClass('touch');
	});

    $.fn.swipeCards=function() {
    	$(this).swipe("destroy");
		$(this).swipe({
			swipeStatus:function(event, phase, direction, distance, duration, fingerCount)
			{
				console.log(direction, distance, duration);

				if (direction == 'up') {
					if (distance > 10 && phase == 'move') {
						$('.cc.active').children('.card').css({"transform":"rotateX("+ distance * 2 +"deg)"});
					}
					if(distance > 100 && phase == "end") {
						$('.cc.active').children('.card').css({"transform":"rotateX(180deg)"});
					} else if(distance < 100 && phase == "end") {
						$('.cc.active').children('.card').css({"transform":"rotateX(1deg)"});
					}
				} else if (direction == 'down') {
					if (distance > 10 && phase == 'move') {
						$('.cc.active').children('.card').css({"transform":"rotateX("+ distance * -2 +"deg)"});
					}
					if(distance > 100 && phase == "end") {
						$('.cc.active').children('.card').css({"transform":"rotateX(1deg)"});
					} else if(distance < 100 && phase == "end") {
						$('.cc.active').children('.card').css({"transform":"rotateX(180deg)"});
					}
				}

				if (direction == 'left') {
					if (phase == 'move') {
						$('.cc.active').css({"transform":"translateX("+ distance * -1 +"px) rotate("+ distance * -0.01 +"deg)"});
					}

					if(distance > 50) {
						$('.cc.active').find('.card .good').css('color', 'rgba(92, 184, 92, '+ distance * 0.01 +'');
					}

					if(phase == "end" && distance > 100) {
						var current = $('.cc.active'),
							next = current.prevAll('.unknown').first();

						current.animate({transform: 'translateX(-580px) rotate(-5deg)' }, 700, "easeInOutCubic");
						current.removeClass('unknown active').addClass('known');
						next.addClass('active').removeClass('random');
						next.children('.card').css({transform: 'translateZ(0px) rotateX(1deg)' });

					} else if( phase == "end" || phase == "cancel") {
						$('.cc.active').animate({transform: 'translateX(0px)' }, 600, "easeInOutCubic");
						$('.cc.active').find('.card .good').css('color', 'rgba(92, 184, 92, 0)');
					}

					if($('.cc.unknown').length < 1) {
						$('body').addClass('bravo');
					}

				}

				if (direction == 'right') {
					if (phase == 'move') {
						$('.cc.active').css({"transform":"translateX("+ distance * 1 +"px) rotate("+ distance * 0.01 +"deg)"});
					}

					if(distance > 50) {
						$('.cc.active').find('.card .bad').css('color', 'rgba(226, 94, 71, '+ distance * 0.01 +'');
					}

					if(phase == "end" && distance > 100) {
						var current = $('.cc.active'),
							next = current.prevAll('.unknown').first();

						current.animate({transform: 'translateX(580px) rotate(5deg)' }, 700, "easeInOutCubic");
						current.removeClass('known active').addClass('unknown');
						next.addClass('active').removeClass('random');
						next.first().children('.card').css({transform: 'translateZ(0px) rotateX(1deg)' });

					} else if (phase == "cancel" || phase == "end") {
						$('.cc.active').animate({transform: 'translateX(0px)' }, 600, "easeInOutCubic");
						$('.cc.active').find('.card .bad').css('color', 'rgba(226, 94, 71, 0)');
					}

					if($('.cc.unknown').length < 1) {
						$('body').addClass('bravo');
					} else {
						$('body').removeClass('bravo');
					}

				}
			},
			threshold:110,
			maxTimeThreshold:2500,
			minTimeThreshold:10,
			allowPageScroll: false,
			fingers:'all',
		});
	};

	$.fn.shuffle = function() {

	    var allElems = this.get(),
	        getRandom = function(max) {
	            return Math.floor(Math.random() * max);
	        },
	        shuffled = $.map(allElems, function(){
	            var random = getRandom(allElems.length),
	                randEl = $(allElems[random]).clone(true)[0];
	            allElems.splice(random, 1);
	            return randEl;
	       });

	    this.each(function(i){
	        $(this).replaceWith($(shuffled[i]));
	    });

	    return $(shuffled);
	};

})(jQuery);

$(document).on('ready', function(){

	$('.cc').children('.card').css({"transform":"translateZ(-150px) rotateX(1deg)"});
	$('.cc').children('.card').last().css({"transform":"translateZ(0px)"});

	$('body').on('touchmove', function (e) {
        if (!$('.scrollable').has($(e.target)).length) e.preventDefault();
 	});

	var winWidth = $(window).width();

	$('#viewport').swipeCards();

	$(document).on('click','a.shuffle',function(e){
		e.preventDefault();
		$('.random').shuffle();
		$('#viewport').swipeCards();
	});

	$(document).on('click','a.direction',function(e){
		$('body').toggleClass('en-de');
	});


	$('a.all').on('click', function(e){
		e.preventDefault();

		var cards = $('.cc').length,
			delay = 20;

		$('.cc:not(.tutorial)').each(function(indexInArray){
			var thiscc = $(this),
				thiscard = thiscc.children('.card')

			thiscard.css({transform: 'translateZ(-150px) rotateX(1deg)' });
			thiscc.removeClass('known').addClass('unknown').css('z-index', 0);

			setTimeout(function(){
				thiscc.animate({transform: 'translateX(0px)' }, 600, "easeInOutCubic");
			}, indexInArray * delay);
		});

		setTimeout(function(){
			$('.cc:not(.tutorial)').last().addClass('active').children('.card').css({transform: 'translateZ(0px) rotateX(1deg)' });
			$('.cc').addClass('random');
			$('.cc.tutorial, .cc.active').removeClass('random');
		}, (cards * delay) + 700);

	});

	$('a.notknown').on('click', function(e){
		e.preventDefault();

		var cards = $('.cc.unknown').length,
			delay = 20;

		$('.cc.unknown:not(.tutorial)').each(function(indexInArray){
			var thiscc = $(this),
				thiscard = thiscc.children('.card')

			thiscard.css({transform: 'translateZ(-150px) rotateX(1deg)' });
			thiscc.css('z-index', 0);

			setTimeout(function(){
				thiscc.animate({transform: 'translateX(0px)' }, 600, "easeInOutCubic");
			}, indexInArray * delay);
		});

		setTimeout(function(){
			$('.cc.unknown:not(.tutorial)').last().addClass('active').children('.card').css({transform: 'translateZ(0px) rotateX(1deg)' });
			$('.cc').addClass('random');
			$('.cc.tutorial, .cc.active').removeClass('random');
		}, (cards * delay) + 700);

	});

	// $(".cc").swipe( {
	// 	swipeStatus:function(event, phase, direction, distance, duration, fingerCount)
	// 	{
	// 		console.log(direction, phase, distance);

	// 		if (direction == 'left') {
	// 			if (phase == 'move') {
	// 				$(this).css({"transform":"translateX("+ distance * -1 +"px)"});
	// 			}

	// 			if($(this).next('.cc').length > 0 && phase == "end" && distance > 100) {
	// 				$(this).animate({transform: 'translateX(-580px)' }, 700, "easeInOutCubic");
	// 				$(this).next('.cc').animate({transform: 'translateX(0px)' }, 700, "easeInOutCubic");
	// 			} else if( phase == "end" || phase == "cancel") {
	// 				$(this).animate({transform: 'translateX(0px)' }, 600, "easeInOutCubic");
	// 			}

	// 		}

	// 		if (direction == 'right') {
	// 			if (phase == 'move') {
	// 				$(this).css({"transform":"translateX("+ distance * 1 +"px)"});
	// 			}

	// 			if($(this).prev('.cc').length > 0 && phase == "end" && distance > 100) {
	// 				$(this).animate({transform: 'translateX(580px)' }, 700, "easeInOutCubic");
	// 				$(this).prev('.cc').animate({transform: 'translateX(0px)' }, 700, "easeInOutCubic");
	// 			} else if (phase == "cancel" || phase == "end") {
	// 				$(this).animate({transform: 'translateX(0px)' }, 600, "easeInOutCubic");
	// 			}

	// 		}
	// 	},
	// 	threshold:110,
	// 	maxTimeThreshold:2500,
	// 	minTimeThreshold:10,
	// 	allowPageScroll: 'vertical',
	// 	fingers:'all',
	// });



	// $(".navbar li a[href^='#'], a.btn-buy[href^='#']").on('click', function(e) {
 //   		e.preventDefault();
 //   		var scrollto = ($(this.hash).offset().top - 50);
 //   		$('html, body').animate({ scrollTop: scrollto }, 400);

 //   		// edit: Opera requires the "html" elm. animated
	// });


	// $('#submit a.btn').attr('disabled', 'disabled').addClass('pull-right');
	// $('#submit a.btn .default').text('Bestellung aufgeben');

	// $('.btn.process').click(function(){
	// 	var thisbtn = $(this);

	// 	if (thisbtn.hasClass('end')) {
	// 		thisbtn.removeClass('end', 'start');
	// 	} else {
	// 		thisbtn.addClass('start');

	// 		setTimeout(function(){
	// 			thisbtn.addClass('end');
	// 			thisbtn.removeClass('start');
	// 		}, 3000);
	// 	}
	// });
});