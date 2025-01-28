import type { EngagementFormData } from '../types/engagement';
import { mockEngagementData } from '../data/mockEngagementData';

/**
 * Exports engagement data to CSV format.
 * Combines mock data with new entries for a more complete dataset.
 * 
 * @param newData The new form data to add to the export
 * @returns void - Triggers a file download
 * 
 * @example
 * // In your form submission handler:
 * const newEntry = {
 *   customerId: generateCustomerId(),
 *   signupDate: '2024-01-28',
 *   // ... other form data
 * };
 * exportToCSV(newEntry);
 */
export const exportToCSV = (newData: EngagementFormData): void => {
  // Combine mock data with new entry
  const allData = [...mockEngagementData, newData];
  
  // Define headers
  const headers = ['CustomerID', 'SignupDate', 'LastEngagementDate', 'EngagementScore', 'SubscriptionType', 'ChurnStatus'];
  
  // Convert data to CSV rows
  const rows = allData.map(record => [
    record.customerId,
    record.signupDate,
    record.lastEngagementDate,
    record.engagementScore,
    record.subscriptionType,
    record.churnStatus
  ]);
  
  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', 'engagement_data.csv');
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}; 