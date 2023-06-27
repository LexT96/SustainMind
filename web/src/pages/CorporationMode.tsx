import BoxSx from '../components/Startsides/BoxSx';
import index from '../App.css';
import { PageLayout } from '../components/PageLayout';

export default function CorporationMode() {
  const boxContents = [
    { title: "My Products", description: "Möglichkeit für eine Beschreibung" },
    { title: "Suppliers", description: "Möglichkeit für eine Beschreibung" },
    {
      title: "Supplier Marketplace",
      description: "Möglichkeit für eine Beschreibung",
    },
    {
      title: "Risk Analysis",
      description: "Möglichkeit für eine Beschreibung",
    },
    { title: "ESG To Do's", description: "Möglichkeit für eine Beschreibung" },
    { title: "Production Sites", description: "Möglichkeit für eine Beschreibung" },
  ];

  return (
    <PageLayout>
      
   <div className="grid-container">
      {boxContents.map((content, index) => (
        <BoxSx
          key={index}
          title={content.title}
          description={content.description}
        />
      ))}
    </div>
    </PageLayout>

  );
}
