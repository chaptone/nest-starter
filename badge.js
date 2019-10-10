const { readFile, writeFile } = require('fs')
const mkdirp = require('mkdirp');
const { get } = require('https');

const inputPath = './coverage/coverage-summary.json'
const outputPath = './badges'

const packagePath = ['total','cat']
const reportKeys = ['lines', 'statements', 'functions', 'branches'];

readFile(`${inputPath}`, 'utf8', (err, res) => {
  if (err) {
    throw err;
  }

  const report = JSON.parse(res)
  packagePath.forEach(getCalculateByPath(report))
  // reportKeys.forEach(getBadgeByKey(report));
});

const writeBadgeInFolder = (key, res, path) => {
  writeFile(`${outputPath}/badge-${path}-${key}.svg`, res, 'utf8', (writeError) => {
    if (writeError) {
      throw writeError;
    }
  });
}

const getCalculateByPath = report => (key) => {
  const keys = Object.keys(report).filter(r => r.includes(key))
  const reCalReport = keys.reduce((r, k) => {
    r[key].lines.total = r[key].lines.total ? r[key].lines.total + report[k].lines.total : report[k].lines.total
    r[key].lines.covered = r[key].lines.covered ? r[key].lines.covered + report[k].lines.covered : report[k].lines.covered
    r[key].lines.pct = r[key].lines.covered == 0 && r[key].lines.total == 0 ? 100 : Math.round(((r[key].lines.covered / r[key].lines.total) * 100) * 100) / 100
    r[key].functions.total = r[key].functions.total ? r[key].functions.total + report[k].functions.total : report[k].functions.total
    r[key].functions.covered = r[key].functions.covered ? r[key].functions.covered + report[k].functions.covered : report[k].functions.covered
    r[key].functions.pct = r[key].functions.covered == 0 && r[key].functions.total == 0 ? 100 : Math.round(((r[key].functions.covered / r[key].functions.total) * 100) * 100) / 100
    r[key].statements.total = r[key].statements.total ? r[key].statements.total + report[k].statements.total : report[k].statements.total
    r[key].statements.covered = r[key].statements.covered ? r[key].statements.covered + report[k].statements.covered : report[k].statements.covered
    r[key].statements.pct = r[key].statements.covered == 0 && r[key].statements.total == 0 ? 100 : Math.round(((r[key].statements.covered / r[key].statements.total) * 100) * 100) / 100
    r[key].branches.total = r[key].branches.total ? r[key].branches.total + report[k].branches.total : report[k].branches.total
    r[key].branches.covered = r[key].branches.covered ? r[key].branches.covered + report[k].branches.covered : report[k].branches.covered
    r[key].branches.pct = r[key].branches.covered == 0 && r[key].branches.total == 0 ? 100 : Math.round(((r[key].branches.covered / r[key].branches.total) * 100) * 100) / 100
    return r
  }, { [key]: { lines: {}, functions: {}, statements:{}, branches:{} } })
  reportKeys.forEach(getBadgeByKey(reCalReport, key))
}

const getColour = (coverage) => {
  if (coverage < 80) {
    return 'red';
  }

  if (coverage < 90) {
    return 'yellow';
  }

  return 'brightgreen';
};

const download = (url, cb) => {
  get(url, (res) => {
    let file = '';
    res.on('data', (chunk) => {
      file += chunk;
    });
    res.on('end', () => cb(null, file));
  }).on('error', err => cb(err));
}

const getBadgeByKey = (report, path) => (key) => {
  const url = getBadge(report, key, path);

  download(url, (err, res) => {
    if (err) {
      throw err;
    }
    mkdirp(outputPath, (folderError) => {
      if (folderError) {
        console.error(`Could not create output directory ${folderError}`);
      } else {
        writeBadgeInFolder(key, res, path);
      }
    })
  })
}

const getBadge = (report, key, path) => {
  if (!(report && report[path] && report[path][key])) {
    throw new Error('malformed coverage report');
  }

  const coverage = (!report[path][key] || typeof report[path][key].pct !== 'number') ? 0 : report[path][key].pct;
  const colour = getColour(coverage);

  return `https://img.shields.io/badge/Coverage${path == 'total' ? encodeURI(':') + key : ''}-${coverage}${encodeURI('%')}-${colour}.svg`;
}