const config = require('config');
const seegenDataTable = config.get('SEEGEN_DATA_TABLE');
const path = require('path');
const fs = require("fs");

const folderIsExist = (destFolder) => {
    return new Promise((resolve, reject) => {
        fs.access(destFolder, function (err) {
            if (err && err.code === 'ENOENT') {
                //should add the err message
                reject(destFolder + ` doesn't exist. Find you files at: ${config.get('resultDefaultDir')}`)
            }
            else {
                resolve('success');
            }
        });
    });
}

const createFullPathAndFileName = async (fileName) => {
    const fileNameOnly = path.parse(fileName).name;
    let destFolder = config.get('DESTINATION_FOLDER');
    const prefixFileName = config.get('PREFIX_FILE_NAME');
    const extFile = `.txt`;
    try {
        await folderIsExist(destFolder);
    }
    catch (e) {
        console.log('error:', e);
        destFolder = config.get('resultDefaultDir');
    }
    return path.join(destFolder, prefixFileName + fileNameOnly + extFile);
}

const createInitialContentJson = (readedFileData) => {
    //create 'well' and 'well position' keys with their values
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const rowsNum = 12
    let initalObj = {};
    let wellNum = 0;
    columns.forEach((column, index) => {
        for (let i = 0; i < rowsNum; i++) {
            const row = i + 1;
            const wellPosition = column + row
            wellNum += 1;
            initalObj[wellPosition] = createRows(wellPosition, wellNum);
        }
    });

    //convert csv data sheet to array of objects
    let result = readedFileData
    result = result.map(item => {
        const wellPosition = item['Row'] + item['Column'];
        if (initalObj[wellPosition]) {
            //add key value to each object in the 'wellPosition' property=> {'Sample Name':''}
            let fourWellPositions = initalObj[wellPosition];
            fourWellPositions.forEach((eachWell) => {
                eachWell['Sample Name'] = item['*Sample Name'];
            })
        }
    })
    let flattedArr = [].concat(...Object.values(initalObj));
    return flattedArr;
}

const createRows = (wellPosition, wellNum) => {
    let initalArr = [];
    const NumOfRows = 4;
    for (let i = 0; i < NumOfRows; i++) {
        initalArr.push({
            'Well': wellNum,
            'Well Position': wellPosition,
            ...seegenDataTable[i]
        });
    }
    return initalArr;
}

const parseJsonKeysToStringByDelimeter = (arrayOfObjects, delimeter) => 
`${Object.keys(arrayOfObjects[0]).join(delimeter)}\n`;


const parseJsonValuesToStringByDelimeter = (arrayOfObjects) =>
    arrayOfObjects.reduce((accum, curr) =>
        accum += `${Object.values(curr).join('\t')}\n`, '');

module.exports = {
    folderIsExist,
    createFullPathAndFileName,
    createInitialContentJson,
    parseJsonKeysToStringByDelimeter,
    parseJsonValuesToStringByDelimeter

}