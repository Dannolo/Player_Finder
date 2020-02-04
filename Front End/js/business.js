//Auxiliary things for the HTML part

const spinner = document.getElementById("spinner");
let player = null

function fade() {
    $("#how").fadeOut("slow");
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

////////////////////////////////////

// Creating part //

///////////////////////////////////

// Easy button creator 

function createButton(index, id, value, color) {

    var button = document.createElement('button')
    button.classList.add("btn")
    button.classList.add("btn-default")
    button.classList.add(color)
    button.classList.add(id)
    button.setAttribute("id", id + index)
    button.innerText = value
    return button
}

// See the matches for that event

function createMatchViews(index, data) {

    var rowEvent = document.getElementById('event' + index)

    var header = document.createElement('div')
    header.classList.add("row")
    header.classList.add("header")
    header.classList.add("blue")
    header.classList.add("fill_all")

    var eventname = document.createElement('div')
    eventname.classList.add("cell")
    var displayName = document.createElement('div')
    displayName.classList.add("cell")
    var fullRoundText = document.createElement('div')
    fullRoundText.classList.add("cell")
    var game = document.createElement('div')
    game.classList.add("cell")
    var character = document.createElement('div')
    character.classList.add("cell")

    eventname.appendChild(document.createTextNode("Name"))
    displayName.appendChild(document.createTextNode("DisplayScore"))
    fullRoundText.appendChild(document.createTextNode("FullRoundText"))
    game.appendChild(document.createTextNode("game"))
    character.appendChild(document.createTextNode("character"))

    header.appendChild(eventname)
    header.appendChild(displayName)
    header.appendChild(fullRoundText)
    header.appendChild(game)
    header.appendChild(character)

    insertAfter(header, rowEvent)

    for (let _index = 0; _index < data.data.matches.length; _index++) {
        createMatch(index, _index, data.data.matches[_index], header)
    }

    
    // Creating the header after all the rows of matches

    var header_events = document.createElement('div')
    header_events.classList.add("row")
    header_events.classList.add("header")

    var event = document.createElement('div')
    event.classList.add("cell")
    var slugheader = document.createElement('div')
    slugheader.classList.add("cell")
    var placeheader = document.createElement('div')
    placeheader.classList.add("cell")
    var gameheader = document.createElement('div')
    gameheader.classList.add("cell")
    var characterheader = document.createElement('div')
    characterheader.classList.add("cell")

    event.appendChild(document.createTextNode("Event"))
    slugheader.appendChild(document.createTextNode("Slug"))
    placeheader.appendChild(document.createTextNode("Place"))
    gameheader.appendChild(document.createTextNode("Game"))
    characterheader.appendChild(document.createTextNode("Character"))

    header_events.appendChild(event)
    header_events.appendChild(slugheader)
    header_events.appendChild(placeheader)
    header_events.appendChild(gameheader)
    header_events.appendChild(characterheader)

    var elementAfter = document.getElementById('event' + (index + 1))

    elementAfter.parentNode.insertBefore(header_events, elementAfter);

}

// CreateMatch for that event

function createMatch(index, indexMatch, match, matches) {

    var container = document.createElement('div')
    container.classList.add("row")
    container.setAttribute("id", "match" + index + indexMatch)

    var eventname = document.createElement('div')
    eventname.classList.add("cell")
    eventname.setAttribute("id", "eventname" + index + indexMatch)

    var displayName = document.createElement('div')
    displayName.classList.add("cell")
    displayName.setAttribute("id", "displayName" + index + indexMatch)

    var fullRoundText = document.createElement('div')
    fullRoundText.classList.add("cell")
    fullRoundText.setAttribute("id", "fullRoundText" + index + indexMatch)

    var game = document.createElement('div')
    game.classList.add("cell")
    game.setAttribute("id", "game" + index + indexMatch)

    var character = document.createElement('div')
    character.classList.add("cell")
    character.setAttribute("id", "character" + index + indexMatch)

    var buttonContainer = document.createElement('div')
    buttonContainer.classList.add("cell")
    buttonContainer.setAttribute("id", "buttonContainerMatch" + index + indexMatch)

    let button = createButton(indexMatch, "match", "Get video for this match", "blue")

    $(document).on('click', '#match' + index + indexMatch, function () {
        eventname = document.getElementById('eventname' + index + indexMatch).innerText
        fullRoundText = document.getElementById('fullRoundText' + index + indexMatch).innerText
        displayName = document.getElementById('displayName' + index + indexMatch).innerText
        game = document.getElementById('game' + index + indexMatch).innerText

        searchMatch(index, indexMatch, eventname, fullRoundText, displayName, game)
    })

    eventname.appendChild(document.createTextNode(document.getElementById('tournament' + index).innerText))
    displayName.appendChild(document.createTextNode(match.displayScore))
    fullRoundText.appendChild(document.createTextNode(match.fullRoundText))
    game.appendChild(document.createTextNode(document.getElementById('game' + index).innerText))
    character.appendChild(document.createTextNode(document.getElementById('character' + index).innerText))
    buttonContainer.appendChild(button)

    container.appendChild(eventname)
    container.appendChild(displayName)
    container.appendChild(fullRoundText)
    container.appendChild(game)
    container.appendChild(character)
    container.appendChild(button)

    insertAfter(container, matches)
}

// Create the main list of events 

function createList(data) {

    var events_container = document.getElementById('events_table')

    let playername = document.createElement('div')
    playername.classList.add("table")
    playername.setAttribute("id", "events")

    var header = document.createElement('div')
    header.classList.add("row")
    header.classList.add("header")

    var event = document.createElement('div')
    event.classList.add("cell")
    var slugheader = document.createElement('div')
    slugheader.classList.add("cell")
    var placeheader = document.createElement('div')
    placeheader.classList.add("cell")
    var gameheader = document.createElement('div')
    gameheader.classList.add("cell")
    var characterheader = document.createElement('div')
    characterheader.classList.add("cell")

    event.appendChild(document.createTextNode("Event"))
    slugheader.appendChild(document.createTextNode("Slug"))
    placeheader.appendChild(document.createTextNode("Place"))
    gameheader.appendChild(document.createTextNode("Game"))
    characterheader.appendChild(document.createTextNode("Character"))

    header.appendChild(event)
    header.appendChild(slugheader)
    header.appendChild(placeheader)
    header.appendChild(gameheader)
    header.appendChild(characterheader)

    playername.appendChild(header)

    events_container.appendChild(playername)


    for (let index = 0; index < data.data.player.events.length; index++) {
        let container = document.createElement('div')
        container.classList.add("row")
        container.setAttribute("id", "event" + index)
        playername.appendChild(container)

        var tournament = document.createElement('div')
        tournament.classList.add("cell")
        tournament.setAttribute("id", "tournament" + index)
        var slug = document.createElement('div')
        slug.classList.add("cell")
        slug.setAttribute("id", "slug" + index)
        var game = document.createElement('div')
        game.classList.add("cell")
        game.setAttribute("id", "game" + index)
        var place = document.createElement('div')
        place.classList.add("cell")
        place.setAttribute("id", "place" + index)
        var character = document.createElement('div')
        character.classList.add("cell")
        character.setAttribute("id", "character" + index)
        var buttonContainer = document.createElement('div')
        buttonContainer.classList.add("cell")
        buttonContainer.setAttribute("id", "buttonContainer" + index)

        let button = createButton(index, "brackets", "Get matches for this event", "green")

        $(document).on('click', '#brackets' + index, function () {
            name = document.getElementById('playername').innerText
            tournament = document.getElementById('tournament' + index).innerText
            slug = document.getElementById('slug' + index).innerText
            game = document.getElementById('game' + index).innerText
            loadMatches(index, tournament, name, slug, game)
        })

        tournament.appendChild(document.createTextNode(data.data.player.events[index].name))
        slug.appendChild(document.createTextNode(data.data.player.events[index].slug))
        place.appendChild(document.createTextNode(data.data.player.events[index].place))
        game.appendChild(document.createTextNode(data.data.player.events[index].game))
        character.appendChild(document.createTextNode(data.data.player.events[index].characters))
        buttonContainer.appendChild(button)

        container.appendChild(tournament)
        container.appendChild(slug)
        container.appendChild(place)
        container.appendChild(game)
        container.appendChild(character)
        container.appendChild(button)
    }
}

////////////////////////////////////

// Fetch Part //

///////////////////////////////////

//Load events for the player when clicking on the SUBMIT button
$("#find").click(function (e) {

    player = document.getElementById('player').value
    let url = "http://localhost:3000/playerFinder/player?name=" + player
    fade()
    spinner.removeAttribute('hidden')
    fetch(url, { mode: 'cors' }).then(response => response.json())
        .then(data => {
            if (data.success == true) {

                var elem = document.getElementById('events_table')

                if (elem != null) {
                    $(".table").remove()
                    $(document).off( "click", "**" )
                }

                document.getElementById("playerInformation").removeAttribute("hidden")
                playername.innerHTML = data.data.player.name
                createList(data)

                spinner.setAttribute('hidden', '')
                console.log(data)
            }
            else {

                var elem = document.getElementById('events')

                if (elem != null) {
                    $(".table").remove()
                    $(document).off( "click", "**" )
                }

                document.getElementById("playerInformation").removeAttribute("hidden")
                playername.innerHTML = "Error, no player found"
                spinner.setAttribute('hidden', '')
                console.log(data)
            }

        })
})

function searchMatch(index_event, index_match, eventname, fullRoundText, displayName, game) {
    let url = "http://localhost:3000/playerFinder/match?tourney=" + eventname + "&phase=" + fullRoundText + "&displayScore=" + displayName + "&game=" + game
    var button = document.getElementById('match' + index_match)

    fetch(url, { mode: 'cors' }).then(response => response.json())
        .then(data => {
            if (data.success === false) {
                console.log(data)
                alert("I can't find a video for this match!")
                button.disabled = true
            }
            else {
                console.log(data)
                alert("FOUND IT! link: " + data.data.link)
                window.open(data.data.link);
                button.disabled = true
            }
        })
}

function loadMatches(index, tournament, name, slug, game) {
    let url = "http://localhost:3000/playerFinder/event?" + "tournament=" + tournament + "&name=" + name + "&slug=" + slug + "&game=" + game
    console.log(url)
    var button = document.getElementById('brackets' + index)
    fetch(url, { mode: 'cors' }).then(response => response.json())
        .then(data => {
            if (data.success === false) {
                console.log(data)
                var new_event = prompt("I can't find an event, do you have any slug for this event? Enter it here", "https://smash.gg/tournament/slug/ like this, leave if not")
                if (new_event != null && new_event != "") {
                    loadMatches(index, tournament, name, new_event, game)
                }
                button.disabled = true
            }
            else {
                console.log(data)
                button.disabled = true
                createMatchViews(index, data)
            }
        })
}
