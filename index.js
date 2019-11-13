const ls= require("ls");
const PDFDocument = require('pdfkit');
const blobSteam = require("blob-stream");

const doc = new PDFDocument;
// var stream= doc.pipe