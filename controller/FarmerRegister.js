const fs = require('fs')
const { google } = require('googleapis')
const express = require("express");
const app = express();
app.use(express.json());
const apikeys = require('./apikey.json')


const SCOPE = ['https://www.googleapis.com/auth/drive'];
const authorize = async () => {
    const jwtClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );
    await jwtClient.authorize();
    return jwtClient;
}

module.exports.farmerUploadFile = async (req, res) => {
    const uploadedFile = req.file;
    console.log(uploadedFile);
    if (!uploadedFile) {
        return res.status(400).json({ error: 'No file uploaded' });
    } try {
        const authClient = await authorize();
        const uploadedFileResponse = await uploadFile(authClient, uploadedFile);
        res.json({ uploadedFileResponse });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }

    // authorize().then(uploadFile).catch("error", console.error());
}



async function uploadFile(authClient, uploadedFile) {
    return new Promise((resolve, rejected) => {
        const drive = google.drive({ version: 'v3', auth: authClient });
        var fileMetaData = {
            name: uploadedFile.originalname,
            parents: ['1oohflBNXalqyiwgu6-8IVCchxcujwAez'] // A folder ID to which file will get uploaded
        }
        drive.files.create({
            resource: fileMetaData,
            media: {
                body: fs.createReadStream(uploadedFile.path), // files that will get uploaded
                mimeType: 'application/pdf'
            },
            fields: 'id'
        }, function (error, file) {
            if (error) {
                return rejected(error)
            }
            resolve(file);
        })
    });
}