import { useState, useEffect } from 'react';
import type { EngagementFormData } from '../types/engagement';
import { generateCustomerId } from '../utils/idGenerator';
import { exportToCSV } from '../utils/csvExport';
import './EngagementForm.css';

export const EngagementForm = () => {
  const [formData, setFormData] = useState<EngagementFormData>({
    customerId: '',
    signupDate: '',
    lastEngagementDate: '',
    engagementScore: 0,
    subscriptionType: 'Basic',
    churnStatus: false,
  });

  const [engagementData, setEngagementData] = useState<EngagementFormData[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch JSON data from the public directory
  useEffect(() => {
    fetch('/mock-data/engagementData.json')
      .then((response) => response.json())
      .then((data) => setEngagementData(data))
      .catch((error) => console.error('Error loading engagement data:', error));
  }, []);

  // Automatically clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.signupDate || !formData.lastEngagementDate || formData.engagementScore === 0) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }
  
    if (new Date(formData.lastEngagementDate) < new Date(formData.signupDate)) {
      setErrorMessage('Last Engagement Date cannot be earlier than Signup Date.');
      return;
    }
  
    const newEntry: EngagementFormData = {
      ...formData,
      customerId: generateCustomerId(),
    };
  
    // Correctly update the array state
    setEngagementData((prevData) => [...prevData, newEntry]);
  
    // Ensure only one object is passed to exportToCSV
    exportToCSV(newEntry); 
  
    // Reset form
    setFormData({
      customerId: '',
      signupDate: '',
      lastEngagementDate: '',
      engagementScore: 0,
      subscriptionType: 'Basic',
      churnStatus: false,
    });
  
    setSuccessMessage('Form submitted successfully!');
    setErrorMessage('');
  };  
  
  return (
    <div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form className="engagement-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="signupDate">Signup Date:</label>
          <input
            type="date"
            id="signupDate"
            value={formData.signupDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, signupDate: e.target.value }))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastEngagementDate">Last Engagement Date:</label>
          <input
            type="date"
            id="lastEngagementDate"
            value={formData.lastEngagementDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, lastEngagementDate: e.target.value }))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="engagementScore">Engagement Score:</label>
          <input
            type="number"
            id="engagementScore"
            value={formData.engagementScore}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                engagementScore: Math.max(0, Math.min(Number(e.target.value), 100)),
              }))
            }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subscriptionType">Subscription Type:</label>
          <select
            id="subscriptionType"
            value={formData.subscriptionType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, subscriptionType: e.target.value as 'Basic' | 'Premium' | 'VIP' }))
            }
          >
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="VIP">VIP</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="churnStatus">Churn Status:</label>
          <select
            id="churnStatus"
            value={formData.churnStatus ? 'Active' : 'Inactive'}
            onChange={(e) => setFormData((prev) => ({ ...prev, churnStatus: e.target.value === 'Active' }))}>
            <option value="Inactive">Inactive</option>
            <option value="Active">Active</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};