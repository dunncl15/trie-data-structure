import Node from './trie-node.js';
require('locus');

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

    word.split('').forEach((letter, i) => {
      while (current.hasOwnProperty(letter)) {
        current = current[letter].children
        return current;
      }
      current[letter] = new Node(letter);
      if (word.length - 1 === i) {
        current[letter].isComplete = true;
        this.count++
      }
      current = current[letter].children;
    });

    // console.log(JSON.stringify(this.root, null, 4))
  }

  suggest(string) {
    let current = this.root;
    let stringArr = string.split('')
    let suggestions = [];

    stringArr.forEach(letter => {
      while (current.hasOwnProperty(letter)) {
        current = current[letter].children;
        return current;
      }
      this.isWord(current, string)
      });
    }

    isWord(node, string) {
      let key = Object.keys(node);
      if (key.isComplete) {
        eval(locus)
        suggestions.push(string)
      }
    }
    // if (current[string].isComplete !== true) {
    //   output.push(current[string].data);
    //   console.log(output);
    //   }
      // current = current[string].children;
      // console.log(current[string].children);
      // return this.suggest([current[string].data]);

      // populate(array) {
      //   array.forEach((word) => {
      //     this.insert(word);
      //   });
      // }
  }


export default Trie;
