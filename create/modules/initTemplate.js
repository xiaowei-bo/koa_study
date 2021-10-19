const fs = require("fs-extra");
const initTemplate = (srcDir, tarDir) => {
    return fs.copy(srcDir, tarDir);
}

module.exports = initTemplate;