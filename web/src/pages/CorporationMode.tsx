import React, { CSSProperties } from "react";
import CustomBox from "../components/Startsides/CustomBox";
import { PageLayout } from "../components/PageLayout";

function CorporationMode() {
  const boxContents = [
    {
      title: "My Products",
      description: "View your products and their ESG scores",
      bg_image: "/products.jpg",
      path: "/products",
    },
    {
      title: "Suppliers",
      description: "View your suppliers and manage prevention measures",
      bg_image: "/suppliers.jpg",
      path: "/suppliers",
    },
    {
      title: "Supplier Marketplace",
      description: "Find new suppliers who value sustainability", 
      bg_image: "/marketplace.jpg",
      path: "/marketplace",
    },
    {
      title: "Risk Analysis",
      description: "Analyze risks of all your suppliers",
      bg_image: "/analysis.jpg",
      path: "/analysis",
    },
    //{ title: "ESG To Do's", description: 'Möglichkeit für eine Beschreibung' },
    {
      title: "Production Sites",
      description: "View and add your production sites",
      bg_image: "/production_site.jpg",
      path: "/sites",
    },
  ];

  const gridContainerStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    maxWidth: "1200px",
    margin: "0 auto",
    //height: "100vh",
    overflowX: "hidden",
    gap: "20px", // Gap between the boxes1
    marginTop: "120px", // Vertical spacing between the rows
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
            backgroundImage={content.bg_image}
          />
        ))}
      </div>
    </PageLayout>
  );
}

export default CorporationMode;
