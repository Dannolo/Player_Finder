let proPlayers = null;
let allHeroes = null;

//When page loads, get all informations needed
//Create all needed buttons with respective functions
let url = "https://sde-project345.herokuapp.com/proPlayers"
fetch(url, {mode: 'cors'}).then(response => response.json())
  .then(data => {
    if(data.success == true){
      proPlayers = data.data;

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
    } else {

      var error = document.getElementById('tableDescription_1')
      error.innerHTML = "Error: players not found."

      console.log(data);
    }
  });

url = "https://sde-project345.herokuapp.com/heroes"
fetch(url, {mode: 'cors'}).then(response => response.json())
  .then(data => {
    if(data.success == true){

      allHeroes = data.data;

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
    } else {

      var error = document.getElementById('tableDescription_1')
      error.innerHTML = "Error: heroes not found."

      console.log(data);
    }
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

//Function needed to create the two tables showing al the statistics
$('#buttonForesee').click(function() {

  //AlertBox in case of some empty fields
  if(checkForEmptyFields())
     {
       window.alert("It seems that you forgot to pick a value for each field! Try again!")
     }
  //AlertBox in case of comparison between the same player
  else if($('#chosen_player_1')[0].innerText === $('#chosen_player_2')[0].innerText){
      window.alert("It seems that you tried to compare a player with him/herself! That's not possible!")
  }
  else {

    var results = document.getElementById('results')
    var hero_results = document.getElementById('hero_results')

    var description_1 = document.getElementById('tableDescription_1')
    var description_2 = document.getElementById('tableDescription_2')

    //Obtainin informations and creating the table
    url = 'https://sde-project345.herokuapp.com/foreseeMatch?player_1=' + $('#chosen_player_1')[0].innerText + "&hero_1=" + $('#chosen_hero_player_1')[0].innerText + "&player_2=" + $('#chosen_player_2')[0].innerText + "&hero_2=" + $('#chosen_hero_player_2')[0].innerText;
    fetch(url, {mode: 'cors'}).then(response => response.json())
      .then(data => {
        if(data.success == true){

          var comparison = data.data;

          //Restart the tables
          while(results.firstChild)
            results.removeChild(results.firstChild)

          while(hero_results.firstChild)
            hero_results.removeChild(hero_results.firstChild)


          // ===== Table of Players =====

          //modifying descriptions
          description_1.innerHTML = "Pro-Players Comparison: "
          description_2.innerHTML = "Heroes Comparison (Based on the actual meta): "

          //Firts Row
          newLine = document.createElement('tr')
          newLine.classList.add("w3-red")

          element1_1 = document.createElement('td')
          element1_1.appendChild(document.createTextNode("Informations"))
          element1_2 = document.createElement('td');
          element1_2.appendChild(document.createTextNode(comparison.player_1.name + " (Hero: " + comparison.hero_1.name + ")"));
          element1_3 = document.createElement('td');
          element1_3.appendChild(document.createTextNode(comparison.player_2.name + " (Hero: " + comparison.hero_2.name + ")"));

          results.appendChild(newLine);
          newLine.appendChild(element1_1);
          newLine.appendChild(element1_2);
          newLine.appendChild(element1_3);

          //Win rate
          winRate = document.createElement('tr')

          winRate1_1 = document.createElement('td')
          winRate1_1.appendChild(document.createTextNode("Winrate"))
          winRate1_2 = document.createElement('td');
          winRate1_2.appendChild(document.createTextNode(comparison.player_1.winrate));
          winRate1_3 = document.createElement('td');
          winRate1_3.appendChild(document.createTextNode(comparison.player_2.winrate));

          results.appendChild(winRate);
          winRate.appendChild(winRate1_1);
          winRate.appendChild(winRate1_2);
          winRate.appendChild(winRate1_3);

          //Number of games
          n_ofGames = document.createElement('tr')

          n_ofGames1_1 = document.createElement('td')
          n_ofGames1_1.appendChild(document.createTextNode("Total number of games"))
          n_ofGames1_2 = document.createElement('td');
          n_ofGames1_2.appendChild(document.createTextNode(comparison.player_1.numberOfGames));
          n_ofGames1_3 = document.createElement('td');
          n_ofGames1_3.appendChild(document.createTextNode(comparison.player_2.numberOfGames));

          results.appendChild(n_ofGames);
          n_ofGames.appendChild(n_ofGames1_1);
          n_ofGames.appendChild(n_ofGames1_2);
          n_ofGames.appendChild(n_ofGames1_3);

          //Number of games with used hero
          nog_UsedHero = document.createElement('tr')

          nog_UsedHero1_1 = document.createElement('td')
          nog_UsedHero1_1.appendChild(document.createTextNode("Total number of games with chosen hero"))
          nog_UsedHero1_2 = document.createElement('td');
          nog_UsedHero1_2.appendChild(document.createTextNode(comparison.player_1.usedHero.games));
          nog_UsedHero1_3 = document.createElement('td');
          nog_UsedHero1_3.appendChild(document.createTextNode(comparison.player_2.usedHero.games));

          results.appendChild(nog_UsedHero);
          nog_UsedHero.appendChild(nog_UsedHero1_1);
          nog_UsedHero.appendChild(nog_UsedHero1_2);
          nog_UsedHero.appendChild(nog_UsedHero1_3);

          //Number of wins with used hero
          n_ofwins_UsedHero = document.createElement('tr')

          n_ofwins_UsedHero1_1 = document.createElement('td')
          n_ofwins_UsedHero1_1.appendChild(document.createTextNode("Total number of wins with chosen hero"))
          n_ofwins_UsedHero1_2 = document.createElement('td');
          n_ofwins_UsedHero1_2.appendChild(document.createTextNode(comparison.player_1.usedHero.win));
          n_ofwins_UsedHero1_3 = document.createElement('td');
          n_ofwins_UsedHero1_3.appendChild(document.createTextNode(comparison.player_2.usedHero.win));

          results.appendChild(n_ofwins_UsedHero);
          n_ofwins_UsedHero.appendChild(n_ofwins_UsedHero1_1);
          n_ofwins_UsedHero.appendChild(n_ofwins_UsedHero1_2);
          n_ofwins_UsedHero.appendChild(n_ofwins_UsedHero1_3);

          //Number of games against opponent hero
          nog_AgainstHero = document.createElement('tr')

          nog_AgainstHero1_1 = document.createElement('td')
          nog_AgainstHero1_1.appendChild(document.createTextNode("Total number of games against opponent hero"))
          nog_AgainstHero1_2 = document.createElement('td');
          nog_AgainstHero1_2.appendChild(document.createTextNode(comparison.player_1.againstHero.against_games));
          nog_AgainstHero1_3 = document.createElement('td');
          nog_AgainstHero1_3.appendChild(document.createTextNode(comparison.player_2.againstHero.against_games));

          results.appendChild(nog_AgainstHero);
          nog_AgainstHero.appendChild(nog_AgainstHero1_1);
          nog_AgainstHero.appendChild(nog_AgainstHero1_2);
          nog_AgainstHero.appendChild(nog_AgainstHero1_3);

          //Number of wins against opponent hero
          n_ofwins_AgainstHero = document.createElement('tr')

          n_ofwins_AgainstHero1_1 = document.createElement('td')
          n_ofwins_AgainstHero1_1.appendChild(document.createTextNode("Total number of wins against opponent hero"))
          n_ofwins_AgainstHero1_2 = document.createElement('td');
          n_ofwins_AgainstHero1_2.appendChild(document.createTextNode(comparison.player_1.againstHero.against_win));
          n_ofwins_AgainstHero1_3 = document.createElement('td');
          n_ofwins_AgainstHero1_3.appendChild(document.createTextNode(comparison.player_2.againstHero.against_win));

          results.appendChild(n_ofwins_AgainstHero);
          n_ofwins_AgainstHero.appendChild(n_ofwins_AgainstHero1_1);
          n_ofwins_AgainstHero.appendChild(n_ofwins_AgainstHero1_2);
          n_ofwins_AgainstHero.appendChild(n_ofwins_AgainstHero1_3);

          //Total Points
          totalPoints = document.createElement('tr')

          totalPoints1_1 = document.createElement('td')
          totalPoints1_1.appendChild(document.createTextNode("Total Score: "))
          totalPoints1_2 = document.createElement('td');
          totalPoints1_2.appendChild(document.createTextNode(comparison.player_1_points));
          totalPoints1_3 = document.createElement('td');
          totalPoints1_3.appendChild(document.createTextNode(comparison.player_2_points));

          results.appendChild(totalPoints);
          totalPoints.appendChild(totalPoints1_1);
          totalPoints.appendChild(totalPoints1_2);
          totalPoints.appendChild(totalPoints1_3);

          //Percentage of winning
          percentage = document.createElement('tr')
          percentage.classList.add("w3-orange")

          percentage1_1 = document.createElement('td')
          percentage1_1.appendChild(document.createTextNode("Percentage of winning: "))
          percentage1_2 = document.createElement('td');
          percentage1_2.appendChild(document.createTextNode(comparison.player_1_percentage + "%"));
          percentage1_3 = document.createElement('td');
          percentage1_3.appendChild(document.createTextNode(comparison.player_2_percentage + "%"));

          results.appendChild(percentage);
          percentage.appendChild(percentage1_1);
          percentage.appendChild(percentage1_2);
          percentage.appendChild(percentage1_3);

          // ===== Table of heroes =====

          //First Row
          informations = document.createElement('tr')
          informations.classList.add("w3-red")

          informations1_1 = document.createElement('td')
          informations1_1.appendChild(document.createTextNode("Informations"))
          informations1_2 = document.createElement('td');
          informations1_2.appendChild(document.createTextNode(comparison.hero_1.name));
          informations1_3 = document.createElement('td');
          informations1_3.appendChild(document.createTextNode(comparison.hero_2.name));

          hero_results.appendChild(informations);
          informations.appendChild(informations1_1);
          informations.appendChild(informations1_2);
          informations.appendChild(informations1_3);

          //Images
          img = document.createElement('tr')

          img1_1 = document.createElement('td')
          img1_1.appendChild(document.createTextNode("Image"))


          img1_2 = document.createElement('td');
          actualImage_1 = document.createElement('img');
          actualImage_1.src = comparison.hero_1.img
          img1_2.appendChild(actualImage_1);

          img1_3 = document.createElement('td')
          actualImage_2 = document.createElement('img');
          actualImage_2.src = comparison.hero_2.img
          img1_3.appendChild(actualImage_2);

          hero_results.appendChild(img);
          img.appendChild(img1_1);
          img.appendChild(img1_2);
          img.appendChild(img1_3);

          //Roles
          roles = document.createElement('tr')

          roles1_1 = document.createElement('td')
          roles1_1.appendChild(document.createTextNode("Roles"))

          hero_1_roles = concatenateRoles(comparison.hero_1)
          roles1_2 = document.createElement('td');
          roles1_2.appendChild(document.createTextNode(hero_1_roles));

          hero_2_roles = concatenateRoles(comparison.hero_2)
          roles1_3 = document.createElement('td');
          roles1_3.appendChild(document.createTextNode(hero_2_roles));

          hero_results.appendChild(roles);
          roles.appendChild(roles1_1);
          roles.appendChild(roles1_2);
          roles.appendChild(roles1_3);

          //Percentage of times this hero was banned in pro matches
          n_ofBans = document.createElement('tr')

          n_ofBans1_1 = document.createElement('td')
          n_ofBans1_1.appendChild(document.createTextNode("Percentage of bans in pro matches"))
          n_ofBans1_2 = document.createElement('td');
          n_ofBans1_2.appendChild(document.createTextNode(comparison.hero_1.pro_ban + "%"));
          n_ofBans1_3 = document.createElement('td');
          n_ofBans1_3.appendChild(document.createTextNode(comparison.hero_2.pro_ban + "%"));

          hero_results.appendChild(n_ofBans);
          n_ofBans.appendChild(n_ofBans1_1);
          n_ofBans.appendChild(n_ofBans1_2);
          n_ofBans.appendChild(n_ofBans1_3);

          //Percentage of times this hero wins when used in pro matches
          n_ofWins = document.createElement('tr')

          n_ofWins1_1 = document.createElement('td')
          n_ofWins1_1.appendChild(document.createTextNode("Percentage of wins in pro matches"))
          n_ofWins1_2 = document.createElement('td');
          n_ofWins1_2.appendChild(document.createTextNode(comparison.hero_1.pro_win + "%"));
          n_ofWins1_3 = document.createElement('td');
          n_ofWins1_3.appendChild(document.createTextNode(comparison.hero_2.pro_win + "%"));

          hero_results.appendChild(n_ofWins);
          n_ofWins.appendChild(n_ofWins1_1);
          n_ofWins.appendChild(n_ofWins1_2);
          n_ofWins.appendChild(n_ofWins1_3);

          //Percentage of times this hero get picked in pro matches
          n_ofPick = document.createElement('tr')

          n_ofPick1_1 = document.createElement('td')
          n_ofPick1_1.appendChild(document.createTextNode("Percentage of pick in pro matches"))
          n_ofPick1_2 = document.createElement('td');
          n_ofPick1_2.appendChild(document.createTextNode(comparison.hero_1.pro_pick + "%"));
          n_ofPick1_3 = document.createElement('td');
          n_ofPick1_3.appendChild(document.createTextNode(comparison.hero_2.pro_pick + "%"));

          hero_results.appendChild(n_ofPick);
          n_ofPick.appendChild(n_ofPick1_1);
          n_ofPick.appendChild(n_ofPick1_2);
          n_ofPick.appendChild(n_ofPick1_3);

          //Number of times this hero wins when used in pro matches
          n_ofTopWin = document.createElement('tr')

          n_ofTopWin1_1 = document.createElement('td')
          n_ofTopWin1_1.appendChild(document.createTextNode("Number of wins in top matches"))
          n_ofTopWin1_2 = document.createElement('td');
          n_ofTopWin1_2.appendChild(document.createTextNode(comparison.hero_1.top_win));
          n_ofTopWin1_3 = document.createElement('td');
          n_ofTopWin1_3.appendChild(document.createTextNode(comparison.hero_2.top_win));

          hero_results.appendChild(n_ofTopWin);
          n_ofTopWin.appendChild(n_ofTopWin1_1);
          n_ofTopWin.appendChild(n_ofTopWin1_2);
          n_ofTopWin.appendChild(n_ofTopWin1_3);

          //Number of times this hero get picked in pro matches
          n_ofTopPick = document.createElement('tr')

          n_ofTopPick1_1 = document.createElement('td')
          n_ofTopPick1_1.appendChild(document.createTextNode("Number of pick in top matches"))
          n_ofTopPick1_2 = document.createElement('td');
          n_ofTopPick1_2.appendChild(document.createTextNode(comparison.hero_1.top_pick));
          n_ofTopPick1_3 = document.createElement('td');
          n_ofTopPick1_3.appendChild(document.createTextNode(comparison.hero_2.top_pick));

          hero_results.appendChild(n_ofTopPick);
          n_ofTopPick.appendChild(n_ofTopPick1_1);
          n_ofTopPick.appendChild(n_ofTopPick1_2);
          n_ofTopPick.appendChild(n_ofTopPick1_3);

          //Total score of heroes
          hero_score = document.createElement('tr')

          hero_score1_1 = document.createElement('td')
          hero_score1_1.appendChild(document.createTextNode("Total score"))
          hero_score1_2 = document.createElement('td');
          hero_score1_2.appendChild(document.createTextNode(comparison.hero_1_points));
          hero_score1_3 = document.createElement('td');
          hero_score1_3.appendChild(document.createTextNode(comparison.hero_2_points));

          hero_results.appendChild(hero_score);
          hero_score.appendChild(hero_score1_1);
          hero_score.appendChild(hero_score1_2);
          hero_score.appendChild(hero_score1_3);

          //Total percentage of heroes
          hero_percentage = document.createElement('tr')
          hero_percentage.classList.add("w3-orange")

          hero_percentage1_1 = document.createElement('td')
          hero_percentage1_1.appendChild(document.createTextNode("Percentage of winning"))
          hero_percentage1_2 = document.createElement('td');
          hero_percentage1_2.appendChild(document.createTextNode(comparison.hero_1_percentage + "%"));
          hero_percentage1_3 = document.createElement('td');
          hero_percentage1_3.appendChild(document.createTextNode(comparison.hero_2_percentage + "%"));

          hero_results.appendChild(hero_percentage);
          hero_percentage.appendChild(hero_percentage1_1);
          hero_percentage.appendChild(hero_percentage1_2);
          hero_percentage.appendChild(hero_percentage1_3);

        } else{

          while(results.firstChild)
            results.removeChild(results.firstChild)

          while(hero_results.firstChild)
            hero_results.removeChild(hero_results.firstChild)

          description_1.innerHTML = "Error: Unable to compare players."
          description_2.innerHTML = ""

          console.log(data);
        }
      })
  }
})

function concatenateRoles(hero){
  var temp = "";
  for (var i = 0; i < hero.roles.length; i++) {
    temp = temp + hero.roles[i]
    if(i !== hero.roleslength - 1)
      temp = temp + ", "
  }

  return temp;
}

function checkForEmptyFields(){
  return $('#chosen_player_1')[0].innerText === 'Firts Player ▼' ||
         $('#chosen_player_2')[0].innerText === 'Second Player ▼' ||
         $('#chosen_hero_player_1')[0].innerText === 'Hero of the first Player ▼' ||
         $('#chosen_hero_player_2')[0].innerText === 'Hero of the second Player ▼'
}
