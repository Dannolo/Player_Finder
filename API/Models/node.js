
// constructor function for the List class
function Node(node) {
    this.id = node.id
    this.name = node.name
    this.slug = node.slug
}


// now we export the class so other modules can create node objects
module.exports = {
    Node: Node
}