import PDFDocument from 'pdfkit';
import fs from 'fs';

// Create a new PDF document
const doc = new PDFDocument();

// Pipe the PDF document to a writable stream (e.g., a file)
const stream = fs.createWriteStream('risk_analysis.pdf');
doc.pipe(stream);


var company_name = "SteelWorks Inc.";

// draw some text
doc.fontSize(25).text('Risk Analysis for Supply Chain Due Diligence', 100, 300);

// and some justified text wrapped into columns

var background = "In today's globalized economy, supply chains have become increasingly complex, involving multiple stakeholders and spanning across different countries and regions. The growing recognition of the importance of responsible business practices has led to the introduction of legislation such as the Supply Chain Due Diligence Act, both at the national and European levels. These regulations aim to ensure that businesses uphold human rights, promote environmental sustainability, and prevent adverse impacts on communities and workers throughout the supply chain. This risk analysis encompasses the entirety of our supply chain, including all entities involved in the production, manufacturing, distribution, and sale of our products. It covers our suppliers, subcontractors, and other relevant business partners, irrespective of their location or the nature of their involvement.";

doc.font('Times-Roman', 13).text(background, 100, 450)

doc.addPage();

doc
  .font('Times-Roman', 15)
  .text('Approach and Methodology', 100, 100)
  .font('Times-Roman', 13)
  .moveDown()
  .text(background, {
    width: 412,
    align: 'justify',
    indent: 30,
    columns: 2,
    height: 300,
    ellipsis: true
  });

// end and display the document in the iframe to the right
doc.end();
stream.on('finish', function() {
  console.log('PDF created successfully.');
});

// Handle any errors during the PDF generation
doc.on('error', (err) => {
  console.error('Error generating PDF:', err);
});