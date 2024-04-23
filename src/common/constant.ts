import {colors} from '.';

export const I_EXPENSES_KEY = {
  Food: 'Food',
  Transport: 'Transport',
  Shopping: 'Shopping',
  Cloth: 'Cloth',
};

export const I_EXPENSES = [
  {
    key: I_EXPENSES_KEY.Food,
    displayName: I_EXPENSES_KEY.Food,
    type: 'Ionicons',
    name: 'fast-food',
    color: colors.mainColor,
  },
  {
    key: I_EXPENSES_KEY.Cloth,
    displayName: I_EXPENSES_KEY.Cloth,
    type: 'Ionicons',
    name: 'fast-food',
    color: colors.black,
  },
  {
    key: I_EXPENSES_KEY.Shopping,
    displayName: I_EXPENSES_KEY.Shopping,
    type: 'Ionicons',
    name: 'fast-food',
    color: colors.red,
  },
  {
    key: I_EXPENSES_KEY.Transport,
    displayName: I_EXPENSES_KEY.Transport,
    type: 'Ionicons',
    name: 'fast-food',
    color: colors.greyText,
  },
];

export const EXPENSE_INFO = {
  AMOUNT: 'amount',
  NOTE: 'note',
  DATE: 'date',
};

export const I_TYPE_KEY = {
  EXPENSE: 'Expense',
  INCOME: 'Income',
};

export const I_TYPE = [
  {
    key: I_TYPE_KEY.EXPENSE,
    displayName: 'Expense',
  },
  {
    key: I_TYPE_KEY.INCOME,
    displayName: 'Income',
  },
];
