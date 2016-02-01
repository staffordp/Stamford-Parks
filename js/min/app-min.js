function mark(e,o){"use strict";var n=o,t=new google.maps.LatLng(e.lat(),e.lng()),r=new google.maps.Marker({title:e.name(),position:t,number:e.number(),label:e.marker(),animation:google.maps.Animation.DROP});self.markers.push(r),r.setMap(n)}function Place(e,o){"use strict";this.name=e.name,this.lat=e.address.lat,this.lng=e.address.lng,this.number=o,this.description=e.description}var Map={initMap:function(){var e=new google.maps.LatLng(41.074448,-73.541316);try{this.instance=new google.maps.Map(document.getElementById("map"),{center:e,mapTypeId:google.maps.MapTypeId.ROADMAP,scroolwheel:!0,zoom:15,styles:styleArray})}catch(o){Helpers.handleError("Google maps is not loading. This may be due to not having an internet connection.")}},showStreet:function(e,o){"use strict";var n={lat:e,lng:o},t=new google.maps.StreetViewPanorama(document.getElementById("street-view"),{position:n,prob:{heading:24,pitch:18}});this.instance.setStreetView(t),google.maps.event.trigger(this.instance,"resize",function(){})},toggleBounce:function(e){"use strict";null!==e.getAnimation()?e.setAnimation(null):e.setAnimation(google.maps.Animation.BOUNCE)}},Helpers={handleError:function(e){return alert(e)},logError:function(e){return console.log(e)}},ViewModel=function(){"use strict";function e(e){"open"==e&&($("body").addClass("openmenu"),$("#hamburgermenu").animate({width:u},c),$(".overlay").animate({left:u},c)),"close"==e&&($("body").removeClass("openmenu"),$("#hamburgermenu").animate({width:"0"},c),$(".overlay").animate({left:"0"},c))}var o=this;o.isBorder=!1,o.markers=[],o.yelpName=ko.observable(),o.yelpPhone=ko.observable(),o.yelpRatingUrl=ko.observable(),o.yelpRatingImg=ko.observable(),o.yelpReviews=ko.observable(),o.yelpImg=ko.observable(),o.yelpAddress=ko.observable(),o.yelpZip=ko.observable(),o.yelpDesc=ko.observable(),o.yelpUrl=ko.observable(),o.fsName=ko.observable(),o.fsPhone=ko.observable(),o.fsAddress=ko.observableArray([]),o.fsZip=ko.observable(),o.fsCity=ko.observable(),o.fsCrossStreet=ko.observable(),o.fsImg=ko.observableArray([]),o.fsTips=ko.observableArray([]),o.fsRating=ko.observable(),o.fsUrl=ko.observable(),o.places=ko.observableArray([]),o.query=ko.observable(""),o.menuVisible=ko.observable("true"),o.currentPlace=ko.observable(-1),o.currentName=ko.observable(),o.currentDesc=ko.observable(),o.resultsFound=ko.pureComputed(function(){return o.places().length}),o.resultsStyle=ko.pureComputed(function(){return o.resultsFound()<26,"drawer-item-single"}),o.drawerStyle=ko.pureComputed(function(){return o.resultsFound()<26,"drawer-list-single"}),o.fsTipsStyle=ko.pureComputed(function(){return o.fsTips().length>0?"fs-element-show":"fs-element-hide"}),o.fsCrossStyle=ko.pureComputed(function(){return""===o.fsCrossStreet()?"fs-element-show":"fs-element-hide"}),this.menubtnTgl=function(){e($("body").hasClass("openmenu")?"close":"open")},this.currentMarker=function(){return o.markers[o.currentPlace()]},this.search=function(e){o.places.removeAll();var n=0;places.forEach(function(t){t.name.toLowerCase().indexOf(e.toLowerCase())>=0&&(o.places.push(new Place(t,n)),n++)}),o.markers.forEach(function(t){t.title.toLowerCase().indexOf(e.toLowerCase())<0?o.markers[n].setVisible(!1):t.setVisible(!0)}),0===e.length&&o.populateLocations()},this.placeMarker=function(e,n){var t=new google.maps.LatLng(e.lat,e.lng),r=new google.maps.Marker({title:e.name,position:t,number:n,animation:null});o.markers.push(r),r.addListener("click",function(){o.selectPlace(e)}),r.setMap(Map.instance)},this.populateLocations=function(){o.places.removeAll();var e=0;if(places.forEach(function(n){o.places.push(new Place(n,e)),e++}),0===o.markers.length)for(e=0;e<o.places().length;e++){var n=o.places()[e];o.placeMarker(n,e)}for(e in o.markers)o.markers[e].visible===!1&&o.markers[e].setVisible(!0)},this.selectPlace=function(e){if("undefined"!=typeof o.currentMarker()){if(o.currentMarker().title===e.name)return void Map.toggleBounce(o.currentMarker(),null);o.markers[o.currentPlace()].setIcon(""),o.currentMarker().setAnimation(null)}o.markers[e.number].setIcon("http://maps.google.com/mapfiles/ms/icons/green-dot.png");var n=new google.maps.LatLng(e.lat,e.lng);Map.instance.panTo(n),Map.toggleBounce(o.markers[e.number]),o.currentPlace(e.number),o.currentDesc(e.description),o.currentName(e.name),o.initAjax(e)},this.initAjax=function(e){o.clearObservables(),o.fillcontentWindow(),$("#model-data").show(),s(e.name),a(e.name)},this.clearObservables=function(){o.fsAddress.removeAll(),o.fsImg.removeAll(),o.fsTips.removeAll(),$(".nav-pills a:first").tab("show"),$(".carousel-indicators a:first").tab("show")},this.fillcontentWindow=function(){var e='<div id="content"><div id="siteNotice"></div><b>'+o.places()[o.currentPlace()].name+"</b> </div>";o.infoWindow.setOptions({content:e}),o.infoWindow.open(Map.instance,o.markers[o.currentPlace()]),o.markers[o.currentPlace()].setIcon("http://maps.google.com/mapfiles/ms/icons/green-dot.png")},this.parseResults=function(e){null!==e&&(o.yelpName(e.name),o.yelpRatingUrl(e.rating_img_url),o.yelpRatingImg(e.rating_img_url_small),o.yelpReviews(e.review_count),o.yelpImg(e.image_url),o.yelpAddress(e.location.display_address),o.yelpZip(e.postal_code),o.yelpDesc(e.snippet_text),o.yelpUrl(e.url),e.display_phone?o.yelpPhone(e.display_phone.slice(3,-1)):o.yelpPhone(""),$("#yelp-noresult").hide(),$("#yelp").show()),$(0!=="#resultLink".length)&&$("#yelp-logo").click(function(){o.openSite(o.yelpUrl())})},this.fsParseResults=function(e){if(null!==e){o.fsName(e.name);for(var n=0;n<e.location.formattedAddress.length;n++)o.fsAddress.push(e.location.formattedAddress[n]);for(o.fsCrossStreet(e.location.crossStreet),o.fsZip(e.location.postalCode),n=0;n<e.tips.groups[0].items.length;n++)o.fsTips.push('"'+e.tips.groups[0].items[n].text+'"');try{for(n=0;n<e.photos.groups[0].items.length;n++)o.fsImg.push(e.photos.groups[0].items[n].prefix+"300x300"+e.photos.groups[0].items[n].suffix);$("#gallery-pill").show()}catch(t){Helpers.logError(t+" No photos found for this venue."),$("#gallery-pill").hide()}o.fsUrl(e.shortUrl),$("#fs-noresult").hide(),$("#four-square").show()}$(0!=="#resultLink".length)&&$("#fs-logo").click(function(){o.openSite(o.fsUrl())}),$("#carousel-control").addClass("active"),$("#carousel-item").addClass("active")},this.openSite=function(e){window.open(e,"_blank")};var n=function(){return Math.floor(1e12*Math.random()).toString()},t=function(e){},r=function(e){},s=function(e){var s="GET",a="YsPDWGOo52SXK3U-FoNm6g",l="d4oiThmVyRCZrZR1o8phpOV4FjI",i="https://api.yelp.com/v2/search?",c="MyX8vDPrsgUCTH3qWMK4M3zp8oLuBkE2",u="Stamford, CT",p="IKtJiQ-P4Gk_arqDvP3buDE-Wio",m={term:e,location:u,oauth_consumer_key:a,oauth_token:c,oauth_nonce:n(),oauth_timestamp:Math.floor(Date.now()/1e3),oauth_signature_method:"HMAC-SHA1",callback:"localJsonpCallback"},d=oauthSignature.generate(s,i,m,l,p);m.oauth_signature=d;var f={type:s,url:i,data:m,cache:!0,dataType:"jsonp",complete:r("Yelp"),beforeSend:t("Yelp"),success:function(n){var t=0,r=u.slice(0,-4);$.each(n.businesses,function(n,s){s.name===e&&s.location.city===r&&(t++,o.parseResults(s))}),0===t&&($("#yelp-noresult").show(),$("#yelp").hide())},error:function(e){Helpers.handleError("Error encountered in communicating with Yelp.  Please just your internet connection and firewall settings.")}};$.ajax(f)},a=function(e){var o="GET",n=["https://api.foursquare.com/v2/venues/search?client_id=","&client_secret=","&v=20130815&near=","&query="],s="ZUPJOALYACXTHW3ZLE2I0RF2IWBOLFQPORW5LBUFHL2KEFTA",a="S4M2PBBKJVQP3HM3SCKEZIIEJARLZ5ITP1KUKN4IXT03CXTM",i="Stamford, CT",c=n[0]+s+n[1]+a+n[2]+i+n[3]+e,u={url:c,type:o,cache:!0,dataType:"jsonp",complete:r("fs"),beforeSend:t("fs"),success:function(o){o=o.response.venues;var n=0,t=i.slice(0,-4);$.each(o,function(o,r){r.name===e&&r.location.city===t&&(n++,l(r.id))}),0===n&&($("#four-square").hide(),$("#galleryTab").hide(),$("#fs-noresult").show(),$("#gallery-pill").hide())},error:function(e){Helpers.handleError("Error encountered in communicating with Foursquare.  Please just your internet connection and firewall settings.")}};$.ajax(u)},l=function(e){var n="GET",t="https://api.foursquare.com/v2/venues/"+e,r="ZUPJOALYACXTHW3ZLE2I0RF2IWBOLFQPORW5LBUFHL2KEFTA",s="S4M2PBBKJVQP3HM3SCKEZIIEJARLZ5ITP1KUKN4IXT03CXTM",a="Stamford, CT",l={type:n,url:t+"?client_id="+r+"&client_secret="+s+"&v=20130815&near="+a,success:function(e){e=e.response.venue,o.fsParseResults(e)},error:function(e){}};$.ajax(l)},i=null;i=window.matchMedia("(min-width: 400px)").matches?250:150;var c=400,u=i+"px";this.query.subscribe(o.search),$("#modal-place").on("shown.bs.modal",function(){Map.showStreet(o.places()[o.currentPlace()].lat,o.places()[o.currentPlace()].lng),$(".slide").attr("data-ride","carousel")}),$("#modal-place").on("hidden.bs.modal",function(){$(".slide").attr("data-ride","")}),$("#pg-container").click(function(){o.menuToggle()}),$("#titlediv, #map-row, #footer").on("click",function(o){$("body").hasClass("openmenu")&&e("close")}),$(".menubtn").on("click",function(e){e.preventDefault()}),Map.initMap(o),o.populateLocations(),o.infoWindow=new google.maps.InfoWindow,o.helpers=Helpers};ko.applyBindings(new ViewModel);