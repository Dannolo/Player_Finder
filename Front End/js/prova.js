let proPlayers = null;
let allHeroes = null;

let url = "http://localhost:3000/proPlayers"
fetch(url, {mode: 'cors'}).then(response => response.json())
  .then(data => {
    proPlayers = data;

    var player_1_menu = document.getElementById('list_player_1');
    var player_2_menu = document.getElementById('list_player_2')

    for (var i = 0; i < proPlayers.length; i++) {

      newEntry = document.createElement('li');
      newEntry2 = document.createElement('li');
      newEntry.appendChild(document.createElement('button')).appendChild(document.createTextNode(proPlayers[i].name));
      newEntry2.appendChild(document.createElement('button')).appendChild(document.createTextNode(proPlayers[i].name));
      player_1_menu.appendChild(newEntry);
      player_2_menu.appendChild(newEntry2);

    }

    $('#list_player_1').find('li').each(function(){
      $(this).click(function(){
        $('#chosen_player_1')[0].innerText = $(this).context.innerText;
      })
    })

    $('#list_player_2').find('li').each(function(){
      $(this).click(function(){
        $('#chosen_player_2')[0].innerText = $(this).context.innerText;
      })
    })
  });

url = "http://localhost:3000/heroes"
fetch(url, {mode: 'cors'}).then(response => response.json())
  .then(data => {
    allHeroes = data;

    var hero_player_1_menu = document.getElementById('list_hero_player_1');
    var hero_player_2_menu = document.getElementById('list_hero_player_2');

    for (var i = 0; i < allHeroes.length; i++) {

      newEntry = document.createElement('li');
      newEntry2 = document.createElement('li');
      newEntry.appendChild(document.createElement('button')).appendChild(document.createTextNode(allHeroes[i].name));
      newEntry2.appendChild(document.createElement('button')).appendChild(document.createTextNode(allHeroes[i].name));
      hero_player_1_menu.appendChild(newEntry);
      hero_player_2_menu.appendChild(newEntry2);

    }

    $('#list_hero_player_1').find('li').each(function(){
      $(this).click(function(){
        $('#chosen_hero_player_1')[0].innerText = $(this).context.innerText;
      })
    })

    $('#list_hero_player_2').find('li').each(function(){
      $(this).click(function(){
        $('#chosen_hero_player_2')[0].innerText = $(this).context.innerText;
      })
    })
  });

//DropDown Menu
var nav = [$("#dD1"), $("#dD2"), $("#dD3"), $("#dD4")];

//add indicators and hovers to submenu parents
for (var i = 0; i < nav.length; i++) {
  nav[i].find("li").each(function() {
      if ($(this).find("ul").length > 0) {

          $("<span>").text(" ▼").appendTo($(this).children(":first"));

          $(this).find("ul").stop(true, true).slideToggle();
          //show subnav on hover
          $(this).click(function() {
              $(this).find("ul").stop(true, true).slideToggle();
          });
      }
  });
}
