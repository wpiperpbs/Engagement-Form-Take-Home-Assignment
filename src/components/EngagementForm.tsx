import { useState, useEffect } from 'react';
import type { EngagementFormData } from '../types/engagement';
import { generateCustomerId } from '../utils/idGenerator';
import { exportToCSV } from '../utils/csvExport';
import { mockEngagementData } from '../data/mockEngagementData';

export const EngagementForm = () => {
  const [formData, setFormData] = useState<EngagementFormData>({
    customerId: '',
    signupDate: '',
    lastEngagementDate: '',
    engagementScore: 0,
    subscriptionType: 'Basic',
    churnStatus: false,
  });

  const [dataEntries, setDataEntries] = useState<EngagementFormData[]>([]);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    try {
      setDataEntries(mockEngagementData);
      setError('');
    } catch (err) {
      console.error('Error loading mock data:', err);
      setError('Failed to load mock data.');
    }
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000); // Clear success message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate that Signup Date is provided
    if (!formData.signupDate) {
      setError('Signup Date is required.');
      setSuccess('');
      return;
    }
  
    // Validate that Last Engagement Date is not earlier than Signup Date
    if (
      formData.lastEngagementDate &&
      new Date(formData.lastEngagementDate) < new Date(formData.signupDate)
    ) {
      setError('Last Engagement Date cannot be earlier than Signup Date.');
      setSuccess('');
      return;
    }
  
    // Generate a new customer ID and create the new entry
    const newEntry = {
      ...formData,
      customerId: generateCustomerId(),
    };
  
    // Add the new entry to the mock data
    setDataEntries((prev) => [...prev, newEntry]);
  
    // Export data to CSV
    exportToCSV(newEntry);
  
    // Clear the form
    setFormData({
      customerId: '',
      signupDate: '',
      lastEngagementDate: '',
      engagementScore: 0,
      subscriptionType: 'Basic',
      churnStatus: false,
    });
  
    // Update messages
    setSuccess('Form submitted successfully!');
    setError('');
  };
  

  return (
    <div>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="signupDate">Signup Date:</label>
          <input
            type="date"
            id="signupDate"
            value={formData.signupDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, signupDate: e.target.value }))
            }
            required
          />
        </div>

        <div>
          <label htmlFor="lastEngagementDate">Last Engagement Date:</label>
          <input
            type="date"
            id="lastEngagementDate"
            value={formData.lastEngagementDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, lastEngagementDate: e.target.value }))
            }
          />
        </div>

        <div>
          <label htmlFor="engagementScore">Engagement Score:</label>
          <input
            type="number"
            id="engagementScore"
            value={formData.engagementScore}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                engagementScore: Math.min(100, Math.max(0, +e.target.value)),
              }))
            }
            required
          />
        </div>

        <div>
          <label htmlFor="subscriptionType">Subscription Type:</label>
          <select
            id="subscriptionType"
            value={formData.subscriptionType}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                subscriptionType: e.target.value as 'Basic' | 'Premium' | 'VIP',
              }))
            }
          >
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="VIP">VIP</option>
          </select>
        </div>

        <div>
          <label htmlFor="churnStatus">Churn Status:</label>
          <select
            id="churnStatus"
            value={formData.churnStatus ? 'Active' : 'Inactive'}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, churnStatus: e.target.value === 'Active' }))
            }
          >
            <option value="Inactive">Inactive</option>
            <option value="Active">Active</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>

      <div>
        <h3>Mock Engagement Data:</h3>
        <ul>
          {dataEntries.map((entry) => (
            <li key={entry.customerId}>
              {entry.customerId} - {entry.signupDate} - {entry.subscriptionType}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
