import React from 'react';
import PropTypes from 'prop-types';
import { REWARDS } from '../constants/constants';
import logger from '../utils/logger';

const RewardSummary = ({ customerData, activeMonth, onMonthSelect }) => {
  logger.info(`Rendering Reward Summary for: ${customerData.name}`);
  const { name, months, totalPoints } = customerData;

  return (
    <div className="reward-card">
      <h3>{REWARDS.RewardsFor} {name}</h3>
      <div className="total-banner">{REWARDS.TotalPointsEarned}: <strong>{totalPoints}</strong></div>
      
      <h4>{REWARDS.SubHeading}</h4>
      <div className="month-grid">
        {Object.keys(months).map(monthKey => (
          <button 
            key={monthKey} 
            onClick={() => onMonthSelect(monthKey)}
            className={activeMonth === monthKey ? 'active' : ''}
          >
            {monthKey}: {months[monthKey].points} pts
          </button>
        ))}
      </div>

      {activeMonth && (
        <div className="transaction-detail">
          <h4>{REWARDS.TransactionFor} {activeMonth}</h4>
          <ul>
            {months[activeMonth].transactions.map(t => (
              <li key={t.transactionId}>
                {t.date} - ${t.amount} ({t.points} pts)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


RewardSummary.propTypes = {
  customerData: PropTypes.shape({
    name: PropTypes.string,
    totalPoints: PropTypes.number,
    months: PropTypes.object
  }).isRequired,
  onMonthSelect: PropTypes.func.isRequired
};

export default RewardSummary;