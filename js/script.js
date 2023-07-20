document.addEventListener('DOMContentLoaded', function(event) {
	var scrollPos = 0;
	var isScrolling = false; 

	function handleScroll() {
	  if (!isScrolling) {
	    window.requestAnimationFrame(function() {
	      var scroll = window.pageYOffset || document.documentElement.scrollTop;
	      var header = document.querySelector('.header');
	      var headerTop = document.querySelector('.header__top');
	      if (scroll > scrollPos) {
	        header.classList.add('scroll');
	        headerTop.style.marginTop = -headerTop.offsetHeight + 'px';
	      } else {
	        header.classList.remove('scroll');
	        headerTop.style.marginTop = 0;
	      }
	      if (scroll > 1) {
	        header.classList.add('show');
	      } else {
	        header.classList.remove('show');
	      }
	      scrollPos = scroll;
	      isScrolling = false; 
	    });
	  }
	  isScrolling = true; 
	}

	handleScroll();
	window.addEventListener('scroll', handleScroll);



	document.querySelector('.header__burger').addEventListener('click', function(event) {
	    var headerBurger = document.querySelector('.header__burger');
	    var menu = document.querySelector('.menu');
	    var body = document.querySelector('body');
	    headerBurger.classList.toggle('active');
	    menu.classList.toggle('active');
	    body.classList.toggle('lock');
	});

	var menuLinks = document.querySelectorAll('.menu__item:not(.has-sublist)');
	menuLinks.forEach(function(link) {
	    link.addEventListener('click', function(event) {
	        var headerBurger = document.querySelector('.header__burger');
	        var menu = document.querySelector('.menu');
	        var body = document.querySelector('body');
	        headerBurger.classList.remove('active');
	        menu.classList.remove('active');
	        body.classList.remove('lock');
	    });
	});
	var menuSublist = document.querySelectorAll('.menu__item.has-sublist p');
	if(menuSublist){
		menuSublist.forEach(function(menuSublist) {
		    menuSublist.addEventListener('click', function(event) {
		    		menuSublist.classList.toggle('active');
		        slideToggle(menuSublist.nextElementSibling);
		    });
		});
	}

	var questionsTop = document.querySelectorAll('.faq__header');
	if(questionsTop){
		questionsTop.forEach(function(questionsTop) {
		    questionsTop.addEventListener('click', function(event) {
		    		questionsTop.classList.toggle('active');
		        slideToggle(questionsTop.nextElementSibling);
		    });
		});		
	}

	function slideToggle(element) {
	  var target = element.style;
	  target.transition = 'all 0.3s ease-in-out';
	  if (target.maxHeight) {
	    target.maxHeight = null;
	    element.classList.remove('active');
	  } else {
	    target.maxHeight = element.scrollHeight + 'px';
	    element.classList.add('active');
	  }
	}

  const nextButton = document.querySelectorAll("[data-tocalc]");
  if(nextButton){
	  nextButton.forEach(function (nextButton) {
	    nextButton.addEventListener("click", function (event) {
	    	event.preventDefault();
	      const target = this.parentNode.parentNode.querySelectorAll("[data-calc].active");
	      for (let j = 0; j < target.length; j++) {
	        target[j].classList.remove("active");
	      }
	      const dataCalc = this.getAttribute("data-tocalc");
	      const dataId = document.querySelector(`[data-calc="${dataCalc}"]`);
	      if (dataId !== null) {
	        dataId.classList.add("active");
	      }
	    });
	  });  	
  }
  const sendButton = document.querySelectorAll("[data-topopup]");
  if(sendButton){
	  sendButton.forEach(function (sendButton) {
	    sendButton.addEventListener("click", function (event) {
	    	event.preventDefault();
			  var startCalc = this.closest(".start__calc");
			  if (startCalc) {
			    var requiredElements = startCalc.querySelectorAll("[required]");
			    var allValid = true;
			    requiredElements.forEach(function(element) {
			      if (!validateElement(element)) {
			        allValid = false;
			      }
			    });
			    if (allValid) {
			    	var body = document.querySelector('body');
			    	if(document.querySelector(".open")){
			    		document.querySelector(".open").classList.remove('open');
			    		body.classList.remove('popuplock');	
			    	}
			      const dataPopup = this.getAttribute("data-topopup");
			      const dataClassPopup = document.querySelector(`${dataPopup}`);
			      if (dataClassPopup !== null) {
			        dataClassPopup.classList.add("open");
			        body.classList.add('popuplock');	
			      }
			    }
			  }else{
			  		var body = document.querySelector('body');
			    	if(document.querySelector(".open")){
			    		document.querySelector(".open").classList.remove('open');
			    		body.classList.remove('popuplock');	
			    	}
		        
			      const dataPopup1 = this.getAttribute("data-topopup");
			      const dataClassPopup1 = document.querySelector(`${dataPopup1}`);
			      if (dataClassPopup1 !== null) {
			        dataClassPopup1.classList.add("open");
			        body.classList.add('popuplock');	
			      }			  	
			  }
	    });
	  });  	
  }

	var popupClose = document.querySelectorAll('.popup__close');
	if(popupClose){
		popupClose.forEach(function(popupClose) {
		    popupClose.addEventListener('click', function(event) {
		    		var body = document.querySelector('body');
		    		body.classList.remove('popuplock');	
		    		popupClose.closest('.popup, .question-popup').classList.remove('open');

		    });
		});		
	}
	function validateElement(element) {
	  var elementType = element.getAttribute("type");
	  var errorMessageElement = element.parentNode.querySelector('.start__errortext'); // Элемент для отображения сообщения об ошибке

	  if (elementType === "text" || elementType === "tel" || element.tagName === "TEXTAREA") {
	    if (element.value.trim() === "") {
	    	
	    	if(!element.closest('.start__calc').querySelector('.start__errortext.show')){
	    		element.classList.add('error');
	    		errorMessageElement.classList.add('show');
	    		element.focus();
		      setTimeout(function() {
		        errorMessageElement.classList.remove('show');
		      }, 1500); 	    		
	    	}	    	
	      return false;
	    }
	  } else if (elementType === "email") {
	    var emailPattern = /^\S+@\S+\.\S+$/;
	    if (!emailPattern.test(element.value)) {
	    	if(!element.closest('.start__calc').querySelector('.start__errortext.show')){
	    		element.classList.add('error');
	    		errorMessageElement.classList.add('show');
	    		element.focus();
		      setTimeout(function() {
		        errorMessageElement.classList.remove('show');
		      }, 1500); 	    		    		
	    	}
	      return false;
	    }
	  } else if (elementType === "checkbox") {
	    if (!element.checked) {
	    	if(!element.closest('.start__calc').querySelector('.start__errortext.show')){
	    		element.classList.add('error');
	    		errorMessageElement.classList.add('show');
	    		element.focus();
		      setTimeout(function() {
		        errorMessageElement.classList.remove('show');
		      }, 1500); 	    		
	    	}	    	
	      return false;
	    }
	  }
	  element.classList.remove('error');
	  errorMessageElement.classList.remove('show');
	  return true;
	}
	const desktopBreakpoint = 992; 
	let swiperInstance;
	function handleSwiperInitialization() {
	  if (window.innerWidth >= desktopBreakpoint) {
	    if (swiperInstance) {
	      swiperInstance.destroy();
	      swiperInstance = null;
	    }
	  } else {
	    if (!swiperInstance) {
	      swiperInstance = new Swiper('.reviews__swiper', {
			      speed: 600,
			      spaceBetween: 14,
			      loop:false,
			      centeredSlides: false,
				    breakpoints: {
				        992: {
				        	slidesPerView: 4,
				        	loop:false,
				        	centeredSlides: false,
				        },
				        800: {
				        		centeredSlides: true,
				        		loop:true,
				            slidesPerView: 2.2,
				        },
				        690: {
				        		centeredSlides: true,
				        		loop:true,
				            slidesPerView: 2.1
				        },
				        0: {
				        		centeredSlides: true,
				        		loop:true,
				            slidesPerView: 1.1,
				        }		        
			    }
	      });
	    }
	  }
	}
	handleSwiperInitialization();
	window.addEventListener('resize', handleSwiperInitialization);

  if(document.querySelector('.blog__swiper')){
      new Swiper('.blog__swiper', {
        speed: 600,
        spaceBetween: 30,
        slidesPerView: 4,
        centeredSlides: false,
			  navigation: {
			    nextEl: '.swiper-button-next',
			    prevEl: '.swiper-button-prev',
			  },
		    breakpoints: {
		        1400: {
		            slidesPerView: 4,
		            centeredSlides: false,
		            loop:false,
		        },
		        1024: {
		            slidesPerView: 3,
		            centeredSlides: false,
		            loop:false,
		        },
		        800: {
		        		centeredSlides: true,
		        		loop:true,
		            slidesPerView: 2.2,
		            spaceBetween: 14,
		        },
		        690: {
		        		centeredSlides: true,
		        		loop:true,
		        		spaceBetween: 14,
		            slidesPerView: 2.1
		        },
		        0: {
		        		centeredSlides: true,
		        		loop:true,
		        		spaceBetween: 14,
		            slidesPerView: 1.1
		        }		        
		    }
      });
   }
   
	var inputMask = document.querySelectorAll("input[type='tel']");
	var maskOptions = {
	  mask: '+{7} (000) 000-00-00'
	};
	if(inputMask){
		inputMask.forEach(function(inputMask) {
		    var mask = IMask(inputMask, maskOptions);
		});		
	}


});

