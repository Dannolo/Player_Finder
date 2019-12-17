// rewriting name taken from Shoryuken site to be able to use them to search tourney in Smash.gg
function validateName(name){
    return validateNameSpace(validateNameComma(name))
}

// rewriting name taken from Shoryuken site to be able to use them to search tourney in Smash.gg
function validateNameComma(name){
    for (let index = 0; index < name.length; index++) {
        if(name[index] == "-"){
            name = name.substring(0, index-1)
            return name
        }
    }
    return name
}

// rewriting name taken from Shoryuken site to be able to use them to search tourney in Smash.gg
function validateNameSpace(name){
    return name.split(' ').join('-')
}

// now we export the class so other modules can create Tournament objects
exports.validateName = validateName