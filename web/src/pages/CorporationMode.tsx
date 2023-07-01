import React, { CSSProperties } from 'react';
import CustomBox from '../components/Startsides/CustomBox';
import { PageLayout } from '../components/PageLayout';

function CorporationMode() {
  const boxContents = [
    { title: 'My Products', description: 'Möglichkeit für eine Beschreibung' },
    { title: 'Suppliers', description: 'Möglichkeit für eine Beschreibung' },
    {
      title: 'Supplier Marketplace',
      description: 'Möglichkeit für eine Beschreibung',
    },
    {
      title: 'Risk Analysis',
      description: 'Möglichkeit für eine Beschreibung',
    },
    { title: "ESG To Do's", description: 'Möglichkeit für eine Beschreibung' },
    { title: 'Production Sites', description: 'Möglichkeit für eine Beschreibung' },
  ];

  const gridContainerStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxWidth: '960px',
    margin: '0 auto',
    height: '100vh',
    overflowX: 'hidden',
    gap: '5px', // Gap between the boxes1
    marginTop: '100px', // Vertical spacing between the rows
  };

  return (
    <PageLayout>
      <div style={gridContainerStyle}>
        {boxContents.map((content, index) => (
          <CustomBox
            key={index}
            title={content.title}
            description={content.description}
          />
        ))}
      </div>
    </PageLayout>
  );
}

export default CorporationMode;