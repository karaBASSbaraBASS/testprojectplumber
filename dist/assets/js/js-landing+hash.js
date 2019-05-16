$(document).ready(function() {
	
	$('.nav__item-link').on('click', function(event) {
		event.preventDefault();
		
		var
			section = $(this).attr('href');

		showSection(section, true);

	});

	showSection(window.location.hash, false);

});

$(window).scroll(function() {
	
	checkSection();
	
});

// показать секцию
function showSection(section, isAnimate) {
	var
		direction = section.replace(/#/, ''),
		reqSection = $('section').filter('[data-section="' + direction + '"]'),
		reqSectionPos = reqSection.offset().top;

	if (isAnimate) {
		$('body, html').animate({scrollTop: reqSectionPos}, 500);
	} else {
		$('body, html').scrollTop(reqSectionPos);
	}
}

// проверим видна ли секция
function checkSection() { 
	$('section').each(function(){
		var
			$this = $(this),
			topEdge = $this.offset().top - 400, // узнаем верхнюю границу
			bottomEdge = topEdge + $this.height(), // узнаем нижнюю грницу путем добавления к верхней высоты элемента
			wScroll = $(window).scrollTop();

		if (topEdge < wScroll && bottomEdge > wScroll) {
			var 
				currentId = $this.data('section');
				//console.log(currentId);
				reqLink = $('.nav__item-link').filter('[href="#' + currentId + '"]');
				
			reqLink.closest('.nav__item').addClass('active').siblings().removeClass('active');

			window.location.hash = currentId;	
		}

	});
	
}