import React from 'react';
import { PageLayout } from '../PageLayout';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

interface PreventionMeasure {
  title: string;
  priority: string;
  description: string;
  tags: { label: string }[];
  additionalButtons: { label: string; disabled?: boolean }[];
}

const StyledTag = styled(Button)({
  pointerEvents: 'none',
  backgroundColor: '#A3CDFF',
  borderRadius: '20px',
  height: '28px'
});

const preventionMeasures: PreventionMeasure[] = [
  {
    title: 'Request ESG self-disclosure of supplier',
    priority: 'Low',
    description:
      'Send an ESG self-disclosure form to your supplier and ask them for information on the current state of human rights and environmental protection at their production sites. In case of self-reported violations, you should help them to shape their production ESG-friendly.',
    tags: [
      { label: 'Shared' },
      { label: 'Optional' },
      { label: 'To Do' },
    ],
    additionalButtons: [
      { label: 'View Form' },
      { label: 'Send Form' },
      { label: 'View Filled Out Form', disabled: true },
    ],
  },
  {
    title: 'Research Known ESG risks',
    priority: 'High',
    description:
      'Create a list of employees who have potentially worked with the supplier (e.g. employees in your purchase department) and send them the "ESG Risk Identification" form. The form asks questions about known violations of human rights or environmental standards.',
    tags: [{ label: 'In Progress' }],
    additionalButtons: [
      { label: 'View Form' },
      { label: 'Create List' },
      { label: 'Send Form', disabled: true },
      { label: 'View Filled Out Form', disabled: true },
    ],
  },
  {
    title: 'Schedule Information Meeting: Upcoming Measures',
    priority: 'Medium',
    description:
      'Change is most likely to occur when your supplier has a contact person and gets regular support and feedback. Have a meeting with your supplier to inform them about your legal obligations and convince them to cooperate closely.',
    tags: [
      { label: 'Optional' },
      { label: 'ToDo' },
    ],
    additionalButtons: [
      { label: 'Upload Meeting Notes' },
      { label: 'View Meeting Notes' },
    ],
  },
  {
    title: 'Conclude Supplementary Agreement',
    priority: 'High',
    description: 'Conclude a supplementary agreement with your supplier that commits them to make efforts to reach good ESG standards.',
    tags: [{ label: 'Done' }],
    additionalButtons: [
      { label: 'View Form' },
      { label: 'Sign Form' },
      { label: 'Send Form' },
    ],
  },
  {
    title: 'Establish Complaint Mechanisms',
    priority: 'High',
    description: 'SustainMind offers you to set up complaint mechanisms for the employees of your supplier to report ESG violations.',
    tags: [{ label: 'Done' }],
    additionalButtons: [
      { label: 'Setup Complaint System' },
      { label: 'View Complaints' },
    ],
  },
  {
    title: 'Supplier Employee Survey',
    priority: 'Medium',
    description: 'SustainMind regularly sends a survey to all employees of the supplier and asks them about work conditions and work safety. The results are evaluated automatically.',
    tags: [
      { label: 'Automatic' },
      { label: 'Recurrent' },
      { label: 'Shared' }
    ],
    additionalButtons: [
      { label: 'View survey results' },
    ],
  },
  {
    title: 'Supplier Employee Seminar',
    priority: 'Medium',
    description: 'The employees of your supplier have to participate in mandatory, paid seminars to be educated about labour rights, environmental protection standards and the complaint system. Based on the risk analysis, the employee seminar covers the following topics:<br>- Prevention of Child Labor and Human Trafficking<br>- Labor Rights<br>- Anti-Discrimination<br>- Explanation of the complaint system',
    tags: [
      { label: 'Automatic' },
      { label: 'Recurrent' },
      { label: 'Shared' }
    ],
    additionalButtons: [
      { label: 'View seminar dates and statistics' },
    ],
  },
  {
    title: 'Schedule Information Meeting: ESG compliance',
    priority: 'Medium',
    description: 'Discuss your supplier’s progress and prevention measures in a recurrent meetings every few months. Advise them on how to make production more environmantally firendly and how to improve labor conditions.',
    tags: [
      { label: 'Recurrent' }
    ],
    additionalButtons: [
      { label: 'Upload Meeting Notes' },
      { label: 'View Meeting Notes' },
    ],
  },
  // Add more prevention measures here
];

const Prevention: React.FC = () => {
  return (
    <div style={{ marginTop: '30px'}}>
      <h3 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'left' }}>Prevention Measures</h3>
      <p style={{ textAlign: 'left' }}>Based on the results of the risk analysis, the severity of these risks and your negotiation power, the following prevention measures are suggested.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginTop: '20px' }}>
        {preventionMeasures.map((measure, index) => (
          <div
            className="rectangle"
            style={{
              padding: '10px 20px 15px 20px',
              border: 'none',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              height: 'fit-content' // Adjust the height to cover the content
            }}
            key={index}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h4 style={{ marginTop: '9px', marginBottom: '10px', fontWeight: 'bold', marginRight: '15px' }}>{measure.title}</h4>
                <div>
                  {measure.tags.map((tag, index) => (
                    <StyledTag key={index} variant="contained" style={{ marginRight: '5px' }}>
                      {tag.label}
                    </StyledTag>
                  ))}
                </div>
              </div>
              <span>Priority: {measure.priority}</span>
            </div>
            {/* TODO: Remove dangerouslySetInnerHTML */}
            <p style={{ marginTop: '0px', color: '#909090' }} dangerouslySetInnerHTML={{ __html: measure.description }} />
            <div style={{ display: 'flex', marginTop: '10px' }}>
              {measure.additionalButtons.map((button, index) => (
                <Button
                  key={index}
                  variant="contained"
                  disabled={button.disabled}
                  style={{ marginRight: '5px' }}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Prevention;
