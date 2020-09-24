const fs = require("fs");
const path = require('path');
const csv = require('csv-parser');
const config = require('config');
const { createFullPathAndFileName, createInitialContentJson, parseJsonKeysToStringByDelimeter, parseJsonValuesToStringByDelimeter } = require('./utils/utils');
let headerData = config.get('HEADER_DATA');
const tempDIr = config.get('readCurrentDir');




fs.readdir(tempDIr, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
    files.forEach(filename => {
        gatherData(tempDIr, filename);
    })
});

function gatherData(tempDIr, filename) {
    console.log('My readed filename: ', filename);
    const extFile = path.parse(filename).ext;

    if (extFile !== '.csv') {
        console.log('This is not csv file')
        return;
    }
    const fullPath = path.join(tempDIr, filename);
    let fileData = []
    const stream = fs.createReadStream(fullPath, { encoding: 'utf-8' });
    stream
        .pipe(csv())
        .on('data', (chunk) => {
            fileData.push(chunk);
        })
        .on('end', async () => {
            let result = createInitialContentJson(fileData);
            let str = `${headerData}\n`
            str += parseJsonKeysToStringByDelimeter(result, delimeter = '\t')
            str += parseJsonValuesToStringByDelimeter(result, delimeter = '\t')

            // console.log(str);
            const fullFileName = await createFullPathAndFileName(filename);
            fs.writeFile(`${fullFileName}`, str, (err) => { err && console.log(err) });

            //remove the file
            fs.unlink(fullPath, (err) => {
                if (err) throw err;
                console.log(filename + " was deleted");
            });
        })

}





