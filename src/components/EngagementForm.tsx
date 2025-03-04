import { useState } from 'react';
import type { EngagementFormData } from '../types/engagement';
import { generateCustomerId } from '../utils/idGenerator';
import { exportToCSV } from '../utils/csvExport';

export const EngagementForm = () => {
  // Initializes form data
  const [formData, setFormData] = useState<EngagementFormData>({
    customerId: '', // This will be auto-generated on submission
    signupDate: '',
    lastEngagementDate: '',
    engagementScore: '',
    subscriptionType: '',
    churnStatus: false
  });

  // Resets form data on submission
  const resetFormData = () => {
    setFormData({
      customerId: '', 
      signupDate: '',
      lastEngagementDate: '',
      engagementScore: '',
      subscriptionType: '',
      churnStatus: false
    });
  };

  // Prints Success Message upon submission
  const[successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry = {
      // Generates customer ID
      customerId: generateCustomerId(),
      signupDate: formData.signupDate,
      engagementScore: formData.engagementScore,
      lastEngagementDate: formData.lastEngagementDate,
      subscriptionType: formData.subscriptionType,
      churnStatus: formData.churnStatus
    };

    // Validate form data
    if (!formData.signupDate || !formData.lastEngagementDate || !formData.engagementScore
      || !formData.subscriptionType || !formData.churnStatus) {
      throw new Error('Please fill in all required fields');
     }


    // exports data to CSV
    exportToCSV(newEntry); // This will combine with mock data
    
    // Displays success message on submission
    setSuccessMessage('Your engagement information was recorded successfully!');

    //Resets form data on submission
    resetFormData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {successMessage}
      </div>
      <div className="form">
        <label htmlFor="signupDate">Signup Date: </label>
        <input
          type="date"
          id="signupDate"
          name="signupDate"
          value={formData.signupDate}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            signupDate: e.target.value as EngagementFormData["signupDate"]
          }))}
          required
        />
      </div>
      <div className="form">
        <label htmlFor="subscriptionType">Subscription Type: </label>
        <select
          id="subscriptionType"
          name="subscriptionType"
          value={formData.subscriptionType}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            subscriptionType: e.target.value as EngagementFormData["subscriptionType"]
          }))}
          required
        >
          <option value="">Select a Subscription Type</option>
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
          <option value="VIP">VIP</option>
        </select>
      </div>     
      <div className="form">
        <label htmlFor="engagementScore">Engagement Score: </label>
        <input
          type="number"
          min={0}
          max={100}
          id="engagementScore"
          name="engagementScore"
          value={formData.engagementScore}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            engagementScore: Number(e.target.value) as EngagementFormData['engagementScore']
          }))}
          required
        />
      </div>
      <div className="form">
        <label htmlFor="lastEngagementDate">Last Engagement Date: </label>
        <input
          type="date"
          id="lastEngagementDate"
          name="lastEngagementDate"
          min={formData.signupDate}
          value={formData.lastEngagementDate}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            lastEngagementDate: e.target.value as EngagementFormData['lastEngagementDate']
          }))}
          required
        />
      </div>
      <div className="form">
        <label htmlFor="churnStatus">Churn Status: </label>
        <select
          id="churnStatus"
          name="churnStatus"
          value={formData.churnStatus ? 'true' : 'false'}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            churnStatus: Boolean(e.target.value) as EngagementFormData["churnStatus"]
          }))}
          required
        >
          <option value="">Select a Churn Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>           
      <button type="submit">Submit</button>
    </form>
  );
}; 