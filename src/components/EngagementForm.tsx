// You'll need these imports when implementing the form:
import { useState } from 'react';
import type { EngagementFormData, SubscriptionType, Tab } from '../types/engagement';
import { generateCustomerId } from '../utils/idGenerator';
import { exportToCSV } from '../utils/csvExport';
import Input from './ui/Input';
import TabsSelect from './ui/TabsSelect';
import { SubmitHandler, useForm } from 'react-hook-form';

// Regex to validate date format
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// Define the subscription and churn status options for tabs
const subscriptionOptions: Tab[] = [
  { id: 'basic', label: 'Basic' },
  { id: 'premium', label: 'Premium' },
  { id: 'enterprise', label: 'Enterprise' }
]
const churnStatusOptions: Tab[] = [
  { id: 'inactive', label: 'Inactive' },
  { id: 'active', label: 'Active' }
]

export const EngagementForm = () => {

  // Define the form with react-hook-form
  const { register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    watch, 
    setValue,
    reset,
  } = useForm<EngagementFormData> ({
    defaultValues: {
      signupDate: '',
      lastEngagementDate: '',
      engagementScore: 0,
      subscriptionType: 'basic' as SubscriptionType,
      churnStatus: 'inactive'
    }
  });

  // Watch values for use in validation and input components
  const currentEngagementScore = watch('engagementScore');
  const currentSignupDate = watch('signupDate');

  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  // Create customer ID, export to CSV, and reset form on submit
  const onSubmit: SubmitHandler<EngagementFormData> = (formData) => {
    const formDataWithCustomerId: EngagementFormData = {
      ...formData,
      customerId: generateCustomerId()
    };
    setSuccessMessage('Form submitted successfully!');
    exportToCSV(formDataWithCustomerId);
    reset();
  };

  return (
    <form className='engagementForm' onSubmit={handleSubmit(onSubmit)}>
      <div className='formGroup'>
        <label htmlFor="signupDate">Signup Date:</label>
        <Input 
          id='signupDate'
          type='date' 
          {...register('signupDate', { 
            required: "This field is required",
            validate: (value) => {
              if (!dateRegex.test(value)) {
                return 'Date must be in YYYY-MM-DD format';
              }
              return true;
            }
          })}
        />
        <p className='form-error'>{errors.signupDate?.message}</p>
      </div>

      <div className='formGroup'>
        <label htmlFor="subscriptionType">Subscription Type</label>
        <TabsSelect 
          tabs={subscriptionOptions}
          name='subscriptionType'
          label='Subscription Type'
          register={register}
          watch={watch}
        />
        <p className='form-error'>{errors.subscriptionType?.message}</p>
      </div>

      <div className='formGroup'>
        <label htmlFor="engagementScore">Engagement Score:</label>
        <div className='sideBySideInputs'>
          <Input
            style={{ width: 'min-content' }}
            id='engagementScoreInput'
            aria-label="Engagement score number input"
            type='number'
            min={0}
            max={100}
            value={currentEngagementScore}
            {...register('engagementScore', {
              required: "This field is required",
              min: { value: 0, message: "Engagement score must be at least 0" },
              max: { value: 100, message: "Engagement score must be at most 100" }
            })}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
                setValue("engagementScore", value > 100 ? 100 : value, {
                shouldValidate: true,
              });
            }}
          />
          <Input
            style={{ padding: '0', color: 'black' }}
            id='engagementScoreSlider'
            aria-label="Engagement score slider"
            aria-valuenow={currentEngagementScore}
            min={0}
            max={100}
            type='range'
            value={currentEngagementScore}
            {...register('engagementScore', {
              required: "This field is required",
              min: { value: 0, message: "Engagement score must be at least 0" },
              max: { value: 100, message: "Engagement score must be at most 100" }
            })}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              setValue("engagementScore", value > 100 ? 100 : value, {
                shouldValidate: true,
              });
            }}
          />
        </div>
        <p className='form-error'>{errors.engagementScore?.message}</p>
      </div>

      <div className='formGroup'>
        <label htmlFor="lastEngagementDate">Last Engagement Date:</label>
        <Input
          id='lastEngagementDate'
          type='date'
          {...register('lastEngagementDate', { 
            required: "This field is required", 
            validate: (value) => {
              if(value <= currentSignupDate) {
                return 'Last engagement date must be after signup date';
              }
              if (!dateRegex.test(value)) {
                return 'Date must be in YYYY-MM-DD format';
              }
              return true;
            }
          })}
        />
        <p className='form-error'>{errors.lastEngagementDate?.message}</p>
      </div>

      <div className='formGroup'>
        <label htmlFor="churnStatus">Churn Status:</label>
        <TabsSelect
          tabs={churnStatusOptions}
          name='churnStatus'
          label='Churn Status'
          register={register}
          watch={watch}
        />
        <p className='form-error'>{errors.churnStatus?.message}</p>
      </div>

      <div className='formGroup'>
        <button type="submit" disabled={isSubmitting} >Submit</button>
        <p className='form-success'>{successMessage}</p>
      </div>
    </form>
  );
}; 