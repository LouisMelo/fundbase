'user strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('date utils test', () => {
  it('should return 2019-01-29', () => {
    var result = index.today();
    expect(result).to.equal('2019-01-29');
  });

  it('should return 2018-01-29', () => {
    var result = index.lastYearToday();
    expect(result).to.equal('2018-01-29');
  });
});

describe('fund info test', () => {
  it('should return correct fullname', () => {
    index.getFundInfo('512880').subscribe((fund) => {
      expect(fund.full_name).to.equal('国泰中证全指证券公司交易型开放式指数证券投资基金')
    });
  });
});