'use strict';

const expect = require('chai').expect;
const converter = require('../index');

describe('convertCharacter', function() {
  const { convertCharacter } = converter;

  it('should convert nothing to undefined', function() {
    const result = convertCharacter();
    expect(result).to.equal(undefined);
  });

  it('should convert undefined to undefined', function() {
    const result = convertCharacter(undefined);
    expect(result).to.equal(undefined);
  });

  it('should not convert \'\'', function() {
    const result = convertCharacter('');
    expect(result).to.equal('');
  });

  it('should not convert 👍', function() {
    const result = convertCharacter('👍');
    expect(result).to.equal('👍');
  });

  it('should not convert 👋🏿', function() {
    const result = convertCharacter('👋🏿');
    expect(result).to.equal('👋🏿');
  });

  it('should convert  to 卿', function() {
    const result = convertCharacter('');
    expect(result).to.equal('卿');
  });

  it('should convert  to 瑜', function() {
    const result = convertCharacter('');
    expect(result).to.equal('瑜');
  });

  it('should convert  to 港', function() {
    const result = convertCharacter('');
    expect(result).to.equal('港');
  });
  
  it('should not convert string with length > 1 (i.e. return original input)', function() {
    const result = convertCharacter('ABC');
    expect(result).to.equal('ABC');
  });

  it('should convert U+F325 to \'Ê̄\' (<00CA,0304>)', function() {
    const result = convertCharacter(String.fromCodePoint(0xf325));
    expect(result).to.equal('Ê̄');
  });

  it('should convert U+2A3ED to 㴝', function() {
    const result = convertCharacter(String.fromCodePoint(0x2A3ED));
    expect(result).to.equal('㴝');
  });

  it('should not convert 我', function() {
    const result = convertCharacter('我');
    expect(result).to.equal('我');
  });

  it('should not convert 我們', function() {
    const result = convertCharacter('我們');
    expect(result).to.equal('我們');
  });

  it('should convert U+E6C5 to 𤧬', function() {
    const result = convertCharacter(String.fromCodePoint(0xE6C5));
    expect(result).to.equal('𤧬');
  });

  it('should convert U+E6C6 to 浧', function() {
    const result = convertCharacter(String.fromCodePoint(0xE6C6));
    expect(result).to.equal('浧');
  });

  // Big5 has two duplicate characters.
  // They both have direct mappings into Unicode, but we can standardize.

  it('should convert U+5140 to 兀', function() {
    const result = convertCharacter(String.fromCodePoint(0x5140));
    expect(result).to.equal('兀');
  });

  it('should convert U+FA0C to 兀', function() {
    const result = convertCharacter(String.fromCodePoint(0xFA0C));
    expect(result).to.equal('兀');
  });

  it('should convert U+55C0 to 嗀', function() {
    const result = convertCharacter(String.fromCodePoint(0x55C0));
    expect(result).to.equal('嗀');
  });

  it('should convert U+FA0D to 嗀', function() {
    const result = convertCharacter(String.fromCodePoint(0xFA0D));
    expect(result).to.equal('嗀');
  });

  // Numerals

  it('should not convert U+5341', function() {
    const result = convertCharacter(String.fromCodePoint(0x5341));
    expect(result).to.equal('十');
  });

  it('should not convert U+5344', function() {
    const result = convertCharacter(String.fromCodePoint(0x5344));
    expect(result).to.equal('卄');
  });

  it('should not convert U+5345', function() {
    const result = convertCharacter(String.fromCodePoint(0x5345));
    expect(result).to.equal('卅');
  });

});

describe('convertString', function() {
  const { convertString } = converter;

  it('should convert nothing to undefined', function() {
    const result = convertString();
    expect(result).to.equal(undefined);
  });

  it('should convert undefined to undefined', function() {
    const result = convertString(undefined);
    expect(result).to.equal(undefined);
  });

  it('should not convert \'\'', function() {
    const result = convertString('');
    expect(result).to.equal('');
  });

  it('should not convert 👍', function() {
    const result = convertString('👍');
    expect(result).to.equal('👍');
  });

  it('should not convert 🦉👋🏿', function() {
    const result = convertString('🦉👋🏿');
    expect(result).to.equal('🦉👋🏿');
  });

  it('should convert  to 卿', function() {
    const result = convertString('');
    expect(result).to.equal('卿');
  });

  it('should convert  to 瑜', function() {
    const result = convertString('');
    expect(result).to.equal('瑜');
  });

  it('should convert  to 港', function() {
    const result = convertString('');
    expect(result).to.equal('港');
  });
  
  it('should convert U+F325 to \'Ê̄\' (<00CA,0304>)', function() {
    const result = convertString(String.fromCodePoint(0xf325));
    expect(result).to.equal('Ê̄');
  });

  it('should convert U+2A3ED to 㴝', function() {
    const result = convertString(String.fromCodePoint(0x2A3ED));
    expect(result).to.equal('㴝');
  });

  it('should convert , to 𥄫,𨋢', function() {
    const result = convertString(',')
    expect(result).to.equal('𥄫,𨋢');
  });

  it('should not convert ABC', function() {
    const result = convertString('ABC')
    expect(result).to.equal('ABC');
  });

  it('should not convert 我', function() {
    const result = convertString('我');
    expect(result).to.equal('我');
  });

  it('should not convert 我們', function() {
    const result = convertString('我們');
    expect(result).to.equal('我們');
  });

  it('should convert 壞 to 壞𨋢', function() {
    const result = convertString('壞');
    expect(result).to.equal('壞𨋢');
  });
});
