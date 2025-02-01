import { saveAs } from 'file-saver';
export interface EngagementFormData {
    customerId: string;
    signupDate: string;  // Or Date if you're using Date objects
    lastEngagementDate: string;  // Or Date
    engagementScore: number;
    subscriptionType: string;
    churnStatus: boolean;
  }
// Function to convert data array to CSV
export const exportToCSV = (data: { [key: string]: any }[]) => {
    if (data.length === 0) return;
  
    const headers = Object.keys(data[0]); // Dynamically get headers based on the object keys
    const csvRows = [
      headers.join(','), // Add headers
      ...data.map((entry) =>
        headers.map(header => entry[header]).join(',')
      ),
    ];
  
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'engagement_data.csv');
  };
  