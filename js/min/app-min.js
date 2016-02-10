function initMap(){for(var e=new google.maps.LatLng(41.074448,-73.541316),t=new google.maps.Map(document.getElementById("map"),{center:e,mapTypeId:google.maps.MapTypeId.ROADMAP,scrollwheel:!0,zoom:12,zoomControl:!0,styles:styleArray}),n=!1,o=!1,s=0;s<places.length;s++){var a=places[s],i=new google.maps.LatLng(a.address.lat,a.address.lng),r=new google.maps.Marker({title:places[s].name,position:i,number:s,animation:null,draggable:!1});google.maps.event.addListener(r,"click",function(e){return function(){var e=new google.maps.InfoWindow,s='<div id="content"><div id="siteNotice"></div><b>'+this.title+"</b> </div>";e.setOptions({content:s}),e.setContent(s),e.open(t,this),this.setIcon("http://maps.google.com/mapfiles/ms/icons/green-dot.png"),t.panTo(this.position),null!==this.getAnimation()?this.setAnimation(null):this.setAnimation(google.maps.Animation.BOUNCE),n?(n.title===a.name?null!==this.getAnimation()?this.setAnimation(null):this.setAnimation(google.maps.Animation.BOUNCE):(n.setIcon(""),o.close(),n.setAnimation(null),places[n.number].marker=n),this.setIcon("http://maps.google.com/mapfiles/ms/icons/green-dot.png"),t.panTo(this.position)):this.setAnimation(google.maps.Animation.BOUNCE),n=this,o=e,selected=this.number,selectPlace(this.number)}}(r)),places[s].marker=r,r.setMap(t)}}function selectPlace(e){if(!skip){if(skip=!0,"number"==typeof e)e=places[e];else{var t=e.marker.number;google.maps.event.trigger(places[t].marker,"click")}currentName(e.name),currentDesc(e.description),showModel(!0),getYelp(e),getFS(e),skip=!1}}function nonce_generate(){return Math.floor(1e12*Math.random()).toString()}function localJsonpCallback(e){}function callStart(e){}function callComplete(e){}function getYelp(e){var t="GET",n="YsPDWGOo52SXK3U-FoNm6g",o="d4oiThmVyRCZrZR1o8phpOV4FjI",s="https://api.yelp.com/v2/search?",a="MyX8vDPrsgUCTH3qWMK4M3zp8oLuBkE2",i="Stamford, CT",r="IKtJiQ-P4Gk_arqDvP3buDE-Wio",l={term:e.name,location:i,oauth_consumer_key:n,oauth_token:a,oauth_nonce:nonce_generate(),oauth_timestamp:Math.floor(Date.now()/1e3),oauth_signature_method:"HMAC-SHA1",callback:"localJsonpCallback"},c=oauthSignature.generate(t,s,l,o,r);l.oauth_signature=c;var u={type:t,url:s,data:l,cache:!0,dataType:"jsonp",timeout:5e3,complete:callComplete("Yelp"),beforeSend:callStart("Yelp")};$.getJSON(u).done(function(e){e.businesses.length>0?(showYelp(!0),showYelpNoResult(!1)):(showYelp(!1),showYelpNoResult(!0)),yelpResults.removeAll();for(var t=0;t<e.businesses.length;t++)yelpResults.push({name:e.businesses[t].name,url:e.businesses[t].url})}).fail(function(e){Helpers.handleError("Error encountered in communicating with Yelp.  Please check your internet connection and firewall settings.  If this issue persists, there may be difficulty in communicating with Yelp."),showYelp(!1),showYelpNoResult(!0)})}function getFS(e){var t="GET",n=["https://api.foursquare.com/v2/venues/search?client_id=","&client_secret=","&v=20130815&near=","&query="],o="ZUPJOALYACXTHW3ZLE2I0RF2IWBOLFQPORW5LBUFHL2KEFTA",s="S4M2PBBKJVQP3HM3SCKEZIIEJARLZ5ITP1KUKN4IXT03CXTM",a="Stamford, CT",i=n[0]+o+n[1]+s+n[2]+a+n[3]+e.name,r={url:i,type:t,cache:!0,dataType:"json",complete:callComplete("fs"),beforeSend:callStart("fs")};$.getJSON(r).done(function(e){if(e=e.response,e.venues.length>0){fsResults.removeAll(),showFS(!0),showFSnoresult(!1);for(var t=0;t<e.venues.length;t++)fsDetails(e.venues[t].id)}else showFS(!1),showFSnoresult(!0)}).fail(function(e){Helpers.handleError("Error encountered in communicating with Foursqure.  Please check your internet connection and firewall settings.  If this issue persists, there may be difficulty in communicating with Foursquare."),showFS(!1),showFSnoresult(!0)})}function fsDetails(e){var t="GET",n="https://api.foursquare.com/v2/venues/"+e,o="ZUPJOALYACXTHW3ZLE2I0RF2IWBOLFQPORW5LBUFHL2KEFTA",s="S4M2PBBKJVQP3HM3SCKEZIIEJARLZ5ITP1KUKN4IXT03CXTM",a="Stamford, CT",i={type:t,url:n+"?client_id="+o+"&client_secret="+s+"&v=20130815&near="+a};$.getJSON(i).done(function(e){self.fsResults.push({name:e.response.venue.name,url:e.response.venue.canonicalUrl})}).fail(function(e){Helpers.handleError("Error encountered in communicating with Foursquare.  Please check your internet connection and firewall settings.  If this issue persists, there may be difficulty in communicating with Foursquare.")})}function Result(e){"use strict";this.name=e.result,this.url=e.url}var Helpers={handleError:function(e){return alert(e)},logError:function(e){return console.log(e)}},ViewModel=function(){"use strict";var e=this;e.places=ko.observableArray(places),e.query=ko.observable(""),e.resultsFound=ko.pureComputed(function(){for(var t=0,n=0;n<e.places().length;n++)places[n]._destroy()===!1&&t++;return t}),e.placeNumber=ko.pureComputed(function(){return selected}),e.helpers=Helpers;for(var t=0;t<places.length;t++)availableTags.push(places[t].name);$("#search-input").autocomplete({source:availableTags}),$("#search-input").on("autocompleteselect",function(t,n){for(var o=0;o<availableTags.length;o++)n.item.value.toLowerCase()===availableTags[o].toLowerCase()&&selectPlace(e.places()[o])}),this.currentMarker=function(){return e.places()[e.currentPlace()]},this.search=function(t){e.places().forEach(function(e){e.name.toLowerCase().indexOf(t.toLowerCase())>=0?(e._destroy(!1),e.marker.setVisible(!0)):(e._destroy(!0),e.marker.setVisible(!1))})},this.openSite=function(e,t){"click"===t.type&&window.open(e,"_blank")},this.query.subscribe(e.search),$("#modal-place").on("shown.bs.modal",function(){var t=e.places()[selected].marker.getPosition().lat(),n=e.places()[selected].marker.getPosition().lng(),o=new google.maps.LatLng(t,n);new google.maps.StreetViewPanorama(document.getElementById("street-view"),{position:o,prob:{heading:24,pitch:18}})})};ko.applyBindings(new ViewModel);