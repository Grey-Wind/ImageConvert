<template>
  <div id="app">
    <input type="file" @change="convertDocxToPdf" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import mammoth from 'mammoth/mammoth.browser';
import html2pdf from 'html2pdf.js';

const convertDocxToPdf = async (event) => {
  try {
    const file = event.target.files[0];
    if (!file) {
      console.log("No file selected.");
      return;
    }

    // Step 1: Convert DOCX to HTML
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const html = result.value; // The generated HTML
    const docStyles = result.styles; // The document's styles (might not be fully used in the conversion process)

    // Step 2: Convert HTML to PDF
    const pdfOptions = {
      margin:       1,
      filename:     'converted.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Using the html2pdf library to convert the HTML string to PDF
    html2pdf().from(html).set(pdfOptions).toPdf().get('pdf').then(function (pdf) {
      var iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      iframe.src = pdf.output('bloburl');
      // Download the PDF
      const link = document.createElement('a');
      link.href = iframe.src;
      link.download = pdfOptions.filename;
      link.click();
      document.body.removeChild(iframe);
    });

    console.log("Conversion successful.");
  } catch (error) {
    console.error("Conversion failed: ", error);
    throw error;
  }
};
</script>

<style>
/* Add your styles here */
</style>
