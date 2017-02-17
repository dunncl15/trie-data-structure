import { expect } from 'chai';
import Trie from '../lib/trie.js';
import fs from 'fs';
const text = '/usr/share/dict/words';
const dictionary = fs.readFileSync(text, 'utf-8').toLowerCase().trim().split('\n');
require('locus');

describe('Trie tests', ()=> {
  it('should be a constructor', ()=> {
    let trie = new Trie();
    expect(trie).to.be.instanceof(Trie);
  });

  it('trie.root should return an object', ()=> {
    let trie = new Trie();

    expect(trie.root).to.be.an('object');
  });

  it('trie.suggestions should return an empty array', ()=> {
    let trie = new Trie();

    expect(trie.suggestions).to.deep.equal([]);
  });

  it('the root should have a property of "d"', ()=> {
    let trie = new Trie();
    trie.insert('dogs');

    expect(trie.root).to.have.property('d');
  });

  it('should create new branch after shared characters', ()=> {
    let trie = new Trie();
    trie.insert('pup');
    trie.insert('pull');

    expect(trie.root).to.have.property('p')
                     .to.have.property('children')
                     .to.have.property('u')
                     .to.have.property('children')
                     .to.have.keys('p', 'l');

  });

  it('should change isComplete property to true for each complete word', ()=> {
    let trie = new Trie();
    trie.insert('pup');
    trie.insert('pull');

    expect(trie.root).to.have.property('p')
                     .to.have.property('children')
                     .to.have.property('u')
                     .to.have.property('children')
                     .to.have.property('p')
                     .to.have.property('isComplete')
                     .to.equal(true);

    expect(trie.root).to.have.property('p')
                     .to.have.property('children')
                     .to.have.property('u')
                     .to.have.property('children')
                     .to.have.property('l')
                     .to.have.property('children')
                     .to.have.property('l')
                     .to.have.property('isComplete')
                     .to.equal(true);
  });

  it('should increase count after a word is completed', ()=> {
    let trie = new Trie();
    trie.insert('pup');
    trie.insert('pull');
    trie.insert('puppies');
    trie.insert('pulse');
    trie.insert('pulmonary');
    trie.insert('pupil');
    trie.insert('project');
    trie.insert('program');
    trie.insert('programmatic');
    trie.insert('progress');
    trie.insert('progressive');
    trie.suggest('pu');

    expect(trie.count).to.equal(11);
  });

  it('should have a find last node function', ()=> {
    let trie = new Trie();
    trie.insert('pup');
    trie.insert('pull');
    let lastNode = trie.findLastNode('pu');

    expect(Object.keys(lastNode)).to.deep.equal(['p','l']);
  });

  it('should have a root object contain keys of every letter in the alphabet', ()=> {
    let trie = new Trie();
    trie.populate(dictionary);
    expect(trie.root).to.be.an('object')
                     .to.have.all.keys(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);
  });

  it('should be able to suggest words with like prefixes', ()=> {
    let trie = new Trie();
    trie.populate(dictionary);
    trie.suggest('piz');

    expect(trie.suggestions).to.deep.equal(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);
  });

  it.skip('should adjust suggestions based on selected words', ()=> {
    let trie = new Trie();
    trie.populate(dictionary);
    trie.suggest('piz');
    expect(trie.suggestions).to.deep.equal(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);

    trie.select('piz', 'pizzeria');
    trie.suggest('piz');

    expect(trie.suggestions).to.deep.equal(['pizzeria', 'pize', 'pizza', 'pizzicato', 'pizzle']);
  });
});
