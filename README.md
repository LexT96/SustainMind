
# SustainMind
[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/powered-by-responsibility.svg)](https://forthebadge.com)

SustainMind is a cloud-based supply chain due diligence software that enables corporations to analyze their supply chains, to identify risks, and to jointly conduct prevention measures. The live built can be visited at: [https://www.sustainmind.de/](https://www.sustainmind.de/).

<img src="https://www.sustainmind.de/logo.png" alt="SustainMind Logo" style="width:130px;"/>

#### Deployment Status
[![Netlify Status](https://api.netlify.com/api/v1/badges/26994758-d413-4aaa-8b10-7467c7c0b8fb/deploy-status)](https://app.netlify.com/sites/grand-fenglisu-52932d/deploys)


# Table of Contents
1. [Background](#background)
2. [Run Locally](#run-locally)
3. [Features](#features)
4. [Website Structure](#website-structure)
5. [Implementation Details](#implementation-details)
6. [Risk Score Calculation](#risk-score-calculation)
7. [ESG Score Calculation](#esg-score-calculation)
8. [Appendix](#appendix)


# Background

The German Supply Chain Due Diligence Act (Lieferkettensorgfaltspflichtengesetz) commits large corporations to prevent human right violations and environmental pollution in their supply chains, which includes identifying risks and conducting prevention programs for all their direct suppliers. These steps take a lot of time and need to be documented carefully. Violations can be punished with fines of up to 8 million euros or 2% of global revenue.

We have developed an all-in-one supply chain software that helps corporations affected by the German Supply Chain Due Diligence Act to comply. Our software reduces costs and temporal expenditure as well as the likelihood of fines.

Our product explanation video can be found here:

[![Link to explainer video](https://img.youtube.com/vi/ZDqw2COKLmg/0.jpg
)](https://www.youtube.com/watch?v=ZDqw2COKLmg)

## Competitor Analysis

Most companies currently use excel tables to identify risks and to manage prevention measures, which is a very time consuming procedure. Existing software solutions for supply chain compliance are often only targeted towards larger companies. Our software, on the other hand, also targets medium sized companies. Furthermore, we are the only company that allows collaboration with other companies who have the same suppliers to jointly conduct prevention measures and to share costs. We furthermore generate sustainability certificates to prove supply chain sustainability to customers.

|  | SustainMind     |  Excel Table| Compliance Solutions | EcoVadis | Workive | Risk Cloud ESG software |AutidBoard | 
| :-------- | :------- | :------- |  :------- | :------- | :------- | :------- | :------- |
| Automated Reporting | ✅ | ❌ | ✅  | ✅ | ✅ | ✅ | ✅ | 
| Own Risk Analysis| ✅ |✅ | ✅ | ✅ | ✅ |  ✅|  ✅| 
| Supplier Risk Analysis | ✅ |✅ |✅  | ✅  | ❌ | ❌ | ❌ | 
| Targeted towards | <span style="color:#0f0">Medium sized and large companies</span>  | <span style="color:#0f0">Medium sized and large companies</span>  | <span style="color:#f00">Only large corporations</span> | <span style="color:#f00">Only large corporations</span> | <span style="color:#f00">Only large corporations</span>|  <span style="color:#f00">Only large corporations</span>| <span style="color:#f00">Only large corporations</span> | 
| Collaboration possible | ✅ |❌ |❌  | ❌  | ❌ | ❌ | ❌ | 
| Sustainability certificates | ✅ |❌ |❌  | ❌  | ❌ | ❌ | ❌ | 

<div id='run-locally'/>

# Run Locally

Clone the project

```bash
  git clone https://github.com/LexT96/SustainMind.git
```

Go to the project directory

```bash
  cd SustainMind
```

## Server

Navigate to the directory

```bash
  cd server
```

Fill your credentials according to the .env

Install dependencies

```bash
  yarn
```

Seed sample data into database

```bash
  yarn seed
```

Start the server

```bash
  yarn dev
```

## Frontend

Navigate to the directory

```bash
  cd web
```

Fill your credentials according to the .env

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn dev
```

### Demo Login Data

To sign in as Christina, you can use the following login data
```bash
  e-mail: christina.mattison.ceo@gmail.com
  password: techChallengeWin2023
```

# Features
Feature | Implemented
:------------ | :-------------
Landing Page | ✅
Registration System | ✅
Dashboard | ✅
Supplier Marketplace | ✅
Supplier Data Collection | ✅
Risk Score Calculation | ✅
ESG Score Calculation | In Progress
Risk Analysis | ✅
Suggest Prevention Measures | ✅
Conduct Prevention Measures | In Progress
Automatic Reporting | ✅
Multiple Logins per Company | Coming Soon
Certificates (with QR Codes) | Coming Soon

<div id='website-structure'/>

# Website Structure

Our website consists of the following pages:
- Landing Page (path: "."): The landing page informs new users about the advantages of our software and convinces them to register
- Dashboard (path: "/home"): Users see the an overview of the most relevant SustainMind features: My Products, My Suppliers, Supplier Marketplace, Risk Analysis, Production Sites
- Products (path: "/products"): Users can view their own products with respective ESG scores. The scores are calculated based on the ESG scores of all suppliers involved in the supply chain. In future, our users will be able to generate QR codes to prove the sustainability of their products to their customers.
- Suppliers (path: "/suppliers"): All suppliers of the current user are listed. After registration, a company has zero suppliers and adds suppliers from the SustainMind database with the "Add Supplier" button. In future, the list of suppliers can be automatically imported from ERP systems like SAP.
- Supplier Details (path: "/suppliers/<SUPPLIER_ID>"): Allows the risk scores and suggested prevention measures for a specific supplier
- Marketplace (path: "/marketplace"): The supplier marketplace lists all suppliers registered on our platform. It can be used by corporations to find new suppliers that value sustainability.
- Production Sites (path: "/sites"): Allows to add and view production sites. Information about production sites is required for the automatic risk analysis.
- Risk Analysis (path: "/analysis"): Corporations can see their own ESG score and document the identified risks and conducted prevention measures.

<div id='implementation-details'/>

# Implementation Details
## TechStack
Frontend: React (Typescript)  
Backend: Express (Node)  
Database: MongoDB

## Infrastructure
- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas

<img style="mx: auto" alt="Infrastucture" src="./pitch/infra.png" width="650" height="800" />


### Deployment

Pushing changes in the /web folder on the main branch will lead to a deployment on www.SustainMind.de (running on Netlify)

Pushing changes in the /server folder on the main branch will lead to a deployment on https://sustainmind.onrender.com/ (running on Render)

We use Clerk for authentication & user management

## Database Schema
![DatabaseSchema](./pitch/database.png)

## File Structure

Our project consists of the following non-exhaustiv list of files:
```
SustainMind
├── server: Contains all backend functionality
│   ├── node_modules: Dependency libraries
│   ├── public
│   │   └── risk_analysis
│   │       └── pdfs: Generated risk analysis pdf files
│   ├── src: Backend source code
│   │   ├── controllers: Files for database requests
│   │   ├── db
│   │   │   ├── esg_scoring
│   │   │   │   ├── index_loaders: Python scripts to read indices from excel/csv files into MongoDB
│   │   │   │   ├── countries.csv: Exported table with country indices
│   │   │   │   └── merge_countries_with_scores.py: Merge all indices into a single MongoDB collection
│   │   │   └── seeders: Contains files to seed test data into MongoDB
│   │   ├── models: Files to define the MongoDB schemes
│   │   ├── risk_analysis: Loads supplier information from the database, adds it to a LaTeX file compiles it as PDF
│   │   ├── routes: Routes backend requests
│   │   ├── config.ts: Database connection configuration
│   │   └── index.ts: The entry point of our application.
│   └── .env
├── web: Contains all frontend functionality
│   ├── node_modules: Dependency libraries
│   ├── public: Contains frontend graphics (e.g. company logos, product images)
│   ├── src: Frontend code
│   │   ├── api: Saves the REST calls that we to do our backend
│   │   ├── components
│   │   │   ├── Analysis: Risk analysis components
│   │   │   ├── Marketplace: Supplier marketplace components
│   │   │   ├── Navbars: Navigation bars
│   │   │   ├── ProductionSites: Code for production site components
│   │   │   ├── Products: Product Overview code
│   │   │   ├── sections/landing: Landing page sections
│   │   │   ├── Startside: Authentication page code
│   │   │   ├── Startsides: Dashboard components
│   │   │   └── Suppliers: Supplier overview and supplier details components
│   │   ├── pages: Code for the pages (AnalysisPage, MarketplacePage, ...)
│   │   ├── react-query: Used for interactions with our backend (allows caching, loading state & error handling)
│   │   ├── App.css: Our core .css file
│   │   ├── App.tsx: The entry point of our frontend (initial setup)
│   │   ├── config.ts: Handles the configuration (pulls values from our .env file or generally handles constants)
│   │   ├── main.tsx: Loads the react app into the HTML of our website
│   │   └── router.tsx: Routes user requests
│   └── .env
└──  README.md: technical documentation
```

<div id='risk-score-calculation'/>

# Risk Score Calculation

The risk analysis combines both internal and external expertise by using publicly available indices, supplier knowledge from the SustainMind database and internal knowledge from people within customer organizations. By incorporating these perspectives, one can gain valuable insights and ensure a holistic understanding of the risks associated with the supply chain.

Based on a supplier’s inventory and production countries, we use multiple indices to create a generic risk mapping. To get a comprehensive image, we combined information of the following indices:
- The UNICEF Child Labor Dataset
- The World Justice Project’s Rule of Law Index
- The Walk Free Global Slavery Index
- The Environmental Performance Index

The generic risk mapping performed for each country includes the following
risk categories, listed with their respective paragraph of the German Supply
Chain Due Diligence Act (LkSG):
- Child Labor (§ 2 II Nr. 1, 2 LkSG)
- Modern Slavery (§ 2 II Nr. 3, 4 LkSG)
- No Freedom of Association (§ 2 II Nr. 6 LkSG)
- Poor Labor Rights and Work Safety (§ 2 II Nr. 5 LkSG)
- Discrimination (§ 2 II Nr. 7 LkSG)
- Waste Water Pollution (§ 2 II Nr. 9 LkSG)
- Poor Air Quality (§ 2 II Nr. 9 LkSG)
- Release of Heavy Metals (§ 2 III Nr. 1, 2, 3 LkSG)
- Inadequate Waste Disposal (§ 2 III Nr. 6, 7, 8 LkSG)

For each of these risks, a score between 0 and 100 is calculated. A score below 30 indicates a low risk, a score of at least 30 and below 70 a medium risk and a score of at least 70 indicates a high risk. The scores give a good first impression of the severity of each risk. To refine the identified risks, employee surveys are conducted within our customer companies, especially of the purchasing departments. 

We prioritize the risks based on the refined risk scores, the potential severity and the ability to eliminate these risks, measured by the contract volume of a company compared to a suppier's total revenue.

<div id='esg-score-calculation'/>

# ESG Score Calculation

The ESG score of a supplier is calculated based on how well the supplier implements prevention measures and based on audit results:
- Up to 4 points can be achieved by making efforts to implement prevention measures. The maximum score is only given if the company implemented all suggested prevention measures before their deadline.
- Up to 4 points can be achieved during audits for good human rights compliance and through following environmental standards. The audits are not announced.
- Up to 2 points can be achieved by providing additional information or documents to prove the own sustainability, e.g. documentation/invoices of the waste disposal system.
- Points can be deducted for reported violations of human rights or environmental standards.
- A supplier's ESG score is the sum of points achieved. The minimum ESG score is 0, the maximum is 10. Partial points are possible. The final ESG score is rounded to one decimal place.

The ESG score of a corporation is calculated as the average of the ESG scores of its suppliers.

The ESG score of a product is calculated as the average of the ESG scores of all supplier companies involved in the supply chain.

# Appendix

Our Team:
Florian Weiser,
Thorsten Lex,
Burhan Yesilöz and
Omar Metwally
