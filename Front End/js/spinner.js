//Constant variable from HTML document

const spinner = document.getElementById("spinner");
const xhr = new XMLHttpRequest();


//Player variable for the call
let player = null

function fade() {
    $("#how").fadeOut("slow");
    $("#team").fadeOut("slow");
};

function createPlayer(data){

    var description = document.getElementById('description')
    var entry = document.createElement('li')
    var entry1 = document.createElement('li')
    var entry2 = document.createElement('li')

    entry.appendChild(document.createTextNode(data.data.player.realname))
    description.appendChild(entry)

    entry1.appendChild(document.createTextNode(data.data.player.country))
    description.appendChild(entry1)

    entry2.appendChild(document.createTextNode(data.data.player.team))
    description.appendChild(entry2)

}

function createList(data){

    let playername = document.getElementById('events')
    for (let index = 0; index < data.data.player.events.length; index++) {
        var entry = document.createElement('li')
        entry.appendChild(document.createTextNode(data.data.player.events[0].name))
        playername.appendChild(entry)
    }
}

//Load datas
function loadData() {
    player = document.getElementById('player').value
    let url = "http://localhost:3000/playerFinder/player?name=" + player
    fade()
    spinner.removeAttribute('hidden');
    fetch(url, {mode: 'cors'}).then(response => response.json())
        .then(data => {

            playername.innerHTML = data.data.player.name
            createPlayer(data)
            createList(data)
            var list = document.getElementById('events')
            var entry = document.createElement('li')
            spinner.setAttribute('hidden', '')
            console.log(data.data.player.name)

            console.log(data)
        });
}
