import latex from 'node-latex';
import fs from 'fs';

const source = fs.readFileSync('risk_analysis.tex').toString()
const output = fs.createWriteStream('generated_pdfs/analysis_1.pdf')

// multiple passes are needed for the table of contents
const options = {
    passes: 2
};

const pdf = latex(source, options)

pdf.pipe(output)
pdf.on('error', err => console.error(err))
pdf.on('finish', () => console.log('PDF generated!'))