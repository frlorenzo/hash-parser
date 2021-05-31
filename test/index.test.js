import { expect } from 'chai';
import * as hash from '../index.js';


describe('unit: parse', () => {

  it('parse url', (done) => {
    let o = hash.parse('#person/123/view?foo=1&bar=a');
    expect(o.id).to.be.a('string');
    expect(o.name).to.be.a('string');
    expect(o.verb).to.be.a('string');
    expect(typeof o.query).to.equal('object');
    expect(o.path).to.be.a('string');

    expect(o.id).to.equal('123');
    expect(o.name).to.equal('person');
    expect(o.verb).to.equal('view');
    expect(o.query.foo).to.equal('1');
    expect(o.query.bar).to.equal('a');
    expect(o.path).to.equal('/person/:id/view');

    done();
  });

  it ('invalid - foo', (done) => {
    expect(() => {
      hash.parse('#/foo');
    }).to.throw();
    done();
  });

  it ('invalid - /foo', (done) => {
    expect(() => {
      hash.parse('#/foo');
    }).to.throw();
    done();
  });

  it ('invalid - #/foo', (done) => {
    expect(() => {
      hash.parse('#/foo');
    }).to.throw();
    done();
  });
});


describe('unit: params', () => {
  it('get params', (done) => {
    let p = hash.params('#person/123/view?foo=1&bar=a');

    expect(p.has('foo')).to.be.true;
    expect(p.get('foo')).to.equal('1');

    expect(p.has('bar')).to.be.true;
    expect(p.get('bar')).to.equal('a');
    done();
  });

  it ('no params w/ ?', () => {
    let p = hash.params('#person/123/view?');
    expect(p).to.equal(null);
  });

  it ('no params w/o ?', () => {
    let p = hash.params('#person/123/view');
    expect(p).to.equal(null);
  });

  it ('invalid - foo', (done) => {
    expect(() => {
      hash.params('#/foo');
    }).to.throw();
    done();
  });

  it ('invalid - /foo', (done) => {
    expect(() => {
      hash.params('#/foo');
    }).to.throw();
    done();
  });

  it ('invalid - #/foo', (done) => {
    expect(() => {
      hash.params('#/foo');
    }).to.throw();
    done();
  });

});


//- end
