import Node from './trie-node.js';

class Trie {
  constructor() {
    this.root = {};
    this.count = 0;
  }

  insert(word) {
    let current = this.root;
    let firstLetter = word.charAt(0);

    if(!current.hasOwnProperty(firstLetter)) {
      Object.assign(current, {[firstLetter] : new Node(firstLetter)})
    }

    word.split('').forEach((letter) => {
      while (current.hasOwnProperty(letter)) {
        current = current[letter].children
        return current;
      }
      current[letter] = new Node(letter);
      current = current[letter].children;
    })

    console.log(JSON.stringify(this.root, null, 4))


    // while (!this.root.hasOwnProperty(letter) {
    //   Object.assign(root, {letter: new Node(letter)});
    // }
    // console.log(this.root);
    //
    //
    //
    // if (!this.root.hasOwnProperty(word.charAt(0))) {
    }

  }

  export default Trie;
