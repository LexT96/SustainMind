import BoxSx from '../components/Startsides/BoxSx';
import index from '../App.css';

export default function SupplierMode() {
  const boxContents = [
    { title: "Production Sites", description: "Möglichkeit für eine Beschreibung" },
    { title: "ESG To Do`s", description: "Möglichkeit für eine Beschreibung" },
    
  ];

  return (
    <div className="grid-container">
      {boxContents.map((content, index) => (
        <BoxSx
          key={index}
          title={content.title}
          description={content.description}
        />
      ))}
    </div>
  );
}
