export interface EngagementFormData {
  customerId: string;
  signupDate: string;
  lastEngagementDate: string;
  engagementScore: number | '';
  subscriptionType: 'Basic' | 'Premium' | 'VIP' | '';
  churnStatus: boolean;
}
 
// edited subscriptionType of '' to allow default blank select 