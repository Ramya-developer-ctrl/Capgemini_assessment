
export const processCustomerData = (transactions) => {
  // 1. Initial structure
  const summary = {
    months: {}, // Key will be "Month Year" (e.g., "January 2026")
    totalPoints: 0,
    name: transactions.length > 0 ? transactions[0].name : "Unknown Customer"
  };

  transactions.forEach((trans) => {
    const { amount, date } = trans;
    
    // 2. Calculate points for this specific transaction
    const points = calculatePoints(amount);

    // 3. Format the month/year key for grouping
    const dateObj = new Date(date);
    const monthName = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    const monthKey = `${monthName} ${year}`;

    // 4. Initialize the month group if it doesn't exist
    if (!summary.months[monthKey]) {
      summary.months[monthKey] = {
        points: 0,
        transactions: []
      };
    }

    // 5. Aggregate data
    summary.months[monthKey].points += points;
    summary.months[monthKey].transactions.push({
      ...trans,
      calcPoints: points // Adding the points earned for this specific transaction
    });
    
    summary.totalPoints += points;
  });

  return summary;
};

export const calculatePoints = (amount) => {
    if (!amount || amount <= 50) return 0;
    let points = 0;
    if (amount > 100) {
      points += (amount - 100) * 2; // 2 points for every dollar over 100
      points += 50; // 1 point for every dollar between 50 and 100
    } else if (amount > 50) {
      points += (amount - 50) * 1; // 1 point for every dollar between 50 and 100
    }
    return Math.floor(points);
  };