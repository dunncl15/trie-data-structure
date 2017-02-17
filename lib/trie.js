import Node from './trie-node.js';
require('locus');

class Trie {
  constructor() {
    this.root = {};
    this.count = 0;
    this.suggestions = [];
  }

  insert(word) {
    let current = this.root;
    let firstLetter = word.charAt(0);

    if(!current.hasOwnProperty(firstLetter)) {
      Object.assign(current, {[firstLetter] : new Node(firstLetter)});
    }

    word.split('').forEach((letter, i) => {
      if (current.hasOwnProperty(letter)) {
        current = current[letter].children;
        return current;
      }
      current[letter] = new Node(letter);
      if (word.length - 1 === i) {
        current[letter].isComplete = true;
        this.count++;
      }
      current = current[letter].children;
    });
  }

  suggest(string) {
    let lastNode = this.findLastNode(string);
    this.isWord(lastNode, string);
  }

  isWord(node, string) {
    let fragments = [];
    let keys = Object.keys(node);
    keys.forEach(key => {
      if (node[key].isComplete) {
        fragments.push(node[key].data);
        this.suggestions.push(string + fragments.join(''));
      } else {
        this.isWord(node[key].children, string + node[key].data);
      }
    });
  }

  findLastNode(string) {
    let current = this.root;
    string.split('').forEach(letter => {
      current = current[letter].children;
    });
    return current;
  }

  populate(array) {
    array.forEach((word) => {
      this.insert(word);
    });
  }
}

export default Trie;
