import React, { useState, useEffect, useMemo } from 'react';
import logger from './utils/logger.js';
import './App.css';
import TransactionTable from './components/TransactionTable.js';
import { processCustomerData } from './utils/rewardCalc';
import RewardSummary from './components/RewardSummary.js';
import { MAIN_PAGE } from './constants/constants.js';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [activeMonth, setActiveMonth] = useState(null);

  // 1. Get unique customers for your primary list/table
  const uniqueCustomers = useMemo(() => {
    const map = new Map();
    data.forEach(t => map.set(t.customerId, t));
    return Array.from(map.values());
  }, [data]);

  // 2. Filter data for the selected customer
  const customerDetails = useMemo(() => {
    if (!selectedCustomer) return null;
    const customerTransactions = data.filter(
      t => t.customerId === selectedCustomer.customerId
    );
    return processCustomerData(customerTransactions);
  }, [selectedCustomer, data]);
  
  useEffect(() => {
    logger.info("Fetching transaction data...");
    
    // Simulating API Interaction
    let fetchApi = setTimeout(() => {
      fetch('/data/transactions.json')
        .then(res => {
          
          if (!res.ok) throw new Error("Failed to fetch data");
          return res.json();
        })
        .then(json => {
          setData(json);
          setLoading(false);
          logger.info("Data loaded successfully");
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
          logger.error("Error fetching data: " + err.message);
        });
    }, 1500); // 1.5s delay
    return ()=>clearInterval(fetchApi)
  }, []);
  const onRowClickHandler=(customer)=>{
        if(!customer?.customerId) return
        logger.info(`Customer row clicked: ${customer?.name}`)
        setSelectedCustomer(customer);
          setActiveMonth(null);
    }
  if (loading) return <div>Loading Rewards...</div>;
  if (error) return <div>Error: {error}</div>;
console.log(data)

  return (
    <div className="App">
       {/* Components go here */}
       <header className="top-header">
        <h1 className="app-heading">{MAIN_PAGE.Header}</h1>
      </header>

      {/* Your main content area */}
      <br></br><br></br>
      <main className="main-container">
        {/* Your customer list and reward tables will go here */}
        <TransactionTable data={uniqueCustomers} onRowClick={(row)=>onRowClickHandler(row)} />

        {selectedCustomer && (
        <RewardSummary 
          customerData={customerDetails} 
          activeMonth={activeMonth}
          onMonthSelect={setActiveMonth}
        />
      )}
      </main>
    </div>
  );
}

export default App