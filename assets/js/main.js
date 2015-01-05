
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
				if (direction == 'up') {
					if (phase == 'move') {
						if(distance > 10) {
							$('.cc.active').children('.card').css({"transform":"rotateX("+ distance * .5 +"deg)"});
						}
					} else if (phase == "end" || phase == "cancel") {
						if(distance > 100) {
							console.log('rotate')
							$('.cc.active').children('.card').css({"transition": "0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955) all", "transform": "rotateX(180deg)"});
							$('.cc.active').addClass('rotated');
						} else if(distance < 100) {
							console.log('cancel');
							$('.cc.active').children('.card').css({"transition": "0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955) all", "transform": "rotateX(1deg)"});
						}
					}
				} else if (direction == 'down') {
					if (phase == 'move') {
						if(distance > 10) {
							$('.cc.active').children('.card').css({"transform":"rotateX("+ distance * -.8 +"deg)"});
						}
					} else if (phase == "end" || phase == "cancel") {
						if(distance > 100) {
							console.log('rotate')
							$('.cc.active').children('.card').css({"transition": "0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955) all", "transform": "rotateX(1deg)"});
							$('.cc.active').removeClass('rotated');
						} else if(distance < 100) {
							console.log('cancel');
							$('.cc.active').children('.card').css({"transition": "0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955) all", "transform": "rotateX(180deg)"});
						}
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

						current.animate({transform: 'translateX(-780px) rotate(-5deg)' }, 700, "easeInOutCubic");
						current.removeClass('unknown active').addClass('known');
						next.addClass('active').removeClass('random');
						next.children('.card').css({transform: 'translateZ(0px) rotateX(1deg)' });

					} else if( phase == "end" || phase == "cancel") {
						$('.cc.active').animate({transform: 'translateX(0px)' }, 600, "easeInOutCubic");
						$('.cc.active').find('.card .good').css('color', 'rgba(92, 184, 92, 0)');
					}

					if($('.cc.unknown:not(.tutorial)').length < 1) {
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

						current.animate({transform: 'translateX(780px) rotate(5deg)' }, 700, "easeInOutCubic");
						current.removeClass('known active').addClass('unknown');
						next.addClass('active').removeClass('random');
						next.first().children('.card').css({transform: 'translateZ(0px) rotateX(1deg)' });

					} else if (phase == "cancel" || phase == "end") {
						$('.cc.active').animate({transform: 'translateX(0px)' }, 600, "easeInOutCubic");
						$('.cc.active').find('.card .bad').css('color', 'rgba(226, 94, 71, 0)');
					}

					if($('.cc.unknown:not(.tutorial)').length < 1) {
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

	$(document).on('touchend', 'body.choose #all', function(){
		$('.view').each(function(){
			$(this).removeClass('active');
		});
		$('#cards').addClass('active');
	});

	$(document).on('touchend', 'body.edit #all', function(){
		$('.view').each(function(){
			$(this).removeClass('active');
		});
		$('#editall').addClass('active');
	});

	$(document).on('touchend', 'body.edit #new', function(){
		$('.view').each(function(){
			$(this).removeClass('active');
		});
		$('#editcat').addClass('active');
	});

	$('.back').on('touchend', function(){
		$('.view').each(function(){
			$(this).removeClass('active');
		});
		$('#categories').addClass('active');
	});

	$('li.word').on('touchend', function(){
		$(this).toggleClass('active');
	});

	$(document).on('touchend','a.trash',function(e){
		e.preventDefault();
		$('#trash').addClass('show');
		setTimeout(function(){
			$('#trash').addClass('in');
		}, 300);
	});

	$('a.trashing').on('touchend', function(){

		$('#trash').removeClass('in');

		setTimeout(function(){
			$('#trash').removeClass('show');
		}, 700);

		if($(this).hasClass('yes')) {
			$('.view').each(function(){
				$(this).removeClass('active');
			});
			$('#categories').addClass('active');
		}

	});

	$('.cc').children('.card').css({"transform":"translateZ(-150px) rotateX(0deg)"});
	$('.cc').children('.card').last().css({"transform":"translateZ(0px)"});

	$('body').on('touchmove', function (e) {
        if (!$('.scrollable').has($(e.target)).length) e.preventDefault();
 	});

	var winWidth = $(window).width();

	$('#viewport').swipeCards();

	$(document).on('touchend','a.shuffle',function(e){
		e.preventDefault();
		$('.random').shuffle();
		$('#viewport').swipeCards();
		$('#shuffled').addClass('show');
		setTimeout(function(){
			$('#shuffled').addClass('in');
		}, 300);
		setTimeout(function(){
			$('#shuffled').removeClass('in');
		}, 1600);
		setTimeout(function(){
			$('#shuffled').removeClass('in');
			$('#shuffled').removeClass('show');
		}, 2200);
	});

	$(document).on('touchend','a.direction',function(e){
		$('body').toggleClass('en-de');
	});

	$('#tutorial').on('touchend', function(){
		var delay = 20;

		$('.cc.tutorial').each(function(indexInArray){
			var thiscc = $(this),
				thiscard = thiscc.children('.card')

			thiscard.css({transform: 'translateZ(-150px) rotateX(1deg)' });
			thiscc.removeClass('known').addClass('unknown').css('z-index', 0);

			setTimeout(function(){
				thiscc.animate({transform: 'translateX(0px)' }, 600, "easeInOutCubic");
			}, indexInArray * delay);
		});

		$('.cc:not(.tutorial)').each(function(){
			$(this).removeClass('active').children('.card').css({transform: 'translateZ(-150px) rotateX(1deg)' });
		});

		setTimeout(function(){
			$('.cc.tutorial').last().addClass('active').children('.card').css({transform: 'translateZ(0px) rotateX(1deg)' });
			$('.cc').addClass('random');
			$('.cc.tutorial, .cc.active').removeClass('random');
		}, (cards * delay) + 700);
	});

	$('a.all').on('touchend', function(e){
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
		}, (cards * delay) + 300);

	});

	$('a.notknown').on('touchend', function(e){
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
		}, (cards * delay) + 300);

	});

	$('a.star').on('touchend', function(){

		var star = $(this),
			starCard = star.parents('.card'),
			starCardID = starCard.data('id');

		var addItem = function (stars) {
			var oldItems = JSON.parse(localStorage.getItem('stars')) || [];

			var newItem = stars

			oldItems.push(newItem);

			localStorage.setItem('stars', JSON.stringify(oldItems));
		}

		var removeItem = function (stars) {
			var oldItems = JSON.parse(localStorage.getItem('stars')) || [];

			var index = oldItems.indexOf(stars);

			if (index > -1) {
    			oldItems.splice(index, 1);
			}

			console.log(oldItems)

			localStorage.setItem('stars', JSON.stringify(oldItems));
		}

		if(starCard.hasClass('starred')) {
			starCard.removeClass('starred');
			removeItem(starCardID);
		} else {
			starCard.addClass('starred');
			addItem(starCardID);
		}

		console.log(starCardID);
	});

	var retrievedObject = localStorage.getItem('stars');

	if(retrievedObject) {
		var stars = JSON.parse(retrievedObject);

		console.log(stars);

		$.each(stars, function(){
			console.log('#card'+ this +'');
			$('#card'+ this +'').addClass('starred');
		});
	}

	$('#edit').on('touchend', function(){
		$('body').toggleClass('edit');
		$('body').toggleClass('choose');
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



	// $(".navbar li a[href^='#'], a.btn-buy[href^='#']").on('touchend', function(e) {
 //   		e.preventDefault();
 //   		var scrollto = ($(this.hash).offset().top - 50);
 //   		$('html, body').animate({ scrollTop: scrollto }, 400);

 //   		// edit: Opera requires the "html" elm. animated
	// });


	// $('#submit a.btn').attr('disabled', 'disabled').addClass('pull-right');
	// $('#submit a.btn .default').text('Bestellung aufgeben');

	// $('.btn.process').touchend(function(){
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