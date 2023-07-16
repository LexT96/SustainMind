import fs from 'fs';
import util from 'util';
import axios from "axios";
import { findMaxRiskScores } from '../models/customer.js';

/* Code for local pdf compilation
//const source = fs.readFileSync('risk_analysis.tex').toString()
const output = fs.createWriteStream('generated_pdfs/analysis_4.pdf')

// multiple passes are needed for the table of contents
const options = {
    passes: 2
};*/

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('en-GB', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});

const pathName = "public/risk_analysis/pdfs/"

export const getPdf = async (companyName, suppliers) => {
const source = construct_pdf(companyName, formattedDate, suppliers);
  const res = await axios.post(
    "https://latex.ytotech.com/builds/sync",
    {
      compiler: "pdflatex",
      resources: [
        {
          main: true,
          content: source,
        },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/pdf'
      },
      responseType: "arraybuffer",
    }
  );
  try {
    const pdfData = res.data;
    const fileName = "analysis_" + +new Date() + ".pdf";
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(pathName + fileName, pdfData);
    console.log("PDF file saved successfully!");
    const path = pathName + fileName;
    return {path};
  } catch (error) {
  }
}

function escapeLatexSpecialCharacters(text) {

  if (typeof text === 'number') {
    return text
  }

  let str = String(text);
  
  const latexSpecialCharacters = {
    '#': '\\#',
    '$': '\\$',
    '%': '\\%',
    '&': '\\&',
    '~': '\\textasciitilde{}',
    '_': '\\_',
    '^': '\\textasciicircum{}',
    '\\': '\\textbackslash{}',
    '{': '\\{',
    '}': '\\}'
  };

  return str.replace(/[#\$%&~_^\\{}]/g, function(match) {
    return latexSpecialCharacters[match];
  });
}

function construct_pdf(companyName, date, suppliers){

    companyName = escapeLatexSpecialCharacters(companyName)

    let text = "\\documentclass{article}\n"
        + "\\usepackage{titlesec}\n"
        + "\\usepackage{xcolor}\n"
        + "\\usepackage{tikz}\n"
        + "\\usetikzlibrary{calc}\n"
        + "\\usepackage{ifthen}\n"

    text += String.raw`
    \definecolor{sustainblue}{HTML}{A3CDFF}
    \definecolor{sustaingrey}{HTML}{D9D9D9}`


    text += String.raw`\def\companyname{`
    text += companyName + '}'

    text += String.raw`
    \makeatletter
    \newdimen\skillb@level
    \newdimen\skillb@length
    \newdimen\skillb@height
    \skillb@length=3pt% * 100
    \skillb@height=10pt%
    \newcommand*{\skillbar}[1]{%
        \skillb@level=\dimexpr#1 \skillb@length \relax%
        {\color{sustainblue}\rule{\skillb@level}{\skillb@height}}%
        {\color{sustaingrey}%
            \rule{\dimexpr\skillb@length*100-\skillb@level\relax}{\skillb@height}}%
    }
    \newcommand*{\risk}[2]{%
        \par\noindent%
        \ifthenelse{\lengthtest{#2 pt < 0 pt}}{
            {\hskip 1ex\small #1 \color{red}(No data avilable)}\\%
            \skillbar{0}%
        }{
            {\hskip 1ex\small #1 (#2/100.0 - \ifthenelse{\lengthtest{#2 pt < 30 pt} }{low}{\ifthenelse{\lengthtest{#2 pt < 70 pt} }{medium}{high}} risk)}\\%
            \skillbar{#2}%
        }
    }
    \makeatother

    \titlespacing*{\section}
    {0pt}{15ex plus 1ex minus .2ex}{4.3ex plus .2ex}

    \title{Risk Analysis for Supply Chain Due Diligence}
    \author{\companyname}
    `
    
    text += String.raw`\date{` + date + `}`

    text += String.raw`

    \begin{document}

    \maketitle
    \thispagestyle{empty}

    \newpage

    \tableofcontents

    \newpage

    \section{Introduction}

    In today's globalized economy, supply chains have become increasingly complex, involving multiple stakeholders and spanning across different countries and regions.
    The growing recognition of the importance of responsible business practices has led to the introduction of legislation such as the Supply Chain Due Diligence Act,
    both at the national and European levels. These regulations aim to ensure that businesses uphold human rights, promote environmental sustainability, and prevent
    adverse impacts on communities and workers throughout the supply chain. This risk analysis encompasses the entirety of our supply chain, including all entities
    involved in the production, manufacturing, distribution, and sale of our products. It covers our suppliers, subcontractors, and other relevant business partners,
    irrespective of their location or the nature of their involvement. By conducting this analysis, we aim to fulfill our legal obligations and contribute to a more
    sustainable and ethical supply chain.

    \section{Policy Statement}

    At \companyname, we are committed to upholding the principles and objectives outlined in the German Lieferkettengesetz (Supply Chain Due Diligence Act).
    We recognize the importance of responsible business practices and the critical role they play in ensuring human rights, labor rights, and environmental
    standards throughout our supply chain.

    As a company operating in Germany, we fully support the Supply Chain Due Diligence Act's goal of promoting sustainable and ethical supply chain management. We are
    dedicated to actively implementing the requirements set forth by this legislation, as well as going beyond compliance to foster positive change within our
    operations and among our suppliers.

    Our commitment to the Lieferkettengesetz is demonstrated through the following key principles:

    1. Due Diligence: We are committed to conducting thorough due diligence throughout our supply chain to identify and address potential risks and adverse impacts
    on human rights, labor rights, and the environment. We will establish robust procedures to assess, prevent, mitigate, and account for these risks, ensuring
    our suppliers adhere to the same standards.
    2. Transparency and Reporting: We believe in the power of transparency and accountability. We will strive to provide clear and accurate information regarding
    our supply chains, including details of our due diligence processes, supplier assessments, and any remediation actions taken. We are committed to regular reporting
    to stakeholders, including relevant authorities, to foster trust and promote industry-wide transparency.
    3. Collaboration and Engagement: We recognize that addressing complex supply chain challenges requires collaboration and engagement with various stakeholders,
    including suppliers, workers, local communities, civil society organizations, and governmental bodies. We will actively seek partnerships to exchange best practices,
    share knowledge, and drive collective action to improve supply chain sustainability and human rights protection.
    4. Continuous Improvement: We embrace a culture of continuous improvement and are committed to regularly reviewing and enhancing our supply chain due diligence processes.
    We will adapt to emerging risks, integrate new technologies, and stay updated on international best practices to ensure our operations align with the evolving
    standards of responsible business conduct.
    5. Remediation and Redress: In the event that human rights, labor rights, or environmental abuses are identified within our supply chain, we are committed to taking
    swift and appropriate actions to address these issues. We will work diligently to provide remediation and support to affected individuals and communities, in line
    with internationally recognized frameworks and guidelines.
    As we implement the German Lieferkettengesetz, we are dedicated to promoting a responsible and sustainable supply chain that respects the dignity, rights, and
    well-being of all individuals impacted by our operations. By adhering to these principles, we aim to contribute to a fair and sustainable global economy and set
    a positive example for the business community.

    \companyname is fully committed to supporting the German Lieferkettengesetz and ensuring that our supply chain operates with the highest standards of ethics,
    responsibility, and sustainability.


    \section{Methodology}

    The risk analysis combines both internal and external expertise by using publicly available indices, supplier knowledge from the SustainMind database and internal
    knowledge from people within our organization. By incorporating these perspectives, we gain valuable insights and ensure a holistic understanding of the risks
    associated with our supply chain.

    As a first step, we gathered information about each of our suppliers by asking them for a list of their production sites and by using publicly available company databases
    to create a list of production countries and production processes. Based on a supplier's inventory and production countries, we used multiple indices to
    create a generic risk mapping. To get a comprehensive image, we combined information of the following indices:

    \begin{itemize}
        \item The UNICEF Child Labor Dataset
        \item The World Justice Project's Rule of Law Index
        \item The Walk Free Global Slavery Index
        \item The Environmental Performance Index
    \end{itemize}

    The generic risk mapping performed for each country includes the following risk categories, listed with their respective paragraph of the German Supply Chain Due Diligence Act (LkSG):
    \begin{itemize}
        \item Child Labor (§ 2 II Nr. 1, 2 LkSG)
        \item Modern Slavery (§ 2 II Nr. 3, 4 LkSG)
        \item No Freedom of Association (§ 2 II Nr. 6 LkSG)
        \item Poor Labor Rights and Work Safety (§ 2 II Nr. 5 LkSG)
        \item Discrimination (§ 2 II Nr. 7 LkSG)
        \item Waste Water Pollution (§ 2 II Nr. 9 LkSG)
        \item Poor Air Quality (§ 2 II Nr. 9 LkSG)
        \item Release of Heavy Metals (§ 2 III Nr. 1, 2, 3 LkSG)
        \item Inadequate Waste Disposal (§ 2 III Nr. 6, 7, 8 LkSG)
    \end{itemize}

    For each of these risks, a score between 0 and 100 is calculated. A score below 30 indicates a low risk, a score of at least 30 and below 70 a medium risk and
    a score of at least 70 indicates a high risk. More details about the calculation of the scores can be found in appendix A.

    The scores give a good first impression of the severity of each risk. To refine the identified risks, we conducted employee surveys within our company, especially
    of the purchasing department, considered complaints by employees of our suppliers and exchanged knowledge with other companies which having the same suppliers via the
    SustainMind ESG collaboration platform.

    We prioritized the risks based on the refined risk scores, the potential severity and our ability to eliminate the risks, measured by our contract volume compared to
    a supplier's total revenue.

    \section{Supplier Analysis}
    `
    
    suppliers.forEach((supplier) => {

      const locations = supplier.productionSites.map((p) => {
        let city = escapeLatexSpecialCharacters(p.city)
        let country = escapeLatexSpecialCharacters(p.country)
        return city + ", " + country;
      });

      const risks = findMaxRiskScores(
        supplier.productionSites
          .map((p) => {
            return p.riskScores;
          })
          .flat()
      ).map((s) => [s.riskType.name, s.riskScore]);


      let supplierCompany = escapeLatexSpecialCharacters(supplier.get("companyName"))

      text +=
        String.raw`
        \subsection{` +
        supplierCompany +
        `}`;

      text += String.raw`
        \subsubsection*{Supplier Self Description}
        `;

      let description = escapeLatexSpecialCharacters(supplier.get("description"))
      text += description

      text += String.raw`

        \subsubsection*{Production Sites}
        `;
      text +=
        supplierCompany +
        String.raw` has production sites in the following countries/regions:
        \begin{itemize}
        `;
      locations.forEach((location) => {
        let l = escapeLatexSpecialCharacters(location)
        text += String.raw`\item ` + l + `\n`;
      });

      text += String.raw`\end{itemize}

        \subsubsection*{Identified Risks}
        Based on the production countries and our supplier's product range, we calculated the following risk scores:

        \vspace{10px}

        `;

      risks.forEach((risk) => {
        console.log("risk0: ", risk[0], ", score: ", risk[1])
        let risk_name = escapeLatexSpecialCharacters(risk[0])
        let risk_score = escapeLatexSpecialCharacters(risk[1])
        console.log("risk: ", risk_name, ", score: ", risk_score)
        text += '\\risk{' + risk_name + `}{` + parseInt(risk_score).toFixed(1).toString() + '}\n';
      });

      text +=
        String.raw`

        \vspace{10px}

        Interviews conducted with our employees that had direct contact with the supplier revealed no further knowledge about worker right violations or
        environmental pollution. Also, the SustainMind database didn't include records of these violations. In addition, we received no complaints from employees of ` +
        supplierCompany +
        String.raw` via our complaint platform. Thus, we proceeded with the stated scores.

        \subsubsection*{Implemented Prevention Measures}

        Our supplier, ` +
        supplierCompany +
        String.raw`, has implemented stringent prevention measures to help us comply with the requirements of the Lieferkettengesetz.
        They maintain comprehensive record-keeping and traceability systems at each supply chain stage, ensuring transparency. Regular audits and assessments
        verify the accuracy of their documentation. ` +
        supplierCompany +
        String.raw` demonstrates a commitment to responsible business practices and compliance with the legislation.
        We are proud to partner with them, as they prioritize documentation to promote transparency and accountability.

        To put down our efforts on writing, we concluded a human rights and environmental protection supplementary agreement with ` +
        supplierCompany +
        String.raw`. It commits ` +
        supplierCompany +
        String.raw` to improve their worker's rights and to increase their environmental standards, otherwise contract penalties or the end of our business relationship are possible.
        We strongly support ` +
        supplierCompany +
        String.raw` with all resources within the scope of our possibilities with their change management.

        Furthermore, we established a complaint plafform for our supplier's workers to report inadequate working conditions and environmental violations. The complaint plafform
        is realizzed with the help of SustainMind and publicly accessible. To lower the hurdle of complaints and to eliminate the likelihood of negative consequences for the reporter,
        an anonymous reporting option is available. All complaints are carefully considered and further investigated.

        In addition, we are offering recurrent and mandatory seminars for the employees of ` +
        supplierCompany +
        String.raw`. Based on the identified risks, the following topics are covered during
        the seminars:
        \begin{itemize}
            \item Prevention of Child Labor and Human Trafficking
            \item Labor Rights Seminar
            \item Anti-Discrimination Seminar
        \end{itemize}

        What is more, as a response to the high risks of child labor and modern slavery, we implemented the SustainMind employee registration software at our supplier.
        Each factory worker of ` +
        supplierCompany +
        String.raw` is assigned a unique employee ID. Only people with a valid employee ID (or guest ID) and a valid identity document are
        allowed to enter the factory. During unannounced audits, the auditor will check the employee IDs and identity documents of the factory workers. Unregistered employees
        will lead to severe consequences for the supplier companies, including a possible end of business relations.

        \subsubsection*{Future Prevention Measures}

        Looking to the future, we are committed to implementing even stronger prevention measures to ensure compliance with the evolving requirements of the Supply Chain
        Due Diligence Act.

        To deal with the risks of inadequate waste disposal and the release of heavy metals, we are investigating the current waste treatment together with our supplier.
        As the public waste disposal systems in some of our supplier's production countries aren't environmentally friendly, we are considering private alternatives.

        \subsubsection*{Audits}

        We conduct regular audits to assess our suppliers' adherence to ethical standards, labor rights, and environmental practices. These audits are conducted by
        independent third-party organizations who thoroughly evaluate our suppliers' operations, policies, and documentation. Through audits, we ensure transparency,
        identify areas for improvement, and verify the accuracy of supplier-provided information. By conducting audits, we maintain accountability and promote continuous
        improvement within our supply chain, thereby safeguarding the rights and well-being of workers and minimizing environmental impact.

        `;
    });

    text += String.raw`

    \section{Appendix}

    \subsection{Appendix A: Risk Classification}

    Our risk classifications follow the SustainMind guidelines and are listed in more detail in this section.

    \subsubsection*{Risk: Child Labor}

    The risk of child labor is classified based on the UNICEF child labor dataset, which contains data about the child labor percentage in 96 countries.
    Child labor is defined as work done by children (ages 5 to 17) who are engaged in labor that is considered detrimental to their health and development.
    In the least developed countries, slightly more than 1 in 5 children are engaged in child labor.

    We map countries to different child labor risk categories:
    \begin{itemize}
        \item Low risk: Less than 3\% of children are involved in child labor
        \item Medium risk: At least 3\% but less than 10\% of children in a country are involved child labor
        \item High risk: At least 10\% of children in a country are involved in child labor
    \end{itemize}

    The UNICEF child labor dataset mostly contains countries with an increased expected risk of child labor and doesn't include many highly developed countries
    where child labor isn't an issue. Thus, all countries that aren't contained in the dataset are treated as low risk countries. 

    \subsubsection*{Risk: Modern Slavery}

    The risk of modern slavery (human trafficking) is calculated with the help of the Walk Free Global Slavery Index. The index provides national estimates of modern slavery for 160
    countries. Modern slavery is an umbrella term, which encompasses several types of exploitation, including forced labor, human trafficking and forced marriage.
    The index is based on nationally representative household surveys with thousands of survivors.

    We map countries and their modern slavery prevalence to the following risk categories:
    \begin{itemize}
        \item Low risk: Less than 0.5\% of people in a country are subject to modern slavery
        \item Medium risk: At least 0.5\% but less than 1\% of people in a country are subject to modern slavery
        \item High risk: At least 1\% of people in a country are subject to modern slavery
    \end{itemize}

    Some smaller countries aren't included in the modern slavery index. We have marked the scores of theses countries as not existing in the risk identification summary.

    \subsubsection*{Risk: No Freedom of Association}

    Freedom of association is a fundamental human right and a cornerstone of democratic societies. It refers to the right of individuals to form and join organizations,
    such as trade unions or worker associations, to collectively voice their concerns, protect their interests, and negotiate better working conditions.
    We calculate the risk of lacking freedom of association based on the World Justice Project Rule of Law Index, which evaluates 140 countries and jurisdictions
    around the world. The Rule of Law Index contains 8 different factors with several sub-factors, each with a score between 0 (poor performance) and 1 (good performance).

    To estimate the freedome of association, we considered the factors '4.7 Freedom of assembly and association is effectively guaranteed' ($factor_{4.7}$) and
    'Factor 6: Regulatory Enforcement' ($factor_6$). Next, we calculated the lacking freedom of association risk score as:
    $score_{fa} = 100 - 100*(factor_{4.7} + factor_6)/2$.

    The calculated score resulted in the following risk categories:
    \begin{itemize}
        \item Low risk: A score below 30
        \item Medium risk: A score of at least 30 but less than 50
        \item High risk: A score of at least 50
    \end{itemize}

    A score for countries not included in the Rule of Law Index couldn't be calculated. These countries are marked accordingly in the risk identification summary.

    \subsubsection*{Risk: Poor Labor Rights and Work Safety}

    We calculate the risk of poor labor rights and work safety based on the World Justice Project Rule of Law Index, which evaluates 140 countries and jurisdictions
    around the world. The Rule of Law Index contains 8 different factors with several sub-factors, each with a score between 0 (poor performance) and 1 (good performance).

    To estimate the freedome of association, we considered the factors '4.8 Fundamental labor rights are effectively guaranteed' ($factor_{4.8}$) and
    'Factor 6: Regulatory Enforcement' ($factor_6$). Next, we calculated the poor labor rights and work safetly risk score as:
    $score_{labor} = 100 - 100*(factor_{4.8} + factor_6)/2$.

    The calculated score resulted in the following risk categories:
    \begin{itemize}
        \item Low risk: A score below 30
        \item Medium risk: A score of at least 30 but less than 50
        \item High risk: A score of at least 50
    \end{itemize}

    A score for countries not included in the Rule of Law Index couldn't be calculated. These countries are marked accordingly in the risk identification summary.

    \subsubsection*{Risk: Discrimination}

    We calculate the risk of discrimination based on the World Justice Project Rule of Law Index, which evaluates 140 countries and jurisdictions
    around the world. The Rule of Law Index contains 8 different factors with several sub-factors, each with a score between 0 (poor performance) and 1 (good performance).

    To estimate the freedome of association, we considered the factors '4.1 Equal treatment and absence of discrimination' ($factor_{4.1}$) and
    '7.2 Civil justice is free of discrimination' ($factor_{7.2}$). Next, we calculated the descrimination risk score as:
    $score_{disc} = 100 - 100*(factor_{4.1} + factor_{7.2})/2$.

    The calculated score resulted in the following risk categories:
    \begin{itemize}
        \item Low risk: A score below 30
        \item Medium risk: A score of at least 30 but less than 50
        \item High risk: A score of at least 50
    \end{itemize}

    A score for countries not included in the Rule of Law Index couldn't be calculated. These countries are marked accordingly in the risk identification summary.

    \subsubsection*{Risk: Waste Water Pollution}

    We calculate the risk of waste water pollution based on the Environmental Performance Index, which summarizes the state of sustainability around the world with
    40 performance indicators. Each performance indicator has a score from 0 (poor performance) to 100 (good performance). The Environmental Performance Index includes data
    for 180 countries on climate change performance, environmental health, and ecosystem vitality.

    To estimate waste water pollution, we use the index factor 'Water Resources'. We categorize the risk of waste water pollution with the following conversion:
    \begin{itemize}
        \item Low risk: A score of more than 70
        \item Medium risk: A score of more than 30 but at most 70
        \item High risk: A score of at most 30
    \end{itemize}

    A score for countries not included in the Environmental Performance Index couldn't be calculated. These countries are marked accordingly in the risk identification summary.

    \subsubsection*{Risk: Poor Air Quality}

    We calculate the risk of poor air quality based on the Environmental Performance Index, which summarizes the state of sustainability around the world with
    40 performance indicators. Each performance indicator has a score from 0 (poor performance) to 100 (good performance). The Environmental Performance Index includes data
    for 180 countries on climate change performance, environmental health, and ecosystem vitality.

    To estimate air quality, we use the corresponding index factor 'Air Quality'. We categorize the risk of poor air quality with the following conversion:
    \begin{itemize}
        \item Low risk: A score of more than 70
        \item Medium risk: A score of more than 30 but at most 70
        \item High risk: A score of at most 30
    \end{itemize}

    A score for countries not included in the Environmental Performance Index couldn't be calculated. These countries are marked accordingly in the risk identification summary.

    \subsubsection*{Risk: Release of Heavy Metals}

    We calculate the risk of release of heavy metals based on the Environmental Performance Index, which summarizes the state of sustainability around the world with
    40 performance indicators. Each performance indicator has a score from 0 (poor performance) to 100 (good performance). The Environmental Performance Index includes data
    for 180 countries on climate change performance, environmental health, and ecosystem vitality.

    To estimate the release of heavy metals, we use the index factor 'Heavy Metals'. We categorize the risk of release of heavy metals with the following conversion:
    \begin{itemize}
        \item Low risk: A score of more than 70
        \item Medium risk: A score of more than 30 but at most 70
        \item High risk: A score of at most 30
    \end{itemize}

    A score for countries not included in the Environmental Performance Index couldn't be calculated. These countries are marked accordingly in the risk identification summary.

    \subsubsection*{Risk: Inadequate Waste Disposal}

    We calculate the risk of inadequate waste disposal based on the Environmental Performance Index, which summarizes the state of sustainability around the world with
    40 performance indicators. Each performance indicator has a score from 0 (poor performance) to 100 (good performance). The Environmental Performance Index includes data
    for 180 countries on climate change performance, environmental health, and ecosystem vitality.

    To estimate the correctness of waste disposal, we use the index factor 'Waste Management'. We categorize the risk of inadequate waste disposal with the following conversion:
    \begin{itemize}
        \item Low risk: A score of more than 55
        \item Medium risk: A score of more than 25 but at most 55
        \item High risk: A score of at most 25
    \end{itemize}

    A score for countries not included in the Environmental Performance Index couldn't be calculated. These countries are marked accordingly in the risk identification summary.

    \subsubsection*{Multi-national suppliers}

    If a supplier has production sites in multiple countries, the risk scores are the maximum scores for any of the production countries. 

    \end{document}
    `
    return text
}