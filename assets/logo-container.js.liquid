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