import React from 'react';

// Mock data for billing in remote healthcare project
const mockBillings = [
  {
    sessionId: 'RH-SESS-001',
    date: '2025-04-10',
    patientId: 'PAT-1001',
    practitioner: 'Dr. Anil Mehta',
    appointmentType: 'Tele-consultation – Chronic Care',
    durationMinutes: 30,
    status: 'Completed',
    outcome: 'Medication dosage adjusted',
    notes: 'Patient reported stable vitals; follow-up in 2 weeks.',
    amount: '$120.00'
  },
  {
    sessionId: 'RH-SESS-002',
    date: '2025-04-20',
    patientId: 'PAT-1002',
    practitioner: 'Dr. Priya Kapoor',
    appointmentType: 'Tele-triage – Acute Symptoms',
    durationMinutes: 15,
    status: 'Completed',
    outcome: 'Referred to in-person evaluation',
    notes: 'Respiratory distress noted; escalated to ED.',
    amount: '$75.00'
  },
  {
    sessionId: 'RH-SESS-003',
    date: '2025-05-05',
    patientId: 'PAT-1003',
    practitioner: 'Dr. Rohit Singh',
    appointmentType: 'Tele-therapy – Mental Health',
    durationMinutes: 45,
    status: 'No-Show',
    outcome: 'Reschedule requested',
    notes: 'Client did not join; automated reminder sent.',
    amount: '$0.00'
  }
];

const BillingsPage: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px', color: '#ffffff' }}>
        Billings
      </h1>
      {mockBillings.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr style={{ backgroundColor: '#f7fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={headerCell}>Session ID</th>
              <th style={headerCell}>Date</th>
              <th style={headerCell}>Patient ID</th>
              <th style={headerCell}>Practitioner</th>
              <th style={headerCell}>Appointment Type</th>
              <th style={headerCell}>Duration (mins)</th>
              <th style={headerCell}>Status</th>
              <th style={headerCell}>Outcome</th>
              <th style={headerCell}>Notes</th>
              <th style={headerCell}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {mockBillings.map((bill, index) => (
              <tr key={bill.sessionId} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9fafb', borderBottom: '1px solid #e2e8f0' }}>
                <td style={bodyCell}>{bill.sessionId}</td>
                <td style={bodyCell}>{bill.date}</td>
                <td style={bodyCell}>{bill.patientId}</td>
                <td style={bodyCell}>{bill.practitioner}</td>
                <td style={bodyCell}>{bill.appointmentType}</td>
                <td style={bodyCell}>{bill.durationMinutes}</td>
                <td style={bodyCell}>{bill.status}</td>
                <td style={bodyCell}>{bill.outcome}</td>
                <td style={bodyCell}>{bill.notes}</td>
                <td style={bodyCell}>{bill.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: '20px', color: '#718096' }}>No billing history found.</p>
      )}
    </div>
  );
};

// Shared cell styles
const headerCell: React.CSSProperties = {
  border: '1px solid #e2e8f0',
  padding: '12px',
  textAlign: 'left',
  textTransform: 'uppercase',
  fontSize: '0.875rem',
  color: '#4a5568'
};

const bodyCell: React.CSSProperties = {
  border: '1px solid #e2e8f0',
  padding: '12px'
};

export default BillingsPage;
