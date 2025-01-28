# User Engagement Form - Take Home Assignment

## Prerequisites
- Node.js 18+ recommended
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Terminal of your choice:
  - macOS/Linux: Terminal.app, iTerm, etc.
  - Windows: Command Prompt, PowerShell, or Git Bash

## Background
You'll be working with a simplified version of a real-world feature from our application. The form collects key metrics about user engagement, including their subscription status, engagement level, and activity dates. This data helps us understand user behavior and engagement patterns.

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Mock Data Structure
The application comes with mock engagement data to simulate a realistic dataset. Your form submissions will be combined with this data when exporting to CSV. The mock data includes:
- Premium user with high engagement
- Basic user who has churned
- VIP user with very high engagement

This allows you to focus on implementing the form while still producing meaningful CSV exports.

## Core Requirements

Build a single-page form with the following fields:
- Signup Date (when the user started, format: YYYY-MM-DD)
- Subscription Type (Basic, Premium, or VIP)
- Engagement Score (0-100 scale, whole numbers only)
- Last Engagement Date (format: YYYY-MM-DD, must not be earlier than Signup Date)
- Churn Status (active/inactive)

Basic Validation Requirements:
- Dates should be in YYYY-MM-DD format
- Engagement Score must be a whole number between 0 and 100
- Last Engagement Date cannot be earlier than Signup Date
- All fields are required

On submission:
- Export the collected data as a CSV file
- Clear the form for the next entry
- Show appropriate success/error messages

CSV Export Format:
- Headers: CustomerID,SignupDate,LastEngagementDate,EngagementScore,SubscriptionType,ChurnStatus
- Dates in YYYY-MM-DD format
- One entry per line
- Exports combine your new entry with provided mock data for a more complete dataset
- File downloads automatically as 'engagement_data.csv'

Error Handling Examples:
- Invalid date formats
- Invalid engagement score
- Last engagement date before signup date
- Missing required fields

## What's Provided
- Basic project structure with React + TypeScript + Vite
- Type definitions for the form data
- Basic component structure
- Mock engagement data (3 example records)
- CSV export utility (combines mock data + new entries)
- Customer ID generation utility (automatically creates unique IDs)
- Example implementation comments

## What You Need to Implement
1. Form state management
2. Form fields with appropriate validation
3. CSV export functionality
4. Success/error messaging
5. Form reset functionality
6. Basic styling

## Technical Focus Areas
- React component organization
- TypeScript type definitions
- Form validation and error handling
- Data export functionality
- Clean, maintainable code

## What's Not Required
- Complex state management (Redux, etc.)
- Backend integration
- Advanced styling or animations
- Complex validation rules
- Unit tests (though you're welcome to add them)

## Time Expectation
- Aim to spend 1-2 hours on this assignment
- Focus on core functionality first
- Document any additional features you would add with more time

## Submission
1. Create a new repository with your solution
2. Include a README with:
   - Setup instructions
   - Any assumptions made
   - Additional features you would add with more time
   - Any other relevant notes

## Evaluation Criteria
- Clear, well-structured code
- Proper use of TypeScript
- Basic error handling
- Attention to user experience
- Understanding of React fundamentals

## Troubleshooting
Common issues and solutions:

1. **Module not found errors**
   - Run `npm install` again
   - Clear npm cache: `npm clean-cache --force`

2. **TypeScript errors**
   - Ensure you're using the correct types from `src/types/engagement.ts`
   - Check that your dates follow the YYYY-MM-DD format

3. **CSV Export Issues**
   - Check that you're passing the correct data structure to `exportToCSV`
   - Ensure your browser allows file downloads

4. **Development Server Issues**
   - Default port is 5173
   - Kill any processes using the port: `lsof -i :5173`
   - Or try running on a different port: `npm run dev -- --port 3000`
