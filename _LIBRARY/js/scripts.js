(function ($) {
	// hammer js- touch events
	// https://github.com/eightmedia/hammer.js
	// store all main elements in variables

    $hidden = $('#hidden');
    var status = 0; // 1 ia open, 0 is closed
    status=0;

    var defaultstate = function(){
    	$('ul#thelist>li').find('div').removeClass('iconOn').addClass('iconOff');
    	$('li#homeButton').animate({left:'230px'},100,'linear');
	    $('#right').animate({right:'30px'},200); //put back right
	    $('#left').animate({left:'0'},300,function(){ // slide left background
	       $('#bottomToolTip').animate({bottom:'0px'},100);

        });
        $('#left2').animate({left:'0'},300);
        $('#person').animate({right:'-320px'},300);    
    };
    
    var stopComponentVideos = function(){
	    // blunt function to pause component videos, dirty but gets the job done
    	if ( $(".projekktor").size() == 2 ){
    		projekktor('#player_b').setPause();
    	};
    	if ( $(".projekktor").size() == 3 ){
    		projekktor('#player_b').setPause();
    		projekktor('#player_c').setPause();
    	};
    	if ( $(".projekktor").size() == 4 ){
    		projekktor('#player_b').setPause();
    		projekktor('#player_c').setPause();
    		projekktor('#player_d').setPause();
    	};
    	if ( $(".projekktor").size() == 5 ){
    		projekktor('#player_b').setPause();
    		projekktor('#player_c').setPause();
    		projekktor('#player_d').setPause();
    		projekktor('#player_e').setPause();
    	};
    	if ( $(".projekktor").size() == 6 ){
    		projekktor('#player_b').setPause();
    		projekktor('#player_c').setPause();
    		projekktor('#player_d').setPause();
    		projekktor('#player_e').setPause();
    		projekktor('#player_f').setPause();
    	};
	};

    	
    //left click 
    $('#left2').on('tap swipe', function(){
	    if(status<1) //make sure that swipe is left swipe
	    { 
	    	$('#right').animate({right:'-165px'},200);
		    projekktor('#player_a').setPlay().addListener('done',defaultstate);
		    status=1;
			$('#bottomToolTip').animate({bottom:'-175px'},100);
        } 
        else 
        {
        	projekktor('#player_a').setPause();
	        defaultstate();
	        status=0;
	    };
    });
        
    //right onclick
    $('ul#thelist>li').on('tap', function(){
	    $(this).find('div').removeClass('iconOff').addClass('iconOn');
    	if($(this).attr('id') == 'homeButton'){ 
    		stopComponentVideos();
	        defaultstate();
	        status=0;
	    } else if (status==0) //if at default state
	    { 
	    	projekktor('#player_a').setPause(); //make sure designer video is stopped        	
	        $this = $(this);
	        var divClass = $this.attr('class');       
	        // Show the hidden div. 
	        
	        $("#hidden").find('div').css({'float':'right'});
	        $("div." + divClass).css({'float':'left'});
	        
	        //animate the opening
	        $('li#homeButton').animate({left:0},100,'linear');
	        $('#left').animate({left:'-1024px'},200);
	        $('#left2').animate({left:'-1024px'},200);
	        $('#right').animate({right:'-170px'},200);
	        $('#bottomToolTip').animate({bottom:'-175px'},100);
	        status=5; //set status to know that a component is currently shown
        } 
        else if (status==5) //if a a component is currently shown	    
        { 
        	stopComponentVideos();
        	
        	$('ul#thelist>li').find('div').removeClass('iconOn').addClass('iconOff');
        	$(this).find('div').removeClass('iconOff').addClass('iconOn');
	        $this = $(this);
	        // Which div u trying to show? Look at $this > li > class
	        var divClass = $this.attr('class');       
	        // Show the hidden div.
	        $("#hidden").find('div').css({'float':'right'});
	        $("div." + divClass).css({'float':'left'});
        }    
        else 
        {
	        defaultstate();
	        $('li#homeButton').animate({left:'230px'},100,'linear');
	        status=0;
	    };    
    });
    
  
  // jQuery no-double-tap-zoom plugin
  // https://gist.github.com/2047491
  // Triple-licensed: Public Domain, MIT and WTFPL license - share and enjoy!
  var IS_IOS = /iphone|ipad/i.test(navigator.userAgent);
  $.fn.nodoubletapzoom = function() {
    if (IS_IOS)
      $(this).bind('touchstart', function preventZoom(e) {
        var t2 = e.timeStamp
          , t1 = $(this).data('lastTouch') || t2
          , dt = t2 - t1
          , fingers = e.originalEvent.touches.length;
        $(this).data('lastTouch', t2);
        if (!dt || dt > 500 || fingers > 1) return; // not double-tap

        e.preventDefault(); // double tap - prevent the zoom
        // also synthesize click events we just swallowed up
        $(this).trigger('click').trigger('click');
      });
  };  
  
  var $plugin = jQuery.sub();
    $plugin.fn.animate = function(props, speed, cb){
        if(typeof(speed) == "function")
            cb = speed, speed = 500;
        if(typeof(cb) != "function")
            cb = function(){};
        return $.each(this, function(i, el){
            el = $(el);
            if(props.float && props.float != el.css("float")){
                var elem = el.clone().css(props).insertBefore(el),
                    temp = (props.float == el.css("float")) ? elem.position().left : el.position().left;
                props.marginLeft = elem.position().left;
                elem.remove();
                el.css({float:"left",marginLeft:temp});
            }
            $(this).animate(props, speed, function(){
                $(this).css(props);
                cb();
            });
        });
    };
   
  
}(jQuery));

$('*').nodoubletapzoom(); //disable doubletap zoom on everything

