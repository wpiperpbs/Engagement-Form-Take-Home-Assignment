// You'll need these imports when implementing the form:
import { useState, useCallback } from 'react';
import type { EngagementFormData } from '../types/engagement';
import { generateCustomerId } from '../utils/idGenerator';
import { exportToCSV } from '../utils/csvExport';
import {
  GlobalStyle,
  FormContainer,
  FormGroup,
  ScoreRange,
  Label,
  Input,
  Select,
  SubmitButton,
  ErrorMessage,
  SuccessMessage,
  ChurnToggle,
  Toggle
} from './FormStyles';

interface FormErrors {
  signupDate?: string;
  lastEngagementDate?: string;
  engagementScore?: string;
  subscriptionType?: string;
}

const initialFormState: Omit<EngagementFormData, 'customerId'> = {
  signupDate: '',
  lastEngagementDate: '',
  engagementScore: 50,
  subscriptionType: 'Basic',
  churnStatus: false
};

export const EngagementForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};
    const today = new Date().toISOString().split('T')[0];

    // Validate signup date
    if (!formData.signupDate) {
      newErrors.signupDate = 'Signup date is required';
    } else if (formData.signupDate > today) {
      newErrors.signupDate = 'Signup date cannot be in the future';
    }

    // Validate last engagement date
    if (!formData.lastEngagementDate) {
      newErrors.lastEngagementDate = 'Last engagement date is required';
    } else if (formData.lastEngagementDate < formData.signupDate) {
      newErrors.lastEngagementDate = 'Last engagement cannot be before signup';
    } else if (formData.lastEngagementDate > today) {
      newErrors.lastEngagementDate = 'Last engagement cannot be in the future';
    }

    // Validate engagement score
    const score = Number(formData.engagementScore);
    if (isNaN(score) || score < 0 || score > 100 || !Number.isInteger(score)) {
      newErrors.engagementScore = 'Score must be a whole number between 0 and 100';
    }

    return newErrors;
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setIsSubmitting(true);

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const newEntry = {
        ...formData,
        customerId: generateCustomerId()
      };
      
      await exportToCSV(newEntry);
      setSuccess(true);
      setFormData(initialFormState);
      setErrors({});
    } catch (error) {
      setErrors({ 
        subscriptionType: 'Failed to export data. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
    setSuccess(false);
  };

  return (
    <>
      <GlobalStyle />
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="signupDate">Signup Date</Label>
          <Input
            type="date"
            id="signupDate"
            name="signupDate"
            value={formData.signupDate}
            onChange={handleInputChange}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.signupDate && <ErrorMessage>{errors.signupDate}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="subscriptionType">Subscription Type</Label>
          <Select
            id="subscriptionType"
            name="subscriptionType"
            value={formData.subscriptionType}
            onChange={handleInputChange}
          >
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="VIP">VIP</option>
          </Select>
          {errors.subscriptionType && <ErrorMessage>{errors.subscriptionType}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="engagementScore">
            <div>Engagement Score</div>
            <ScoreRange>
            <div className="scoreRange">Range: 0-100</div>
            </ScoreRange>
          </Label>
          <Input
            type="number"
            id="engagementScore"
            name="engagementScore"
            min="0"
            max="100"
            value={formData.engagementScore}
            onChange={handleInputChange}
          />
          {errors.engagementScore && <ErrorMessage>{errors.engagementScore}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="lastEngagementDate">Last Engagement Date</Label>
          <Input
            type="date"
            id="lastEngagementDate"
            name="lastEngagementDate"
            value={formData.lastEngagementDate}
            onChange={handleInputChange}
            min={formData.signupDate}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.lastEngagementDate && <ErrorMessage>{errors.lastEngagementDate}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Churn Status</Label>
          <ChurnToggle>
            <Toggle
              id="churnStatus"
              name="churnStatus"
              checked={formData.churnStatus}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData(prev => ({ ...prev, churnStatus: e.target.checked }))
              }
            />
            <span>{formData.churnStatus ? 'Inactive' : 'Active'}</span>
          </ChurnToggle>
        </FormGroup>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Exporting...' : 'Submit'}
        </SubmitButton>

        {success && (
          <SuccessMessage>
            Data exported successfully! Form has been reset for the next entry.
          </SuccessMessage>
        )}
      </FormContainer>
    </>
  );
}; 