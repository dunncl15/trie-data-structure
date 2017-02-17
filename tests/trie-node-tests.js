import { expect } from 'chai';
import Node from '../lib/trie-node.js';

describe('Node tests', ()=> {
  it('should be a constructor', ()=> {
    let node = new Node();

    expect(node).to.be.instanceof(Node);
  });

  it('should have a property of data with value "d"', ()=> {
    let node = new Node('d');

    expect(node.data).to.equal('d');
  });

  it('should have an isComplete property with default value of false', ()=> {
    let node = new Node('d');

    expect(node.isComplete).to.equal(false);
  });

  it('should have a children property that is an empty object by default', ()=> {
    let node = new Node('d');

    expect(node.children).to.be.an('object')
                         .to.be.empty;
  });
});
