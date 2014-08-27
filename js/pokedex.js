$( document ).ready(function(){
  $.ajax({
    url: '/pokedex/json/pokemon/pokemon.json',
    type: 'GET',
    dataType: 'json',
    success: function (json) {
      $.each(json.objects[0].pokemon, function(pokemon){
        $.ajax({
          url: '/pokedex' + this.resource_uri + '',
          type: 'GET',
          dataType: 'json',
          success: function(pokemonData){
            $('.pokemonContainer').append(
              '<div class="pokemon">' +
              '<img class="pokemonImage" src="http://assets22.pokemon.com/assets/cms2/img/pokedex/full/' + pokemonData.pkdx_id + '.png" alt="" />' +
              '<div class="pokemonData">' +
              '<div class="pokemonId">#' + pokemonData.pkdx_id + '</div>' +
              '<h3>' + pokemonData.name + '</h3>' +
              '<ul>' +
              '<li><span>HP:</span>' + pokemonData.hp + '</li>' +
              '<li><span>Attack:</span> ' + pokemonData.attack + '</li>' +
              '<li><span>Defense:</span> ' + pokemonData.defense + '</li>' +
              '<li><span>Special Attack:</span> ' + pokemonData.sp_atk + '</li>' +
              '<li><span>Special Defense:</span> ' + pokemonData.sp_def + '</li>' +
              '<li><span>Speed:</span> ' + pokemonData.speed + '</li>' +
              '<li><span>Type:</span> ' + pokemonData.types[0].name + '</li>' +
              '</ul>' +
              '</div>' +
              '</div>'
            );
          }
        })
      })
    }
  });
  $(function(){
    $(".pokemon:nth-child(-n+12)").addClass("grow");
    $("#loadMore").click(function(e){ // click event for load more
      var $algo = $(".pokemon:hidden");
        e.preventDefault();
        $(".pokemon:hidden").slice(0, 12).addClass("grow"); // select next 10 hidden divs and show them
        if( $algo.length == 0 ){ // check if any hidden divs still exist
          alertify.alert("there is no more pokemon");
        }
    });
  });
  $("#loadMore").delay(4000).fadeIn();
  $(window).scroll(function scrollTop(){
		if ($(this).scrollTop() > 100) {
			$('#scrollToTop').fadeIn();
		} else {
			$('#scrollToTop').fadeOut();
		}
	});
	//Click event to scroll to top
	$('#scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});
  $('.pokemon').css("display", "none");
  $('#search').click(function(){
    $('.pokemon').css("display", "none");
    var txt = $('#search-criteria').val();
    $('.pokemon').each(function(){
       if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
           $(this).css("display", "inline-block").addClass("grow");
       }
    });
    $("#loadMore").hide();
  });
  $("#search-criteria").keypress(function(e) {
    if(e.which == 13) {
      $('.pokemon').css("display", "none");
      var txt = $('#search-criteria').val();
      $('.pokemon').each(function(){
         if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
             $(this).css("display", "inline-block").addClass("grow");
         }
      });
      $("#loadMore").hide();
    }
  });
});
