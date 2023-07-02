import React, { CSSProperties } from "react";
import CustomBox from "../components/Startsides/CustomBox";
import { PageLayout } from "../components/PageLayout";

function CorporationMode() {
  const boxContents = [
    {
      title: "My Products",
      description: "View your products and their ESG scores",
      path: "/products",
    },
    {
      title: "Suppliers",
      description: "View your suppliers and manage prevention measures", path: "/suppliers",
    },
    {
      title: "Supplier Marketplace",
      description: "Find new suppliers who value sustainability", path: "/marketplace",
    },
    {
      title: "Risk Analysis",
      description: "Analyze risks of all your suppliers", path: "/analysis",
    },
    //{ title: "ESG To Do's", description: 'Möglichkeit für eine Beschreibung' },
    {
      title: "Production Sites",
      description: "View and add your production sites", path: "/sites",
    },
  ];

  const gridContainerStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    maxWidth: "960px",
    margin: "0 auto",
    height: "100vh",
    overflowX: "hidden",
    gap: "5px", // Gap between the boxes1
    marginTop: "100px", // Vertical spacing between the rows
  };

  return (
    <PageLayout>
      <div style={gridContainerStyle}>
        {boxContents.map((content, index) => (
          <CustomBox
            key={index}
            title={content.title}
            description={content.description}
            path={content.path}
          />
        ))}
      </div>
    </PageLayout>
  );
}

export default CorporationMode;
