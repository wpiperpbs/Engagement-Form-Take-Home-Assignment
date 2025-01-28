export interface EngagementFormData {
  customerId: string;
  signupDate: string;
  lastEngagementDate: string;
  engagementScore: number;
  subscriptionType: 'Basic' | 'Premium' | 'VIP';
  churnStatus: boolean;
}

// You may want to add additional types or interfaces here as needed
// For example, you might want to add types for form validation errors
// or API responses 