import React, { useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
const BudgetsContext = React.createContext();

export function useBudgets() {
  return useContext(BudgetsContext);
}

// {
//   id:
//   name:
//   max:
// }

// {
//   id:
//   budgetId:
//   amount:
//   description:
// }

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.id === budgetId);
  }

  function addExpense({ description, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  }

  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }

  function deleteBudget({ id }) {
    // TODO: Deal with expenses
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }

  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses, // function that will allow us to get the budget expenses
        addExpense, // function for adding an expense
        addBudget, // adding a Budget
        deleteBudget, // delete a Budget
        deleteExpense, // delete an Expense
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
