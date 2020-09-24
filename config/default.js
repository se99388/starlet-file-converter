const path = require('path');
const getCurrentDay = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yy = today.getFullYear();
    return (mm + '-' + dd + '-' + yy);
}

//==============USER CHANGES START=================================
//THIS IS THE FOLDER WHERE YOU PUT YOUR FILES FOR CONVERTING 
//(__dirname = is the 'config' folder)
const readCurrentDir = path.resolve(__dirname, '..', 'input-file');

//THIS IS THE DEFUALT FOLDER WHERE YOU WILL FIND THE FILES AFTER THERE WERE CONVERTED
const resultDefaultDir = path.resolve(__dirname, '..');

//THIS IS THE FOLDER WHERE YOU WILL FIND THE FILES AFTER THERE WERE CONVERTED
//IF THIS PATH (FOLDER) WRONG OR NOT EXIST THE PROGARM WILL USE THE DEFUALT FOLDER 'resultDefaultDir' 
const DESTINATION_FOLDER = `C:/Applied Biosystems/QuantStudio Design & Analysis Software/User Files/Import/`;

//THIS IS PART OF THE FILE NAME. THE CONVERTED FILE NAME WILL BE THE SAME AS THE ORIGINAL FILE NAME. YOU HAVE THE OPTION TO ADD PREFIX OR NOT
const PREFIX_FILE_NAME = `result-${getCurrentDay()}-`;

//THIS IS THE HEADER OF THE FILE CONVERTED. DON'T DELETE IT BUT YOU CAN CHNAGE THE VALUES AS "Experiment Name", ETC. 
const HEADER_DATA =
    `* Block Type = 96-Well 0.2-mL Block
* Calibration Background is expired  = No
* Calibration Background performed on = 01-14-2020
* Calibration Pure Dye ABY is expired = No
* Calibration Pure Dye ABY performed on = 01-14-2020
* Calibration Pure Dye CY5 is expired = No
* Calibration Pure Dye CY5 performed on = 01-14-2020
* Calibration Pure Dye FAM is expired = No
* Calibration Pure Dye FAM performed on = 01-14-2020
* Calibration Pure Dye JUN is expired = No
* Calibration Pure Dye JUN performed on = 01-14-2020
* Calibration Pure Dye MUSTANG PURPLE is expired = No
* Calibration Pure Dye MUSTANG PURPLE performed on = 01-14-2020
* Calibration Pure Dye NED is expired = No
* Calibration Pure Dye NED performed on = 01-14-2020
* Calibration Pure Dye ROX is expired = No
* Calibration Pure Dye ROX performed on = 01-14-2020
* Calibration Pure Dye SYBR is expired = No
* Calibration Pure Dye SYBR performed on = 01-14-2020
* Calibration Pure Dye TAMRA is expired = No
* Calibration Pure Dye TAMRA performed on = 01-14-2020
* Calibration Pure Dye VIC is expired = No
* Calibration Pure Dye VIC performed on = 01-14-2020
* Calibration ROI is expired  = No
* Calibration ROI performed on = 01-14-2020
* Calibration Uniformity is expired  = No
* Calibration Uniformity performed on = 01-14-2020
* Chemistry = TAQMAN
* Date Created = 2020-09-07 10:08:23 AM IDT
* Experiment Barcode = NA
* Experiment Comment = NA
* Experiment File Name = C:\\Users\\Dana.HY-LABS\\AppData\\Local\\Microsoft\\Windows\\Temporary Internet Files\\Content.Outlook\\N0D29DSW\\COVID19 for Seegen kit 27-08-20 RAMBAMTz.eds
* Experiment Name = COVID19 for Seegen kit
* Experiment Run End Time = 2020-08-27 20:38:05 PM IDT
* Experiment Type = Standard Curve
* Instrument Name =       272523322
* Instrument Serial Number = 272523322
* Instrument Type = QuantStudio™ 5 System
* Passive Reference = 
* Post-read Stage/Step = 
* Pre-read Stage/Step = 
* Quantification Cycle Method = Ct
* Signal Smoothing On = true
* Stage/ Cycle where Ct Analysis is performed = Stage2, Step2
* User Name = NA

[Sample Setup]`;
//==============USER CHANGES END=================================

const SEEGEN_DATA_TABLE = [
    {
        'Sample Name': '',
        'Sample Color': '',
        'Biogroup Name': '',
        'Biogroup Color': '',
        'Target Name': 'E gene',
        'Target Color': '"RGB(142,56,142)"',
        'Task': 'UNKNOWN',
        'Reporter': 'FAM',
        'Quencher': 'NFQ-MGB',
        'Quantity': '',
        'Comments': ''
    },
    {
        'Sample Name': '',
        'Sample Color': '',
        'Biogroup Name': '',
        'Biogroup Color': '',
        'Target Name': 'IC',
        'Target Color': '"RGB(198,113,113)"',
        'Task': '',
        'Reporter': 'VIC',
        'Quencher': 'NFQ-MGB',
        'Quantity': '',
        'Comments': ''
    },
    {
        'Sample Name': '',
        'Sample Color': '',
        'Biogroup Name': '',
        'Biogroup Color': '',
        'Target Name': 'N gene',
        'Target Color': '"RGB(238,220,130)"',
        'Task': 'UNKNOWN',
        'Reporter': 'CY5',
        'Quencher': 'NFQ-MGB',
        'Quantity': '',
        'Comments': ''
    },
    {
        'Sample Name': '',
        'Sample Color': '',
        'Biogroup Name': '',
        'Biogroup Color': '',
        'Target Name': 'RdRP',
        'Target Color': '"RGB(0,245,255)"',
        'Task': 'UNKNOWN',
        'Reporter': 'ROX',
        'Quencher': 'NFQ-MGB',
        'Quantity': '',
        'Comments': ''
    }
]
module.exports = {
    readCurrentDir,
    HEADER_DATA,
    SEEGEN_DATA_TABLE,
    DESTINATION_FOLDER,
    PREFIX_FILE_NAME,
    resultDefaultDir
}