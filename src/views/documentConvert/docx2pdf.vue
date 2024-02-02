<template>
    <input type="file" @change="convertDocxToPdf" />
</template>

<style>
/* Add your styles here */
</style>

<script setup>
import mammoth from 'mammoth/mammoth.browser';
import html2pdf from 'html2pdf.js';

const convertDocxToPdf = async (event) => {
  try {
    const file = event.target.files[0];
    if (!file) {
      console.log("未选择文件");
      return;
    }

    // Step 1: Convert DOCX to HTML
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    let html = result.value; // The generated HTML
    // 假设这里我们直接应用一些简单的样式
    const customStyle = `
      <style>
        h1, h2, h3 { color: #333; }
        p { line-height: 1.6; margin-bottom: 1em; }
      </style>
    `;
    // 将样式添加到HTML字符串中
    html = customStyle + html;

    // Step 2: Convert HTML to PDF
    const pdfOptions = {
      margin:       1,
      filename:     'converted.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // 使用html2pdf库将HTML字符串转换为PDF
    html2pdf().from(html).set(pdfOptions).toPdf().get('pdf').then(function (pdf) {
      var iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      iframe.src = pdf.output('bloburl');
      // 下载PDF
      const link = document.createElement('a');
      link.href = iframe.src;
      link.download = pdfOptions.filename;
      link.click();
      document.body.removeChild(iframe);
    });

    console.log("转换已完成");
  } catch (error) {
    console.error("转换失败", error);
    throw error;
  }
};
</script>
