import { expect, assert } from 'chai';
import Trie from '../lib/trie.js';
import fs from 'fs';
const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString('utf-8').trim().split('\n');
require('locus');

describe('Trie tests', ()=> {
  it('should be a function', ()=> {
    assert.isFunction(Trie);
  });

  it('trie.root should return an object', ()=> {
    let trie = new Trie();

    expect(trie.root).to.be.an('object');
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

  it('should toggle word to complete', ()=> {
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
    trie.insert('project')
    trie.insert('program');
    trie.insert('programmatic')
    trie.insert('progress');
    trie.insert('progressive')
    console.log(trie.root);
    console.log(trie.root['p'].children['u']);
    expect(trie.count).to.equal(11);
  });

  it('should be able to import the dictionary and create Trie', ()=> {
    let trie = new Trie();
    trie.populate(dictionary);

    expect(trie.count).to.equal(235886);
  });


  it.only('', () => {
    let trie = new Trie();
    trie.insert('pup');
    trie.suggest('pu');

  })

});
