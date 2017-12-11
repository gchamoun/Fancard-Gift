$(document).ready(function () {
    $('#method').change(
    function () {
        var method = $('option:selected').val();
       
        if (this.value == "general") {
          
document.getElementById('showTime').classList.add("hidden");

        
        } else if (this.value == "activate") {
            $('#contact').text("Need to activate your card?");
          document.getElementById('showTime').classList.remove("hidden");
                    document.getElementById('activateLink').classList.remove("hidden");
                    document.getElementById('cardbalanceLink').classList.add("hidden");
        }
      else if (this.value == "team") {
            $('#contact').text("Sorry we do not have your team. Let us know below which team you would like to have added to the Fancard Family!");
                    document.getElementById('showTime').classList.remove("hidden");
                    document.getElementById('activateLink').classList.add("hidden");
                    document.getElementById('cardbalanceLink').classList.add("hidden");

        }
      else if (this.value == "check") {
            $('#contact').text("Need to check your card balance?");
                 document.getElementById('showTime').classList.remove("hidden");
                    document.getElementById('activateLink').classList.add("hidden");
                    document.getElementById('cardbalanceLink').classList.remove("hidden");

        }
            else if (this.value == "eta") {
            $('#contact').text("Shipping usally takes around 7-9 days. If you have any other questions regarding your order please let us know below");
                    document.getElementById('showTime').classList.remove("hidden");
                    document.getElementById('activateLink').classList.add("hidden");
                    document.getElementById('cardbalanceLink').classList.add("hidden");

        }
                  else if (this.value == "gen") {
            $('#contact').text("Please fill out your information below and we will happily get back to you");
                    document.getElementById('showTime').classList.remove("hidden");
                    document.getElementById('activateLink').classList.add("hidden");
                    document.getElementById('cardbalanceLink').classList.add("hidden");

        }

    });

});$(function(){
    
    var $cat = $("#category1"),
        $subcat = $("#category2");
    
    $cat.on("change",function(){
        var _rel = $(this).val();
        $subcat.find("option").attr("style","");
        $subcat.val("");
        if(!_rel) return $subcat.prop("disabled",true);
        $subcat.find("[rel="+_rel+"]").show();
        $subcat.prop("disabled",false);
    });
    
});



// Instantiate the Bootstrap carousel
$('.multi-item-carousel').carousel({
  interval: false
});
/*
$('#theCarousel').on('slide.bs.carousel', function(event){
  $('.multi-item-carousel .item').each(function(){
    
});*/

// for every slide in carousel, copy the next slide's item in the slide.
// Do the same for the next, next item
$('.multi-item-carousel .item').each(function(){
  // get the next item in the list
  var next = $(this).next();
  // if there is no next, get the first element
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));
  
  // get the next-after-next item in the list
  if (next.next().length>0) {
    next.next().children(':first-child').clone().appendTo($(this)).addClass('rightest');
  } else {
    // if there is no next-next item, grab the first item in the list
  	$(this).siblings(':first').children(':first-child').clone().appendTo($(this)).addClass('rightest');
  }
});


$(document).ready(function() {  
  $(".multi-item-carousel").swiperight(function() {  
    $(this).carousel('prev');  
  });  
  $(".multi-item-carousel").swipeleft(function() {  
    $(this).carousel('next');  
  });  
});

$.mobile.loading().hide();


$('#carouselHacked').carousel();



menuState = {
  menuOpen: false,
  timer: false
}

$('#hover, #show').on('mouseover', () => {
  clearInterval(menuState.timer)
  if (menuState.menuOpen) { return }
  $('#show').show();
  menuState.menuOpen = true
})

$('#hover, #show').on('mouseout', () => {
  menuState.timer = setTimeout( () => {
    menuState.menuOpen = false
    $('#show').hide()
  }, 300)
})