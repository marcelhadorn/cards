$(document).ready(function(){

	$('body').on('touchmove', function (e) {
        if (!$('.scrollable').has($(e.target)).length) e.preventDefault();
 	});

	var winWidth = $(window).width();

	$(".card").swipe( {
		swipeStatus:function(event, phase, direction, distance, duration, fingerCount)
		{

			if (direction == 'up') {
				if (phase == 'move') {
					$(this).css({"transform":"rotateX("+ distance * 3 +"deg)"});
				}
				if(distance > 100 && phase == "end") {
					$(this).css({"transform":"rotateX(180deg)"});
				} else if(distance < 100 && phase == "end") {
					$(this).css({"transform":"rotateX(0deg)"});
				}
			} else if (direction == 'down') {
				if (phase == 'move') {
					$(this).css({"transform":"rotateX("+ distance * -3 +"deg)"});
				}
				if(distance > 100 && phase == "end") {
					$(this).css({"transform":"rotateX(0deg)"});
				} else if(distance < 100 && phase == "end") {
					$(this).css({"transform":"rotateX(180deg)"});
				}
			}
		},
		threshold:20,
		maxTimeThreshold:2500,
		minTimeThreshold:10,
		allowPageScroll: 'vertical',
		fingers:'all',
	});

	$(".cc").swipe( {
		swipeStatus:function(event, phase, direction, distance, duration, fingerCount)
		{
			console.log(direction, phase, distance);

			if (direction == 'left') {
				if (phase == 'move') {
					$(this).css({"transform":"translateX("+ distance * -1 +"px)"});
				}

				if($(this).next('.cc').length > 0 && phase == "end" && distance > 100) {
					$(this).animate({transform: 'translateX(-580px)' }, 700, "easeInOutCubic");
					$(this).next('.cc').animate({transform: 'translateX(0px)' }, 700, "easeInOutCubic");
				} else if( phase == "end" || phase == "cancel") {
					$(this).animate({transform: 'translateX(0px)' }, 600, "easeInOutCubic");
				}

			}

			if (direction == 'right') {
				if (phase == 'move') {
					$(this).css({"transform":"translateX("+ distance * 1 +"px)"});
				}

				if($(this).prev('.cc').length > 0 && phase == "end" && distance > 100) {
					$(this).animate({transform: 'translateX(580px)' }, 700, "easeInOutCubic");
					$(this).prev('.cc').animate({transform: 'translateX(0px)' }, 700, "easeInOutCubic");
				} else if (phase == "cancel" || phase == "end") {
					$(this).animate({transform: 'translateX(0px)' }, 600, "easeInOutCubic");
				}

			}

			// else if (direction == 'right') {
			// 	var direction = 'prev';
			// 	if (phase == 'move') {
			// 		$(this).css({"-webkit-transform":"translateX("+ distance +"px)"});
			// 		$(this).prev('.cc').css({"-webkit-transform":"translateX("+ (winWidth - distance) * -1 +"px)"});
			// 	}

			// 	if(distance > 100) {
			// 		$(this).css({"-webkit-transform":"translateX("+ winWidth +"px)"});
			// 		$(this).prev('.cc').css({"-webkit-transform":"translateX(0px}"});
			// 	}
			// }

			// if( distance > 80 && phase == 'end' && direction != 'up' ) {
			// 	var ease = 'easeInOutQuad';
			// 	slide(direction, ease);
			// } else if ( distance > 1 && phase == 'cancel') {
			// 	// if no next or prev slide back to current
			// 	view.animate({transform: 'translateX('+ -currentPos +')' }, 300, "easeInOutBack");
			// }
		},
		threshold:110,
		maxTimeThreshold:2500,
		minTimeThreshold:10,
		allowPageScroll: 'vertical',
		fingers:'all',
	});



	$(".navbar li a[href^='#'], a.btn-buy[href^='#']").on('click', function(e) {
   		e.preventDefault();
   		var scrollto = ($(this.hash).offset().top - 50);
   		$('html, body').animate({ scrollTop: scrollto }, 400);

   		// edit: Opera requires the "html" elm. animated
	});


	$('#submit a.btn').attr('disabled', 'disabled').addClass('pull-right');
	$('#submit a.btn .default').text('Bestellung aufgeben');

	$('.btn.process').click(function(){
		var thisbtn = $(this);

		if (thisbtn.hasClass('end')) {
			thisbtn.removeClass('end', 'start');
		} else {
			thisbtn.addClass('start');

			setTimeout(function(){
				thisbtn.addClass('end');
				thisbtn.removeClass('start');
			}, 3000);
		}
	});
});
