Elite Retail Rewards Documentation | Version 1.0.0 | April 2026


# Getting started with Elite Retail - Customer Rewards Dashboard

Elite Retail Rewards is a premium React application built to manage customer loyalty programs. It calculates reward points based on transaction history and provides a drill-down interface for detailed performance tracking.

#  Prerequisites
Node.js: v16.x or higher
npm: v8.x or higher

# Installation

# Clone the repository
git clone https://github.com/Ramya-developer-ctrl/Capgemini_assessment.git

# Navigate to the directory
cd retail_business

# Install dependencies
npm install


## Available Scripts 

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`


## Architecture & Components 

 1. TransactionTable Component
The primary data grid using MantineReactTable.

Global Search: Positioned at the top right for quick customer lookup.

Custom Header Filtering: Unique Year and Month dropdowns built directly into the table headers.

Persistence: Defaults to 2025 data on initial load.

Row Interaction: Clicking a row triggers the detailed Reward Summary for that customer.

2. RewardSummary Component:

The detail-view component for individual loyalty members.

Point Banner: Displays total accumulated points for the selected period.

Interactive Grid: Allows users to select specific months to view transaction-level details.

Prop Validation: Uses PropTypes to ensure data integrity for customer objects.

3. Reward Calculation Engine (rewardCalc.js)
Calculates points based on a tiered spending system:

Tier 1: 2 points for every dollar spent over $100.

Tier 2: 1 point for every dollar spent between $50 and $100.

Rounding: Uses Math.floor() to ensure fractional spending is handled accurately (e.g., $75.50 = 25 points).


 ## Unit Testing Details  
We have implemented 3 Positive and 3 Negative test cases to ensure the "Elite" reward math is accurate.
 
 ## Logging & Debugging
The application uses a custom logger utility to provide an audit trail:

logger.info(): Used for tracking filter changes (Month/Year), row selections, and high-value reward calculations.

Logic: Logs are primarily active in the development environment to maintain performance in production.

  ## Dependencies
UI: @mantine/core, mantine-react-table

Icons: tabler-icons-react

Testing: Jest, @testing-library/react

Utilities: prop-types, clsx