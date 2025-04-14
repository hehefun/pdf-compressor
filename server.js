const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

const app = express();
const port = process.env.PORT || 3000;

app.use(fileUpload());
app.use(express.static('public'));

app.post('/compress', async (req, res) => {
  const { file } = req.files;

  const pdfDoc = await PDFDocument.load(file.data);
  const compressedPdf = await pdfDoc.compress();

  const pdfBytes = await compressedPdf.save();
  res.setHeader('Content-Disposition', 'attachment; filename="compressed.pdf"');
  res.setHeader('Content-Type', 'application/pdf');
  res.send(pdfBytes);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
