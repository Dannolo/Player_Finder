//Constant variable from HTML document

const spinner = document.getElementById("spinner");
const xhr = new XMLHttpRequest();


//Player variable for the call
let player = null

function fade() {
    $("#how").fadeOut("slow");
    $("#team").fadeOut("slow");
};


//Load datas
function loadData() {
    player = document.getElementById('player').value
    let url = "http://localhost:3000/player/?name=" + player
    fade()
    spinner.removeAttribute('hidden');
    fetch(url, {mode: 'cors'}).then(response => response.json())
        .then(data => {
            spinner.setAttribute('hidden', '');
            $("#Player_Name").value = data.name
            console.log(data)
        });
}
