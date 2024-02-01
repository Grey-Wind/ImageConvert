import mammoth from 'mammoth';
import { exec } from 'child_process';

const convertDocxToPdf = async (docxFile) => {
  try {
    const html = await mammoth.convertToHtml(docxFile);

    const pdfFilePath = 'converted.pdf';
    const htmlFilePath = 'converted.html';

    fs.writeFileSync(htmlFilePath, html);

    const command = `wkhtmltopdf ${htmlFilePath} ${pdfFilePath}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log('PDF file created successfully');
    });

    const pdfBlob = new Blob([fs.readFileSync(pdfFilePath)], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'converted.pdf';
    link.click();

    URL.revokeObjectURL(pdfUrl);
    fs.unlinkSync(htmlFilePath);
    fs.unlinkSync(pdfFilePath);
  } catch (error) {
    console.error('Error converting docx to pdf:', error);
  }
};

export default convertDocxToPdf;
