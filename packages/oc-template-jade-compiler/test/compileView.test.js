const path = require('path');
const fs = require('fs-extra');
const compileView = require('../lib/compileView.js');

const componentPath = path.join(__dirname, '../../../mocks/jadeComponent');
const publishPath = path.join(componentPath, '_package');
const publishFileName = 'template.js';

const options = {
  componentPackage: {
    oc: {
      files: {
        template: {
          src: 'template.jade',
          type: 'jade'
        }
      }
    }
  },
  componentPath,
  publishPath,
  publishFileName
};

test('Should correctly compile the view', done => {
  // fs.ensureDirSync(publishPath);
  compileView(options, (err, compiledViewInfo) => {
    expect(compiledViewInfo).toMatchSnapshot();
    expect(
      fs.readFileSync(path.join(publishPath, publishFileName), 'UTF8')
    ).toMatchSnapshot();
    fs.removeSync(path.join(publishPath, publishFileName));
    done();
  });
});
