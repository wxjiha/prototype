const express = require('express');
const multer = require('multer');
const fs = require('fs');
const csvParser = require('csv-parser');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/checktransactions', (req, res) => {
    res.render('checktransactions');
});

router.post('/checktransactions', upload.single('transactionFile'), (req, res) => {
    const file = req.file;
    const textData = req.body.transactionText;

    let parsedFileData = [];
    let parsedTextData;

    if (file) {
        fs.createReadStream(file.path)
            .pipe(csvParser())
            .on('data', (row) => {
                parsedFileData.push(row);
            })
            .on('end', () => {
                fs.unlinkSync(file.path);

                if (textData) {
                    try {
                        parsedTextData = JSON.parse(textData);
                    } catch (error) {
                        parsedTextData = { error: "Invalid JSON provided in text input" };
                    }
                }

                const combinedData = {
                    fileData: parsedFileData,
                    textData: parsedTextData,
                };

                res.render('fraudresults', { combinedData });
            });
    } else {
        res.status(400).send("Please upload a valid file.");
    }
});

module.exports = router;
