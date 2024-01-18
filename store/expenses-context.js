import { createContext, useReducer } from 'react';

// const DUMMY_EXPENSES = [
//   {
//     id: 'e1',
//     description: 'A pair of shoes',
//     amount: 59.99,
//     date: new Date('2021-12-19'),
//   },
//   {
//     id: 'e2',
//     description: 'Some bananas',
//     amount: 41.18,
//     date: new Date('2019-10-10'),
//   },
//   {
//     id: 'e3',
//     description: 'A book',
//     amount: 20.54,
//     date: new Date('2020-11-21'),
//   },
//   {
//     id: 'e4',
//     description: 'A book',
//     amount: 20.54,
//     date: new Date('2020-11-21'),
//   },
//   {
//     id: 'e5',
//     description: 'A book',
//     amount: 20.54,
//     date: new Date('2020-11-21'),
//   },
//   {
//     id: 'e6',
//     description: 'A book',
//     amount: 20.54,
//     date: new Date('2020-11-21'),
//   },
//   {
//     id: 'e7',
//     description: 'A book',
//     amount: 20.54,
//     date: new Date('2020-11-21'),
//   },
// ];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  setExpenses: (expenses) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      // const id = new Date().toString() + Math.random().toString;
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      console.log('action:', action);
      const updatetableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatetableExpense = state[updatetableExpenseIndex];
      const updatedItem = { ...updatetableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatetableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload.id);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }
  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  function setExpenses(expense) {
    dispatch({ type: 'SET', payload: expense });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
    setExpenses: setExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
