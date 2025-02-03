export interface EngagementFormData {
  customerId: string;
  signupDate: string;
  lastEngagementDate: string;
  engagementScore: number;
  subscriptionType: SubscriptionType;
  churnStatus: 'active' | 'inactive';
}

// You may want to add additional types or interfaces here as needed
// For example, you might want to add types for form validation errors
// or API responses 

export type SubscriptionType = 'Basic' | 'Premium' | 'Enterprise';

export type Tab = {
  id: string;
  label: string;
}