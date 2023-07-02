import React from 'react';
import { PageLayout } from '../PageLayout';
import Button from '@mui/material/Button';

const Prevention: React.FC = () => {
  return (
    <PageLayout>
      <div>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'left' }}>Prevention Measures</h3>
        <p style={{ textAlign: 'left' }}>Based on the result of the risk analysis, the severity of these risks and your negotiation power, the following prevention measures are required.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginTop: '20px' }}>
          <div className="rectangle">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ marginBottom: '10px', marginRight: '10px' }}>Request ESG self-disclosure of supplier</h4>
              <div>
                <Button variant="contained" color="primary" style={{ marginRight: '5px' }}>Shared</Button>
                <Button variant="contained" color="primary" style={{ marginRight: '5px' }}>Optional</Button>
                <Button variant="contained" color="primary">To Do</Button>
              </div>
              <span style={{ marginRight: '10px' }}>Priority: Low</span>
            </div>
            <p style={{ marginTop: '10px' }}>Send an ESG self-disclosure form to your supplier and ask them for information on the current state of human rights and environmental protection at their production sites. In case of self-reported violations, you should help them to shape their production ESG-friendly.</p>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <Button variant="contained" color="success" style={{ marginRight: '5px' }}>View Form</Button>
              <Button variant="contained" color="success" style={{ marginRight: '5px' }}>Send Form</Button>
              <Button variant="contained" disabled>View Filled Out Form</Button>
            </div>
          </div>

          <div className="rectangle">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ marginBottom: '10px', marginRight: '10px' }}>Research Known ESG risks</h4>
              <div>
                <Button variant="contained" color="primary" style={{ marginRight: '5px' }}>In Progress</Button>
              </div>
              <span style={{ marginRight: '10px' }}>Priority: High</span>
            </div>
            <p style={{ marginTop: '10px' }}>Create a list of employees who have potentially worked with the supplier (e.g. employees in your purchase department) and send them the 'ESG Risk Identification' form. The form asks questions about known violations of human rights or environmental standards.</p>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <Button variant="contained" color="success" style={{ marginRight: '5px' }}>View Form</Button>
              <Button variant="contained" color="success" style={{ marginRight: '5px' }}>Create List</Button>
              <Button variant="contained" disabled style={{ marginRight: '5px' }}>Send Form</Button>
              <Button variant="contained" disabled style={{ marginRight: '5px' }}>View Filled Out Form</Button>
            </div>
          </div>

          <div className="rectangle">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ marginBottom: '10px', marginRight: '10px' }}>Schedule Information Meeting: Upcoming Measures</h4>
              <div>
                <Button variant="contained" color="primary" style={{ marginRight: '5px' }}>Optinal</Button>
                <Button variant="contained" color="primary" style={{ marginRight: '5px' }}> ToDo</Button>
              </div>
              <span style={{ marginRight: '10px' }}>Priority: Medium</span>
            </div>
            <p style={{ marginTop: '10px' }}>Change is most likely to occur when your supplier has a contact person and gets regular support and feedback. Have a meeting with your supplier to inform them about your legal obligations and convince them to cooperate closely.</p>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <Button variant="contained" color="success" style={{ marginRight: '5px' }}>Upload Meeting Notes</Button>
              <Button variant="contained" color="success">View Meeting Notes</Button>
            </div>
          </div>

          <div className="rectangle">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ marginBottom: '10px', marginRight: '10px' }}>Conclude Supplementary Agreement</h4>
              <div>
                <Button variant="contained" color="primary">Done</Button>
              </div>
              <span style={{ marginRight: '10px' }}>Priority: High</span>
            </div>
            <p style={{ marginTop: '10px' }}>Conclude a supplementary agreement with your supplier that commits them to make efforts to reach good ESG standards.</p>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <Button variant="contained" color="success" style={{ marginRight: '5px' }}>View Form</Button>
              <Button variant="contained" color="success" style={{ marginRight: '5px' }}>Sign Form</Button>
              <Button variant="contained" color="success">Send Form</Button>
            </div>
          </div>

          <div className="rectangle">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ marginBottom: '10px', marginRight: '10px' }}>Establish Complaint Mechanisms</h4>
              <div>
                <Button variant="contained" color="primary">Done</Button>
              </div>
              <span style={{ marginRight: '10px' }}>Priority: High</span>
            </div>
            <p style={{ marginTop: '10px' }}>SustainMind offers you to set up complaint mechanisms for the employees of your supplier to report ESG violations.</p>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <Button variant="contained" color="success" style={{ marginRight: '5px' }}>Setup Complaint System</Button>
              <Button variant="contained" color="success">View Complaints</Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Prevention;
