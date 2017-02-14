import { expect, assert } from 'chai';
import Trie from '../lib/trie.js'

describe('Trie tests', ()=> {
  it('should be a function', ()=> {
    assert.isFunction(Trie);
  });

  it('should add letter to root object', ()=> {
    let trie = new Trie();
    trie.insert('tries');
  })
})
