import latex from 'node-latex';
import fs from 'fs';

const input = fs.createReadStream('risk_analysis.tex')
const output = fs.createWriteStream('generated_pdfs/analysis_1.pdf')
const pdf = latex(input)

pdf.pipe(output)
pdf.on('error', err => console.error(err))
pdf.on('finish', () => console.log('PDF generated!'))