/*jshint -W087 */
if ((typeof theme) === 'undefined') { theme = {}; }
var html = $('html');
var body = $('body');
var winWidth = $(window).width(); 
var winHeight = $(window).height(); 
theme.mobileBrkp = 768; 
theme.tabletBrkp = 981;

theme.homeMaps = function() {
    mapInit = function(mapId,mapSection,mapAddress,mapStyle,mapPin) {
        var geocoder;
        var map;

        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(1, 1);
        var myOptions = {
            zoom: 14,
            center: latlng,
            disableDefaultUI: true,
            scrollwheel: false,
            keyboardShortcuts: false,
            styles: mapStyles[mapStyle]
        };
        map = new google.maps.Map(document.getElementById(mapId), myOptions);

        if (geocoder) {
            geocoder.geocode( { 'address': mapAddress}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                        map.setCenter(results[0].geometry.location);

                        var marker = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map,
                            icon: window[mapPin]
                        });

                    }
                }
            });
        }
    };

    function eachMapInit() {
        $('.js-map-ids').each(function() {
            var thisMapId = $(this).data('map-id');
            theme.runMap(thisMapId);
        });
    }

    theme.runMap = function(map) {
        var thisMap = $('#' + map);

        var mapId = thisMap.data('map-id');
        var mapSection = thisMap.data('map-section');
        var mapAddress = thisMap.data('map-address');
        var mapStyle = thisMap.data('map-style');
        var mapPin = thisMap.data('map-pin');

        mapInit(mapId,mapSection,mapAddress,mapStyle,mapPin);
    };

    //home map accordion
    function mapTrigger() {
        var item = $('.js-map-info');
        var trigger = $('.js-map-trigger');
        var items = item.hide(); //hide all items
        var activeClass = 'js-active';

        //show and acivate first item in each map
        $('.js-map').each(function(i) {
            $(this).find(item).first().addClass(activeClass).show();
            $(this).find(trigger).first().addClass(activeClass);
        });
    
        trigger.click(function() {
            var thisItem = $(this).attr('href');
            var theseItems = $(thisItem).parents('.js-map').find('.js-map-info');

            //check if info is not active
            if(!$(thisItem).hasClass(activeClass)){
                theseItems.removeClass(activeClass).slideUp();
                $(thisItem).addClass(activeClass).slideDown();
            }

            //map canvas functions
            $(this).parents('.js-map').find('.js-map-media').removeClass(activeClass);//hide all within section
            $('.js-map-media[data-map-id="'+thisItem+'"]').addClass(activeClass);//show active

            //run current map function if it's hidden within tab
            if ($(thisItem).find('.home-map__media-canvas').length) {
                var thisMapId = $(thisItem).find('.home-map__media-canvas').attr('id');

                if (typeof thisMapId != 'undefined') {
                    theme.runMap(thisMapId);
                }
            }

            //check if info is not active
            if(!$(this).hasClass(activeClass)){
                trigger.removeClass(activeClass);
                $(this).addClass(activeClass);
            }

            return false;
        });   
    }
    mapTrigger();

    if ($('.js-map').length > 0) {
        if (typeof window.google === 'undefined') { 
            //get google key or set empty var
            var google_key;
            if (typeof theme.map.key !== 'undefined') {
                google_key = theme.map.key;
            } else {
                google_key = '';
            }

            $.getScript('https://maps.googleapis.com/maps/api/js?key=' + google_key).then(function() {
                //set SVG map pins
                mapPinDark = {
                    path: 'M50,9.799c-15.188,0-27.499,12.312-27.499,27.499S50,90.201,50,90.201s27.499-37.715,27.499-52.902S65.188,9.799,50,9.799z   M50,44.813c-4.15,0-7.515-3.365-7.515-7.515S45.85,29.784,50,29.784s7.514,3.365,7.514,7.515S54.15,44.813,50,44.813z',
                    fillColor: '#000000',
                    anchor: new google.maps.Point(55,85),
                    fillOpacity: 1,
                    scale: 0.6,
                    strokeWeight: 0
                };
                mapPinLight = {
                    path: 'M50,9.799c-15.188,0-27.499,12.312-27.499,27.499S50,90.201,50,90.201s27.499-37.715,27.499-52.902S65.188,9.799,50,9.799z   M50,44.813c-4.15,0-7.515-3.365-7.515-7.515S45.85,29.784,50,29.784s7.514,3.365,7.514,7.515S54.15,44.813,50,44.813z',
                    fillColor: '#ffffff',
                    anchor: new google.maps.Point(55,85),
                    fillOpacity: 1,
                    scale: 0.6,
                    strokeWeight: 0
                };
                mapStyles = {
                    light: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}],
                    dark: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.country","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":"-100"},{"lightness":"30"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"},{"gamma":"0.00"},{"lightness":"74"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"lightness":"3"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}],
                    flat: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6195a0"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":"0"},{"saturation":"0"},{"color":"#f5f5f2"},{"gamma":"1"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"lightness":"-3"},{"gamma":"1.00"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#bae5ce"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#fac9a9"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.station.airport","elementType":"labels.icon","stylers":[{"hue":"#0a00ff"},{"saturation":"-77"},{"gamma":"0.57"},{"lightness":"0"}]},{"featureType":"transit.station.rail","elementType":"labels.text.fill","stylers":[{"color":"#43321e"}]},{"featureType":"transit.station.rail","elementType":"labels.icon","stylers":[{"hue":"#ff6c00"},{"lightness":"4"},{"gamma":"0.75"},{"saturation":"-68"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c7eced"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":"-49"},{"saturation":"-53"},{"gamma":"0.79"}]}],
                    clean_cut: [{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#C6E2FF"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#C5E3BF"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#D1D1B8"}]}],
                    minimal_dark: [{"featureType":"all","elementType":"all","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":-30}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#353535"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#656565"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#505050"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"color":"#808080"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#454545"}]},{"featureType":"transit","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":100},{"lightness":-40},{"invert_lightness":true},{"gamma":1.5}]}],
                    blue_water: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
                };
                eachMapInit();
            });
        } else {
            eachMapInit();
        }
    }
};

theme.layoutSlider = function (slider) {
    $(window).resize(function() {
        //get sizes 
        winWidth = $(window).width(); 
        var thisSlider = $(slider);

        if (winWidth < theme.mobileBrkp) {
            thisSlider.not('.slick-initialized').slick({
                slidesToShow: 1,
                infinite: false,
                dots: true,
                arrows: false,
                centerMode: true,
                centerPadding: '30px'
            });
        } else {
            //check if slick is initiated
            if (thisSlider.hasClass('slick-initialized')) {
                //detach slick
                thisSlider.slick('unslick');
            }
        }
    }).resize();
};

theme.productSelect = function(sectionId, cssClass, historyState) {
    var productObj = JSON.parse(document.getElementById('ProductJson-' + sectionId).innerHTML);
    var sectionClass = cssClass;

    var selectCallback = function(variant, selector) {
        var productId = productObj.id;
        sectionClass = sectionClass;

        //Price functions
        if (variant) {
            // Selected a valid variant that is available.
            if (variant.available) {
                // Enabling add to cart button.
                $('.js-product-'+productId+' .js-product-add').removeClass('disabled').addClass('c-btn--plus').prop('disabled', false).find('.js-product-add-text').text(theme.t.add_to_cart);

                // Compare at price
                if ( variant.compare_at_price > variant.price ) {
//                     $('.js-product-'+productId+' .js-product-price-number').html('<span class="product-'+ sectionClass +'__price-number product-'+ sectionClass +'__price-number--sale"><span class="money">' + Shopify.formatMoney(variant.price, theme.money_format) + '</span></span>');
//                     $('.js-product-'+productId+' .js-product-price-compare').html('<s class="product-'+ sectionClass +'__price-compare"><span class="money">' + Shopify.formatMoney(variant.compare_at_price, theme.money_format) + '</span></s>');
//                                     $('.js-product-'+productId+' .js-product-price-number').html('<span class="product-'+ sectionClass +'__price-number product-'+ sectionClass +'__price-number--sale"><span class="money">' + Shopify.formatMoney(variant.compare_at_price, theme.money_format) + '</span></span>');

                
                } else {

                  

                    $('.js-product-'+productId+' .js-product-price-number').html('<span class="product-'+ sectionClass +'__price-number"><span class="product-fees money">' +  "Purchase Fee   " + Shopify.formatMoney(variant.compare_at_price, theme.money_format) + "  </br>Shipping: $0</br>  Total Cost:    " + Shopify.formatMoney(variant.price, theme.money_format) + '</span></span>');
                    
                  $('.js-product-'+productId+' .js-product-price-compare').html('<span class="product-'+ sectionClass +'__price-number"><span class="money">' + Shopify.formatMoney(variant.compare_at_price, theme.money_format) + 't' + '</span></span>');
                } 
              
              
              
              
              
              
              
              
              
              
              
              
              
            } else {
                // Variant is sold out.
                $('.js-product-'+productId+' .js-product-add').addClass('disabled').removeClass('c-btn--plus').prop('disabled', true).find('.js-product-add-text').text(theme.t.sold_out);
                // Compare at price
                if ( variant.compare_at_price > variant.price ) {
                    $('.js-product-'+productId+' .js-product-price-number').html('<span class="product-'+ sectionClass +'__price-number product-'+ sectionClass +'__price-number--sale"><span class="product-fees-total money">' + Shopify.formatMoney(variant.price, theme.money_format) + '</span></span>');
                    $('.js-product-'+productId+' .js-product-price-compare').html('<s class="product-'+ sectionClass +'__price-compare"><span class="product-fees money">' + Shopify.formatMoney(variant.compare_at_price, theme.money_format) + '</span></s>');
                } else {
                    $('.js-product-'+productId+' .js-product-price-number').html('<span class="product-'+ sectionClass +'__price-number"><span class="product-fees-total money">' + Shopify.formatMoney(variant.price, theme.money_format) + '</span></span>');
                    $('.js-product-'+productId+' .js-product-price-compare').empty();
                } 
            }
        } else {
            // variant doesn't exist.
            $('.js-product-'+productId+' .js-product-price-number').empty();
            $('.js-product-'+productId+' .js-product-price-compare').empty();
            $('.js-product-'+productId+' .js-product-add').addClass('disabled').prop('disabled', true).find('.js-product-add-text').text(theme.t.unavailable);
        }

        //slider functions
        var thisSlider = $('.js-product-'+productId+' .js-product-slider');
        function checkSlick(slideToGo) {
            //move slider to variant after slick is init
            var interval = setInterval(function() {
                if (thisSlider.hasClass('slick-initialized')) {
                    thisSlider.slick('slickGoTo', slideToGo);
                    clearInterval(interval);
                } 
            }, 100);
        }
        if ($('.js-product-'+productId+' .product-'+ sectionClass +'__photo__item[data-variant-id*='+ variant.id +']').length > 0) {
            var variantSlide = $('.js-product-'+productId+' .product-'+ sectionClass +'__photo__item[data-variant-id*='+ variant.id +']').attr('data-slide-id');
            checkSlick(variantSlide);
        } else {
            checkSlick(0);
        }

        //currency convert
        if (typeof Currency != 'undefined' & (typeof Cookies != "undefined")) {
            Currency.convertAll(shopCurrency, jQuery('#currencies span.selected').attr('data-currency'));
        }
    };

    //check if product selected
    if (productObj.onboarding !== true) {
        new Shopify.OptionSelectors('productSelect-' + sectionId, {
            product: productObj,
            onVariantSelected: selectCallback,
            enableHistoryState: historyState
        });

        if (productObj.options.length == 1 && productObj.options[0] != 'Title') {
            // Add label if only one product option and it isn't 'Title'. Could be 'Size'.
            $('.js-product-'+ productObj.id +' .selector-wrapper:eq(0)').prepend('<label for="productSelect-option-0">'+ productObj.options[0] +'</label>');
        }
        if (productObj.variants.length == 1 && productObj.variants[0].title.indexOf('Default') > -1) {
            // Hide selectors if we only have 1 variant and its title contains 'Default'.
            $('.js-product-'+ productObj.id +' .selector-wrapper').hide();
        }
    }
};

theme.eventFeed = function (apiKey, templateId, anchorId, sectionId) {
    var url = 'https://www.eventbriteapi.com/v3/users/me/owned_events/?token='+ apiKey +'&expand=venue&status=live';

    $.getJSON(url, function(data) {
        var template = $(templateId).html();
        var compile = Handlebars.compile(template)(data);

        //compile and append tempalte with data
        $(anchorId).append(compile);
        //slider dunction
        theme.layoutSlider('.js-layout-slider-'+sectionId);
    });
    //format time helper
    Handlebars.registerHelper('formatDate', function(date) {
        return moment(date).format('ddd, DD MMM, HH:mm');
    });
    //limit loop helper
    Handlebars.registerHelper('each_upto', function(ary, max, options) {
        if(!ary || ary.length === 0)
            return options.inverse(this);
        var result = [ ];
        for(var i = 0; i < max && i < ary.length; ++i)
            result.push(options.fn(ary[i]));
        return result.join('');
    });
};


//home carousel functions & video backgound
theme.homeMainCarousel = function () {
    var carousels = $('.js-home-carousel');
    var currWinWidth = $(window).width(); 

    var mobileCond = html.hasClass('no-touch') & currWinWidth >= theme.mobileBrkp;

    //slick carousel functions and init
    carousels.each(function() {

        var carousel = $(this); 

        carousel.on('init', function(event){
            //check if this carousel has videos
            if ($(this).find('.js-home-carousel-video').length) {
                if (mobileCond) {
                    var thisCarousel = $(this);
                    //check if youtube API is loaded
                    if (typeof YT === 'undefined') {
                        // insert youtube iframe API
                        $.getScript('https://www.youtube.com/iframe_api')
                            //after loaded
                            .done(function() {
                                var interval = setInterval(function() {
                                    //check if YT is function and loop if not
                                    if ($.isFunction(YT.Player)) {
                                        loadVideos(thisCarousel);
                                        clearInterval(interval);
                                    } 
                                }, 100);
                            });
                    } else {
                        loadVideos(thisCarousel);
                    }
                }
            }
        });

        carousel.on('afterChange', function(event, slick){
            if (mobileCond) {
                if ($(this).find('.js-home-carousel-video').length) {
                    if ($(this).find('.slick-active .js-home-carousel-video').length) {
                        var dataPlayerId = $(this).find('.slick-active .js-home-carousel-video-data').attr('data-player-id');
                        
                        if (window[dataPlayerId].B) {//check if element is ready
                            window[dataPlayerId].playVideo();
                        } else {
                            setTimeout(function(){
                                window[dataPlayerId].playVideo();
                            }, 1000);
                        }

                        var thisVideo = $(this).find('.slick-active .js-home-carousel-video');
                        //ading timeout so video cover waits for youtube to initiate loading
                        setTimeout(function(){
                            thisVideo.addClass('js-loaded');
                        }, 800);
                    }
                }
            }
        });

        carousel.not('.slick-initialized').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            fade: true,
            cssEase: 'linear',
            prevArrow: '<div class="home-carousel__nav home-carousel__nav--prev"><i class="icon icon--left-t"></i></div>',
            nextArrow: '<div class="home-carousel__nav home-carousel__nav--next"><i class="icon icon--right-t"></i></div>'
        }); 
    });


    function loadVideos(thisCarousel) {
        var players = $(thisCarousel).find('.js-home-carousel-video-data');

        function onReadyVideo(event) {
            event.target.mute();
            theme.videoSize(event.target.a);

            //check if this slide is active and play video if so
            if ($(event.target.a).parents('.slick-slide').hasClass('slick-active')) {
                event.target.playVideo();
                //ading timeout so video cover waits for youtube to start playing
                setTimeout(function(){
                    $(event.target.a).parent().addClass('js-loaded');
                }, 800);
            }
        }

        function onChangeVideo(event) {
            if (event.data === YT.PlayerState.ENDED) {//when video ends - repeat
                event.target.playVideo(); 
            }
        }

        for (var i = 0; i < players.length; i++) {
            window[players[i].getAttribute('data-player-id')] = new YT.Player(players[i], {
                videoId: players[i].getAttribute('data-video-id'),
                playerVars: {
                    iv_load_policy: 3,
                    modestbranding: 1,
                    autoplay: 0,
                    controls: 0,
                    showinfo: 0,
                    wmode: 'opaque',
                    branding: 0,
                    autohide: 0,
                    rel: 0
                },
                events: {
                    onReady: onReadyVideo,
                    onStateChange: onChangeVideo
                }
            });
        }
    }

    //recalcluate all iframe sizes on browser resize
    var videoResizeTimer;
    $(window).resize(function() {

        winWidth = $(window).width(); 
        if (winWidth >= theme.mobileBrkp) {

            clearTimeout(videoResizeTimer);
            videoResizeTimer = setTimeout (function () {
                theme.videoSize($('.js-home-carousel-video-data'));
            }, 500);
        }
    });
};

theme.videoSize = function (video) {    
    //set elems
    var iframe = $(video);

    //find video size
    var origHeight = iframe.attr('height');
    var origWidth = iframe.attr('width');

    //find element width and caclulate new height
    var parentHeigt = iframe.parent().height();
    var parentWidth = iframe.parent().width();

    //calc height and width based on original ratio
    var newHeight = parentWidth / origWidth * origHeight;
    var newWidth = parentHeigt / origHeight * origWidth;

    //check if video ratio fits with carousel container and add css settings
    if (parentHeigt < newHeight) {
        iframe.css({
            'width': parentWidth + 'px', 
            'height': newHeight + 'px',
            'top': (parentHeigt - newHeight) / 2 + 'px',
            'left': 0
        });
    } else {
        iframe.css({
            'width': newWidth + 'px', 
            'height': parentHeigt + 'px',
            'left': (parentWidth - newWidth) / 2 + 'px',
            'top': 0
        });
    }
};

//home video gallery
theme.homeVideoGallery = function () {
    function vimeoThumbs() {
        //iteration for all thumbs while waiting for ajax to complete
        var i = 0;
        function next() {
            if (i < $('.js-vimeo-thumb').length) {
                
                thisThumb = $('.js-vimeo-thumb')[i];
                var vimeoID = $(thisThumb).attr('data-vimeo-id');

                $.ajax({
                    url: 'https://vimeo.com/api/v2/video/' + vimeoID + '.json',   
                    dataType: 'json',
                    complete: function (data) {
                        $(thisThumb).css('background-image', 'url(' + data.responseJSON[0].thumbnail_medium + ')');

                        i++;
                        next();                            
                    }
                });
            }
        }
        // kick off the first thumb iteration
        next();

        //placeholder thumb
        if ($('.js-vimeo-placeholder').length > 0) {
            var vimeoID = $('.js-vimeo-placeholder').attr('data-vimeo-id');

            $.ajax({
                url: 'https://vimeo.com/api/v2/video/' + vimeoID + '.json',   
                dataType: 'json',
                success: function (data) {
                    var img = data[0].thumbnail_large;
                    var newImg = img.replace('640','1280');
                    $('.js-vimeo-placeholder').css('background-image', 'url(' + newImg + ')');
                }
            });
        }
    }
    vimeoThumbs();//run

    //init video controls plugin        
    $('.js-home-video iframe').video();

    //placeholder click
    $('.js-home-video-placeholder-trigger').click(function() {
        var triggerTarget = $(this).attr('href');

        //pause all videos if playing
        $('.js-home-video iframe').pauseVideo();

        //hide placeholder
        $(this).parent('.js-home-video-placeholder').addClass('js-hidden');
        //start video
        $(triggerTarget).find('iframe').playVideo();
            
        return false;
    });

    //thumbs click 
    $('.js-home-video-trigger').click(function() {
        var triggerTarget = $(this).attr('href');
        var sectionPlaceholder = $(this).parents('.home-video').find('.js-home-video-placeholder');

        //pause all videos
        $('.js-home-video iframe').pauseVideo();

        //pause on second click and play function
        if ($(this).parent().hasClass('js-paused')) {
            $(triggerTarget).find('iframe').playVideo();
            $(this).parent().removeClass('js-paused'); 
        } else if ($(this).parent().hasClass('js-active')) {
            $(this).parent().addClass('js-paused');
        } else {
            $(triggerTarget).find('iframe').playVideo();
        }

        //remove and add active class
        $(this).parents('.home-video').find('.js-home-video').removeClass('js-active');
        $(triggerTarget).addClass('js-active');

        //set correct thumb to active
        $('.js-home-video-trigger').parent().removeClass('js-active');
        $('.js-home-video-trigger').parent().removeClass('js-init');
        $(this).parent().addClass('js-active');

        //hide placeholder 
        sectionPlaceholder.addClass('js-hidden');
        
        return false;
    });
};

theme.masonryLayout = function () {
    // Masonry layout init
    // Loading images
    $('.o-layout--masonry').imagesLoaded()
        .always( function( instance ) {
            $('.o-layout--masonry').masonry({
                itemSelector: '.o-layout__item',
                transitionDuration: 0
            });
        })
        // Run masonry while loading images
        .progress( function( instance, image ) {
            $('.o-layout--masonry').masonry({
                itemSelector: '.o-layout__item',
                transitionDuration: 0
            });
        });
};

theme.thumbsCarousel = function () {
    $('.js-section__product-single .js-product-slider').not('.slick-initialized').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        fade: false,
        adaptiveHeight: true,
        speed: 300,
        cssEase: 'ease',
        lazyLoad: 'progressive',
        prevArrow: '<div class="product-single__photo__nav product-single__photo__nav--prev"><i class="icon icon--left-l"></i></div>',
        nextArrow: '<div class="product-single__photo__nav product-single__photo__nav--next"><i class="icon icon--right-l"></i></div>',
        customPaging: function (slider, i) {
            return '<button><div class="product-single__photos-thumbs__item">' + $('.js-product-single-thumbs div:nth-child(' + (i + 1) + ')').html() + '</div></button>';
        }
    })
    //calc height for single product 50/50 view slideshow
    .on('setPosition', function(event, slick) {

        if ($('.js-product-bg').hasClass('js-product-bg--full')) {
            heightFraction = 1;
        } else {
            heightFraction = 0.6;
        }

        var thumbsHeight = $('.js-product-slider').find('.slick-dots').height();
        var photoHeight = $('.js-product-slider').find('.slick-list').height();
        var titleHeight = $('.js-product-title').outerHeight(true);

        $('.js-product-bg').css('height', photoHeight * heightFraction + titleHeight + thumbsHeight + 69 + 'px');
        
        //repeat to make sure it worked fine in TE
        setTimeout (function () {
            var thumbsHeight = $('.js-product-slider').find('.slick-dots').height();
            var photoHeight = $('.js-product-slider').find('.slick-list').height();
            var titleHeight = $('.js-product-title').outerHeight(true);

            $('.js-product-bg').css('height', photoHeight * heightFraction + titleHeight + thumbsHeight + 69 + 'px');
        }, 1000);
    });
};

theme.scrollToFixed = function () {
    //calculate product box top offset
    if ($('.js-header').hasClass('js-header-sticky')) {
        prodBoxMargin = 112;
    } else {
        prodBoxMargin = 12;
    }

    //sticky product box
    if (html.hasClass('no-touch') || winWidth < theme.tabletBrkp) {
        $('.js-product-single-box').scrollToFixed({ 
            marginTop: prodBoxMargin, 
            zIndex: 10,
            limit: function() {
                var limit = $('.js-product-single').height() + 
                            $('.js-product-single').offset().top - 
                            $('.js-product-single-box').outerHeight() - 
                            15;//adjusting limit for reviews box border
                return limit;
            }
        });
    }

    //sticky header
    $('.js-header-sticky').scrollToFixed({ 
        zIndex: 11
    });
    //sticky hearder border trigger
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 80) {
            $('.js-header-sticky').addClass('js-header-sticky--border');
        } else {
            $('.js-header-sticky').removeClass('js-header-sticky--border');
        }
    });

    //detach scrollToFixed responsively if touch or mobile
    $(window).resize(function() {
        winWidth = $(window).width(); 
        if (winWidth < theme.tabletBrkp) {
            $('.js-product-single-box').trigger('detach.ScrollToFixed');  
        }
    }).resize();
};

theme.productAccordion = function () {
    var item = $('.js-accordion-info');
    var trigger = $('.js-accordion-trigger');
    var reviewAccordion = $('.js-review-accordion');
    var items = item.hide(); //hide all items
    var activeClass = 'js-active';

    trigger.click(function() {
        var thisItem = $(this).attr('href');

        //recalculate single product fixed box position on accordion changes
        //added delay to wait for accordion to finish animating
        setTimeout (function () {
            $('.js-product-single-box').trigger('resize');
        }, 400);

        //review stars scroll and open
        if ($(this).hasClass('js-review-scroll')) {
            //check if sticky header and set correct offset
            if ($('.js-header').hasClass('js-header-sticky')) {
                scrollOffset = 118;
            } else {
                scrollOffset = 18;
            }

            //scroll
            $('body').animate({
                scrollTop: reviewAccordion.offset().top - scrollOffset
            }, 800);

            //open accordion
            $(thisItem).addClass(activeClass).stop().slideDown();
            reviewAccordion.addClass(activeClass);

            return false;
        }

        //check if clicked is active
        if($(thisItem).hasClass(activeClass)){
            //close current item
            $(this).removeClass(activeClass);
            $(thisItem).removeClass(activeClass).stop().slideUp();
        } else {
            //open and activate this item 
            $(thisItem).addClass(activeClass).stop().slideDown();
            $(this).addClass(activeClass);
        }

        return false;
    });   
};

//currency popup toggle and text change
theme.currencyToggle = function () {
    var box = $('.js-currency-box');
    var trigger = $('.js-currency-trigger');
    var triggerText = $('.js-currency-trigger-text');
    var currentCurrency = $('.js-currency-item.selected').attr('data-currency');
    var activeClass = 'js-active';

    triggerText.text(currentCurrency);

    $('.js-currency-item').click(function() {
        triggerText.text($(this).attr('data-currency'));

        box.removeClass(activeClass);
        trigger.removeClass(activeClass);
    });

    trigger.click(function() {
        box.toggleClass(activeClass);
        $(this).toggleClass(activeClass);

        return false;
    });  

    //click outside elem to hide functions
    $(document).click(function (e) {
        if (!box.is(e.target) && box.has(e.target).length === 0){
            box.removeClass(activeClass);
            trigger.removeClass(activeClass);
        }
    });  
};

//header nav functions
theme.headerNav = function() {
    var link = $('.js-header-sub-link');
    var tLink = $('.js-header-sub-t-link');
    var activeClass = 'js-active';

    var headerNavs = $('.js-heaver-navs');
    var mobileDraw = $('.js-mobile-draw-icon');
    var cartDraw = $('.js-cart-draw-icon');
    var primaryNav = $('.js-primary-nav');
    var secondaryNav = $('.js-secondary-nav');
    var logoImg = $('.js-main-logo');

    //nav accessibility for keyboard
    link.focusin(function(){
        $(this).addClass(activeClass);
    }).focusout(function(){
        link.removeClass(activeClass);
    });
    tLink.focusin(function(){
        tLink.removeClass(activeClass);
        $(this).addClass(activeClass);
    });

    //disabled link 
    $('.touch .js-header-sub-link-a, .touch .js-header-sub-t-a').click(function(e) {
        e.preventDefault();
    });

    //responsive events
    $(window).resize(function() {
        //get sizes 
        winWidth = $(window).width(); 
        var navsWidth = headerNavs.width();
        var primaryWidth = primaryNav.width();
        var secondaryWidth = secondaryNav.width();
        var logoWidth = logoImg.width();
        //calculate available space for primary nav
        var navSpace = (navsWidth / 2) - (logoImg.width() / 2);

        if (winWidth >= theme.mobileBrkp) {
            if (!$('.js-header').hasClass('header--center')) {
                if (navSpace < primaryWidth || navSpace < secondaryWidth) {
                    mobileDraw.show();
                    cartDraw.show();
                    primaryNav.hide();
                    secondaryNav.hide();
                } else {
                    mobileDraw.hide();
                    cartDraw.hide();
                    primaryNav.show();
                    secondaryNav.show();
                }
            } else {
                mobileDraw.hide();
                cartDraw.hide();    
            }
        } else {
            mobileDraw.show();
            cartDraw.show();
        }
    }).resize();
};

theme.homeInstagramFeed = function () {
    var instaFeed = $('.js-home-insta');

    instaFeed.each(function(i) {
        var thisToken = $(instaFeed[i]).attr('data-insta-token');
        var thisUserId = thisToken.split('.')[0];
        var thisFeedCount = $(instaFeed[i]).attr('data-insta-count');

        function successFunc(data) {
            constructFeed(data, this.indexValue);

            function constructFeed(data, feedCount) {
                var thisFeed = $('.js-home-insta')[feedCount];
                var thisList = $(thisFeed).find('.js-home-insta-list');
                var feed = data.data;
                var userName = data.data[0].user.username;

                //set URL to user account
                $(thisFeed).parent('.js-home-insta-link').attr('href', 'https://www.instagram.com/'+ userName);

                //empty list element so when editing inside sections images don't get doubled
                $(thisList).empty();

                //ceate images in list element
                for (var i = 0; i < thisFeedCount; i++) {
                    var image = feed[i].images.standard_resolution.url;
                    $(thisList).append('<div class="home-insta__item"><div class="o-ratio"><div class="o-ratio__content"><div style="background-image:url('+ image +')" class="home-insta__img"></div></div></div>');
                }
            }
        }
        //check token is entered
        if (thisToken !== '') {
            //get feed via ajax
            $.ajax({
                url: 'https://api.instagram.com/v1/users/'+ thisUserId +'/media/recent/?count='+ thisFeedCount +'&access_token=' + thisToken,
                dataType: 'jsonp',
                crossDomain: true,
                indexValue: i,
                success: successFunc 
            });
        }

    });
};

//home single product carousel 
theme.homeFeaturedProduct = function () {
    $('.js-section__home-product .js-product-slider').not('.slick-initialized').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        fade: false,
        adaptiveHeight: true,
        prevArrow: '<div class="product-featured__photo__nav product-featured__photo__nav--prev"><i class="icon icon--left"></i></div>',
        nextArrow: '<div class="product-featured__photo__nav product-featured__photo__nav--next"><i class="icon icon--right"></i></div>'
    });
};

//toggle active class on traget div
theme.triggerActive = function () {
    var $target = $('.js-toggle-target');
    var trigger = $('.js-toggle-trigger');
    var activeClass = 'js-active';

    trigger.click(function(e) { 
        var thisTarget = $(this).attr('href');
        if ($(this).hasClass(activeClass)) {
            $(this).removeClass(activeClass);
            $(thisTarget).removeClass(activeClass);
        } else {
            $(this).addClass(activeClass);
            $(thisTarget).addClass(activeClass);
        }
        e.preventDefault();
    });
};

//select dropdown styling
theme.selectWrapper = function () {
    //add to each select so label can sit next to it
    //no js-... classes this time
    $('.selector-wrapper').each(function(i) {
        var labelWidth = $(this).find('label').width();
        $(this).find('select').css('padding-left', 20 + labelWidth);
    });
};

//check if two sections in row have backgrounds and if so collapse margin
theme.homeSectionMargin = function () {
    $('.shopify-section').each(function() {
        var thisSection = $(this).find('.section');
        
        //remove style attr for theme editor to display correctly without refresh
        thisSection.removeAttr('style');
        if (thisSection.hasClass('section--has-bg') && $(this).next().find('.section').is('.section--full-bg.section--has-bg')) {
            thisSection.css('margin-bottom', '0');
        }
    });  
};

//age checker popup
theme.ageCheckerCookie = function () {
    var ageCookie = 'age-checked';

    if ($('.js-age-draw').data('age-check-enabled')) {
        if (typeof Cookies != 'undefined') {
            if (Cookies(ageCookie) !== '1') {
                theme.mfpOpen('age');
            }
        }
    }

    $('.js-age-close').click(function(e) {
        Cookies(ageCookie, '1', { expires: 14, path: '/' });
        $.magnificPopup.close();

        e.preventDefault();
    });
};
//promo popup
theme.promoPopCookie = function () {
    var promoCookie = 'promo-showed';
    var promoDelay = $('.js-promo-pop').data('promo-delay');
    var promoExpiry = $('.js-promo-pop').data('promo-expiry');

    if ($('.js-promo-pop').data('promo-enabled')) {
        if (typeof Cookies != 'undefined') {
            if (Cookies(promoCookie) !== '1') {    
                setTimeout(function(){
                    theme.promoPop('open');
                }, promoDelay);
            }
        }
    }

    $('.js-promo-pop-close').click(function(e) {
        Cookies(promoCookie, '1', { expires: promoExpiry, path: '/' });
        theme.promoPop('close');

        e.preventDefault();
    });
};

theme.footerTweet = function () {
    //set vars
    var twtEnable = $('.js-footer-tweet').data('footer-tweet-enable');

    if (twtEnable) {
        var twtUsername = $('.js-footer-tweet').data('footer-tweet-user').substring(1);
        
        //load twitter widgets JS
        window.twttr = (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],
                t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);

            t._e = [];
            t.ready = function(f) {
                t._e.push(f);
            };

            return t;
        }(document, "script", "twitter-wjs"));    

        //load feed
        twttr.ready(function () {
            twttr.widgets.createTimeline(
                {
                    sourceType: 'profile',
                    screenName: twtUsername
                },
                document.getElementById('footer-tweet'),
                {
                    tweetLimit: 1
                }
            ).then(function (data) {
                //get tweet and ass
                var tweetText = $(data).contents().find('.timeline-Tweet-text').html();
                $('.js-footer-tweet-text').html(tweetText);
            });
        });
    }
};

//magnific popup functions
theme.mfpOpen  = function (popup) {
    var closeBtn = '<button title="Close (Esc)" type="button" class="mfp-close mfp-close--custom js-close-mfp"><i class="icon icon--close"></i></button>';

    switch (popup) {
        case 'cart':
            if (theme.cart_ajax) {
                $.magnificPopup.open({
                    items: {
                        src: '.js-cart-draw'
                    },
                    type: 'inline',
                    mainClass: 'mfp-medium',
                    fixedContentPos: true,
                    midClick: true,
                    closeMarkup: closeBtn,
                    removalDelay: 200
                });
            }
            break;

        case 'search':
            $.magnificPopup.open({
                items: {
                    src: '.js-search-draw'
                },
                type: 'inline',
                mainClass: 'mfp-medium',
                fixedContentPos: true,
                focus: '.js-search-input',
                closeMarkup: closeBtn,
                removalDelay: 200
            });
            break;

        case 'age':
            $.magnificPopup.open({
                items: {
                    src: '.js-age-draw'
                },
                type: 'inline',
                mainClass: 'mfp-dark',
                fixedContentPos: true,
                modal: true,
                showCloseBtn: false,
                removalDelay: 200
            });
            break;

        case 'menu-draw':
            $.magnificPopup.open({
                items: {
                    src: '.js-menu-draw'
                },
                type: 'inline',
                mainClass: 'mfp-draw',
                fixedContentPos: true,
                closeMarkup: closeBtn,
                removalDelay: 200
            });
            break;

        case 'collection-draw':
            $.magnificPopup.open({
                items: {
                    src: '.js-collection-draw'
                },
                callbacks: {
                    resize: function() {
                        if (winWidth >= theme.tabletBrkp) {
                            $.magnificPopup.close();
                        }
                    }
                },
                type: 'inline',
                mainClass: 'mfp-draw',
                fixedContentPos: true,
                closeMarkup: closeBtn,
                removalDelay: 200
            });
            break;
    }
};

theme.collectionSort = function () {
    Shopify.queryParams = {};
        if (location.search.length) {
            for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
            aKeyValue = aCouples[i].split('=');
            if (aKeyValue.length > 1) {
                Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
            }
        }
    }

    var defaultSort = $('.js-collection-sort').data('default-sort');
    $('#SortBy')
        .val(defaultSort)
        .bind('change', function() {
            Shopify.queryParams.sort_by = jQuery(this).val();
            location.search = jQuery.param(Shopify.queryParams);
        }
    );
};

theme.magnificVideo = function () {
    $('.js-pop-video').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-medium mfp-close-corner',
        removalDelay: 200,
        closeMarkup: '<button title="Close (Esc)" type="button" class="mfp-close mfp-close--custom js-close-mfp"><i class="icon icon--close"></i></button>'
    });   
};

theme.productZoom = function () {
    if (winWidth > theme.mobileBrkp) {
        $('.js-product-zoom').magnificPopup({
            type: 'image',
            mainClass: 'mfp-medium mfp-zoom-pic mfp-close-corner',
            fixedContentPos: true,
            removalDelay: 200,
            closeOnContentClick: true,
            autoFocusLast: false,
            closeMarkup: '<button title="Close (Esc)" type="button" class="mfp-close mfp-close--custom js-close-mfp"><i class="icon icon--close"></i></button>'
        });   
    } else {
        //disable zoom link for mobile
        $(document).on('click', '.js-product-zoom', function(e) {
            e.preventDefault();
        });
    }
};

theme.promoPop = function (action) { 
    var popup = $('.js-promo-pop');
    var activeClass = 'js-active';

    if (action == 'open') {
        popup.addClass(activeClass);
    } else if (action == 'close') {
        popup.removeClass(activeClass);
    }
};

$(document).ready(function(){
    //adimations
    //remove body loading class and set to loaded
    body.removeClass('theme-loading').addClass('theme-loaded');

    //home events get feed
    $('.js-events').each(function(i) {
        var thisSectionId = $(this).data('section-id');
        var thisApiKey = $(this).data('api-key');
        theme.eventFeed(
            thisApiKey,
            '#eventTemplate'+thisSectionId, 
            '#eventContainer'+thisSectionId,
            thisSectionId
        ); 
    });
    //mobile sliders
    $('.js-events-onboarding').each(function(i) {
        var thisSectionId = $(this).data('section-id');
        theme.layoutSlider('.js-layout-slider-'+thisSectionId);
    });
    $('.js-home-collection-list').each(function(i) {
        var thisSectionId = $(this).data('section-id');
        theme.layoutSlider('.js-layout-slider-'+thisSectionId);
    });
    $('.js-home-products').each(function(i) {
        var thisSectionId = $(this).data('section-id');
        theme.layoutSlider('.js-layout-slider-'+thisSectionId);
    });
    $('.js-related-products').each(function(i) {
        var thisSectionId = $(this).data('section-id');
        theme.layoutSlider('.js-layout-slider-'+thisSectionId);
    });

    //fitvids
    $('.video-wrapper').fitVids();
    //rich text fitvids
    $('.rte iframe[src*="youtube"]').parent().fitVids();
    $('.rte iframe[src*="vimeo"]').parent().fitVids();

    //move maps inside tab on mobile
    $('.js-map-replace').appendAround();
    //move cart box for classic layout 
    $('.js-cart-replace').appendAround();

    //search popup trigger click
    $(document).on('click', '.js-search-trigger', function(e) {
        theme.mfpOpen('search');
        e.preventDefault();
    });  
    //cart popup trigger click
    if (theme.cart_ajax) {
        $(document).on('click', '.js-cart-trigger', function(e) {
            theme.mfpOpen('cart');
            e.preventDefault();
        });
    }
    //mobile menu drawer trigger click
    $(document).on('click', '.js-mobile-draw-trigger', function(e) {
        theme.mfpOpen('menu-draw');
        e.preventDefault();
    });

    //collection sidebar drawer trigger click
    $(document).on('click', '.js-collection-draw-trigger', function(e) {
        theme.mfpOpen('collection-draw');
        e.preventDefault();
    });

    //general
    theme.ajaxCartInit();
    ajaxCart.load();
    theme.masonryLayout();
    theme.selectWrapper();
    theme.triggerActive();
    theme.headerNav();
    theme.currencyToggle();
    theme.magnificVideo();
    theme.ageCheckerCookie();
    theme.promoPopCookie();
    theme.footerTweet();

    //homepage
    theme.homeMaps();
    theme.homeVideoGallery();
    theme.homeMainCarousel();
    theme.homeInstagramFeed();
    theme.homeFeaturedProduct();
    theme.homeSectionMargin();

    //collection
    theme.collectionSort();

    //product single
    theme.thumbsCarousel();
    theme.scrollToFixed();
    theme.productAccordion();
    theme.productZoom();
});

// Shopify functions
//
//

// Theme Editor
$(document)
    .on('shopify:section:load', function(event) {
        var section = $(event.target);
        var type = section.attr('class').replace('shopify-section', '').trim();
        var id = event.originalEvent.detail.sectionId;

        theme.homeSectionMargin();

        switch (type) {
            case 'js-section__home-collection':
                theme.layoutSlider('.js-layout-slider-'+ id);
                theme.masonryLayout();
                break;

            case 'js-section__home-events':
                var thisEvents = $('.js-events-'+id);
                var thisSectionId = thisEvents.data('section-id');
                var thisApiKey = thisEvents.data('api-key');

                //check if onboarding content exists
                if ($(section).find('.js-events-onboarding').length) {
                    theme.layoutSlider('.js-layout-slider-'+ id);
                } else {
                    theme.eventFeed(
                        thisApiKey, 
                        '#eventTemplate'+thisSectionId, 
                        '#eventContainer'+thisSectionId,
                        thisSectionId
                    );
                }
                break;

            case 'js-section__home-slider':
                //reset each youtube video object (weird YT re-init bug)
                section.find('.js-home-carousel-video-data').each(function() {
                    var playerId = $(this).attr('data-player-id');
                    window[playerId] = 'undefined';
                });
                theme.homeMainCarousel();
                break;

            case 'js-section__home-video':
                theme.homeVideoGallery();
                break;

            case 'js-section__home-blog':
                theme.masonryLayout();
                break;

            case 'js-section__home-intro':
                theme.magnificVideo();
                break;

            case 'js-section__home-promo':
                theme.magnificVideo();
                break;

            case 'js-section__home-instagram':
                theme.homeInstagramFeed();
                break;

            case 'js-section__home-map':
                $('.js-map-replace').appendAround();
                theme.homeMaps();
                break;
                
            case 'js-section__home-collection-list':
                theme.layoutSlider('.js-layout-slider-'+ id);
                break;

            case 'js-section__home-product':
                //check if onboarding
                if ($(this).find('.section').attr('data-section-onboarding') != "true") {
                    theme.productSelect(id,'featured', false);
                }
                theme.selectWrapper();
                theme.ajaxCartInit();

                //slider images smooth loading
                $('.js-product-slider').hide();
                $('.js-product-slider-spinner').show();
                $('.js-product-slider').imagesLoaded( function() {
                    $('.js-product-slider').show();
                    $('.js-product-slider-spinner').hide();
                    theme.homeFeaturedProduct();
                });
                break;

            case 'js-section__product-single':
                theme.scrollToFixed();
                theme.selectWrapper();
                theme.productAccordion();
                theme.ajaxCartInit();
                theme.productZoom();

                //slider images smooth loading
                $('.js-product-slider').imagesLoaded( function() {
                    theme.thumbsCarousel();
                });

                //move cart box for classic layout 
                $('.js-cart-replace').appendAround();

                //related products
                theme.layoutSlider('.js-layout-slider-'+ id);
                break;

            case 'js-section__blog':
                theme.masonryLayout();
                break;

            case 'js-section__header':
                theme.scrollToFixed();
                theme.headerNav();
                theme.triggerActive();
                break;

            case 'js-section__footer':
                if (typeof Currency != 'undefined' & (typeof Cookies != "undefined")) {
                    Currency.convertAll(shopCurrency, jQuery('#currencies span.selected').attr('data-currency'));
                }
                theme.footerTweet();
                theme.currencyToggle();
                break;

            case 'js-section__collection':
                theme.selectWrapper();
                theme.masonryLayout();
                theme.collectionSort();
                break;

            case 'js-section__mobile-draw':
                theme.triggerActive();
                break;
        }
    })
    .on('shopify:section:reorder', function(event) {
        theme.homeSectionMargin();
    })
    .on('shopify:section:select', function(event) {
        var section = $(event.target);
        var type = section.attr('class').replace('shopify-section', '').trim();
        var id = event.originalEvent.detail.sectionId;

        switch (type) {
            case 'js-section__mobile-draw':
                //record current top offset
                theme.currentOffset = $(document).scrollTop();
                theme.mfpOpen('menu-draw');
                break;

            case 'js-section__age-checker':
                var ageEnabled = $(section).find('.js-age-draw').data('age-check-enabled');
                if (ageEnabled) {
                    theme.mfpOpen('age');
                } else {
                    $.magnificPopup.close();
                }
                //record current top offset
                theme.currentOffset = $(document).scrollTop();
                break;

            case 'js-section__promo-pop':
                var promoEnabled = $(section).find('.js-promo-pop').data('promo-enabled');
                if (promoEnabled) {
                    theme.promoPop('open');
                } else {
                    theme.promoPop('close');
                }
                //record current top offset
                theme.currentOffset = $(document).scrollTop();
                break;

            case 'js-section__home-slider':
                var currSection = $('[data-section-id="' + id + '"]').find('.js-home-carousel');
                //pause carousel autoplay
                currSection.slick('slickPause');
                break;
        }
    })
    .on('shopify:section:deselect', function(event) {
        var section = $(event.target);
        var type = section.attr('class').replace('shopify-section', '').trim();
        var id = event.originalEvent.detail.sectionId;

        switch (type) {
            case 'js-section__mobile-draw':
                //jump back to to previous offset
                $(document).scrollTop(theme.currentOffset);
                $.magnificPopup.close();
                break;

            case 'js-section__age-checker':
                //jump back to to previous offset
                $(document).scrollTop(theme.currentOffset);
                $.magnificPopup.close();
                break;

            case 'js-section__promo-pop':
                theme.promoPop('close');
                //jump back to to previous offset
                $(document).scrollTop(theme.currentOffset);
                break;

            case 'js-section__home-slider':
                var currSection = $('[data-section-id="' + id + '"]').find('.js-home-carousel');
                //play carousel autoplay
                if (currSection.data('autoplay')) {
                    currSection.slick('slickPlay');
                }
                break;
        }
    })
    .on('shopify:block:select', function(event) {
        var id = event.originalEvent.detail.sectionId;
        var slide = $(event.target);
        var type = slide.parents('.shopify-section').attr('class').replace('shopify-section', '').trim();
        
        switch (type) {
            case 'js-section__home-slider':
                var currSlide = $(slide).find('.home-carousel__item').attr('data-slide-id');
                var currSlider = $('[data-section-id="' + id + '"]').find('.js-home-carousel');
                //go to slide
                currSlider.slick('slickGoTo', currSlide);
                break;
        }
    });


/*============================================================================
  Money Format
  - Shopify.format money is defined in option_selection.js.
    If that file is not included, it is redefined here.
==============================================================================*/
if ((typeof Shopify) === 'undefined') { Shopify = {}; }
if (!Shopify.formatMoney) {
  Shopify.formatMoney = function(cents, format) {
    var value = '',
        placeholderRegex = /\{\{\s*(\w+)\s*\}\}/,
        formatString = (format || this.money_format);

    if (typeof cents == 'string') {
      cents = cents.replace('.','');
    }

    function defaultOption(opt, def) {
      return (typeof opt == 'undefined' ? def : opt);
    }

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = defaultOption(precision, 2);
      thousands = defaultOption(thousands, ',');
      decimal   = defaultOption(decimal, '.');

      if (isNaN(number) || number === null) {
        return 0;
      }

      number = (number/100.0).toFixed(precision);

      var parts   = number.split('.'),
          dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
          cents   = parts[1] ? (decimal + parts[1]) : '';

      return dollars + cents;
    }

    switch(formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
    }

    return formatString.replace(placeholderRegex, value);
  };
}