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


$('#buttonForesee').click(function() {
  if($('#chosen_player_1')[0].innerText === 'Firts Player ▼' ||
     $('#chosen_player_2')[0].innerText === 'Second Player ▼' ||
     $('#chosen_hero_player_1')[0].innerText === 'Hero of the first Player ▼' ||
     $('#chosen_hero_player_2')[0].innerText === 'Hero of the second Player ▼')
     {
       window.alert("It seems that you forgot to pick a value for each field! Try again!")
     }
  else {

    var results = document.getElementById('results')

    //Obtainin informations and creating the table
    url = 'http://localhost:3000/foreseeMatch?player_1=' + $('#chosen_player_1')[0].innerText + "&hero_1=" + $('#chosen_hero_player_1')[0].innerText + "&player_2=" + $('#chosen_player_2')[0].innerText + "&hero_2=" + $('#chosen_hero_player_2')[0].innerText;
    fetch(url, {mode: 'cors'}).then(response => response.json())
      .then(data => {
        newLine = document.createElement('tr')
        newLine.classList.add("w3-red")

        //Firts Row
        element1_1 = document.createElement('td')
        element1_1.appendChild(document.createTextNode("Informations"))
        element1_2 = document.createElement('td');
        element1_2.appendChild(document.createTextNode(data.player_1.name + " (Hero: " + data.hero_1.name + ")"));
        element1_3 = document.createElement('td');
        element1_3.appendChild(document.createTextNode(data.player_2.name + " (Hero: " + data.hero_2.name + ")"));

        results.appendChild(newLine);
        newLine.appendChild(element1_1);
        newLine.appendChild(element1_2);
        newLine.appendChild(element1_3);

        //Win rate
        winRate = document.createElement('tr')

        winRate1_1 = document.createElement('td')
        winRate1_1.appendChild(document.createTextNode("Winrate"))
        winRate1_2 = document.createElement('td');
        winRate1_2.appendChild(document.createTextNode(data.player_1.winrate));
        winRate1_3 = document.createElement('td');
        winRate1_3.appendChild(document.createTextNode(data.player_2.winrate));

        results.appendChild(winRate);
        winRate.appendChild(winRate1_1);
        winRate.appendChild(winRate1_2);
        winRate.appendChild(winRate1_3);

        //Number of games
        n_ofGames = document.createElement('tr')

        n_ofGames1_1 = document.createElement('td')
        n_ofGames1_1.appendChild(document.createTextNode("Total number of games"))
        n_ofGames1_2 = document.createElement('td');
        n_ofGames1_2.appendChild(document.createTextNode(data.player_1.numberOfGames));
        n_ofGames1_3 = document.createElement('td');
        n_ofGames1_3.appendChild(document.createTextNode(data.player_2.numberOfGames));

        results.appendChild(n_ofGames);
        n_ofGames.appendChild(n_ofGames1_1);
        n_ofGames.appendChild(n_ofGames1_2);
        n_ofGames.appendChild(n_ofGames1_3);

        //Number of games with used hero
        nog_UsedHero = document.createElement('tr')

        nog_UsedHero1_1 = document.createElement('td')
        nog_UsedHero1_1.appendChild(document.createTextNode("Total number of games with chosen hero"))
        nog_UsedHero1_2 = document.createElement('td');
        nog_UsedHero1_2.appendChild(document.createTextNode(data.player_1.usedHero.games));
        nog_UsedHero1_3 = document.createElement('td');
        nog_UsedHero1_3.appendChild(document.createTextNode(data.player_2.usedHero.games));

        results.appendChild(nog_UsedHero);
        nog_UsedHero.appendChild(nog_UsedHero1_1);
        nog_UsedHero.appendChild(nog_UsedHero1_2);
        nog_UsedHero.appendChild(nog_UsedHero1_3);

        //Number of wins with used hero
        n_ofwins_UsedHero = document.createElement('tr')

        n_ofwins_UsedHero1_1 = document.createElement('td')
        n_ofwins_UsedHero1_1.appendChild(document.createTextNode("Total number of wins with chosen hero"))
        n_ofwins_UsedHero1_2 = document.createElement('td');
        n_ofwins_UsedHero1_2.appendChild(document.createTextNode(data.player_1.usedHero.win));
        n_ofwins_UsedHero1_3 = document.createElement('td');
        n_ofwins_UsedHero1_3.appendChild(document.createTextNode(data.player_2.usedHero.win));

        results.appendChild(n_ofwins_UsedHero);
        n_ofwins_UsedHero.appendChild(n_ofwins_UsedHero1_1);
        n_ofwins_UsedHero.appendChild(n_ofwins_UsedHero1_2);
        n_ofwins_UsedHero.appendChild(n_ofwins_UsedHero1_3);

        //Number of games against opponent hero
        nog_AgainstHero = document.createElement('tr')

        nog_AgainstHero1_1 = document.createElement('td')
        nog_AgainstHero1_1.appendChild(document.createTextNode("Total number of games against opponent hero"))
        nog_AgainstHero1_2 = document.createElement('td');
        nog_AgainstHero1_2.appendChild(document.createTextNode(data.player_1.againstHero.against_games));
        nog_AgainstHero1_3 = document.createElement('td');
        nog_AgainstHero1_3.appendChild(document.createTextNode(data.player_2.againstHero.against_games));

        results.appendChild(nog_AgainstHero);
        nog_AgainstHero.appendChild(nog_AgainstHero1_1);
        nog_AgainstHero.appendChild(nog_AgainstHero1_2);
        nog_AgainstHero.appendChild(nog_AgainstHero1_3);

        //Number of wins against opponent hero
        n_ofwins_AgainstHero = document.createElement('tr')

        n_ofwins_AgainstHero1_1 = document.createElement('td')
        n_ofwins_AgainstHero1_1.appendChild(document.createTextNode("Total number of wins against opponent hero"))
        n_ofwins_AgainstHero1_2 = document.createElement('td');
        n_ofwins_AgainstHero1_2.appendChild(document.createTextNode(data.player_1.againstHero.against_win));
        n_ofwins_AgainstHero1_3 = document.createElement('td');
        n_ofwins_AgainstHero1_3.appendChild(document.createTextNode(data.player_2.againstHero.against_win));

        results.appendChild(n_ofwins_AgainstHero);
        n_ofwins_AgainstHero.appendChild(n_ofwins_AgainstHero1_1);
        n_ofwins_AgainstHero.appendChild(n_ofwins_AgainstHero1_2);
        n_ofwins_AgainstHero.appendChild(n_ofwins_AgainstHero1_3);

        //Total Points
        totalPoints = document.createElement('tr')

        totalPoints1_1 = document.createElement('td')
        totalPoints1_1.appendChild(document.createTextNode("Total Score: "))
        totalPoints1_2 = document.createElement('td');
        totalPoints1_2.appendChild(document.createTextNode(data.player_1_points));
        totalPoints1_3 = document.createElement('td');
        totalPoints1_3.appendChild(document.createTextNode(data.player_2_points));

        results.appendChild(totalPoints);
        totalPoints.appendChild(totalPoints1_1);
        totalPoints.appendChild(totalPoints1_2);
        totalPoints.appendChild(totalPoints1_3);

        //Percentage of winning
        percentage = document.createElement('tr')
        percentage.classList.add("w3-orange")

        percentage1_1 = document.createElement('td')
        percentage1_1.appendChild(document.createTextNode("Percentage of winnig: "))
        percentage1_2 = document.createElement('td');
        percentage1_2.appendChild(document.createTextNode(data.player_1_percentage + "%"));
        percentage1_3 = document.createElement('td');
        percentage1_3.appendChild(document.createTextNode(data.player_2_percentage + "%"));

        results.appendChild(percentage);
        percentage.appendChild(percentage1_1);
        percentage.appendChild(percentage1_2);
        percentage.appendChild(percentage1_3);


      })
  }
})
