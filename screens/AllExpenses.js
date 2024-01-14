import React, { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

const AllExpenses = () => {
  const exoenseCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={exoenseCtx.expenses}
      expensesPeriod={'Total'}
      fallbackText={'No registered expenses found!'}
    />
  );
};

export default AllExpenses;
