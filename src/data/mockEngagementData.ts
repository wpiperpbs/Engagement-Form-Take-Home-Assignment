import type { EngagementFormData } from '../types/engagement';

export const mockEngagementData: EngagementFormData[] = [
  {
    customerId: 'USER_20231015_X7Y9Z',
    signupDate: '2023-10-15',
    lastEngagementDate: '2024-01-20',
    engagementScore: 85,
    subscriptionType: 'Premium',
    churnStatus: false
  },
  {
    customerId: 'USER_20230605_A1B2C',
    signupDate: '2023-06-05',
    lastEngagementDate: '2023-12-15',
    engagementScore: 45,
    subscriptionType: 'Basic',
    churnStatus: true
  },
  {
    customerId: 'USER_20231201_K9L8M',
    signupDate: '2023-12-01',
    lastEngagementDate: '2024-01-25',
    engagementScore: 92,
    subscriptionType: 'VIP',
    churnStatus: false
  }
]; 