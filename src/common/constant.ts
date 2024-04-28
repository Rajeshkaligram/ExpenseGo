import {colors} from '.';

export const I_EXPENSES_KEY = {
  Food: 'Food',
  Transport: 'Transport',
  Shopping: 'Shopping',
  Cloth: 'Cloth',
  Travel: 'Travel',
  Education: 'Education',
  Beauty: 'Beauty',
  Vegetables: 'Vegetables',
  Bills: 'Bills',
  Others: 'Others',
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
    name: 'shirt',
    color: colors.black,
  },
  {
    key: I_EXPENSES_KEY.Shopping,
    displayName: I_EXPENSES_KEY.Shopping,
    type: 'MaterialCommunityIcons',
    name: 'shopping',
    color: colors.red,
  },
  {
    key: I_EXPENSES_KEY.Transport,
    displayName: I_EXPENSES_KEY.Transport,
    type: 'FontAwesome',
    name: 'bus',
    color: colors.greyText,
  },
  {
    key: I_EXPENSES_KEY.Education,
    displayName: I_EXPENSES_KEY.Education,
    type: 'MaterialCommunityIcons',
    name: 'book-education',
    color: colors.tabIconColor,
  },
  {
    key: I_EXPENSES_KEY.Travel,
    displayName: I_EXPENSES_KEY.Travel,
    type: 'MaterialIcons',
    name: 'flight',
    color: colors.sky,
  },
  {
    key: I_EXPENSES_KEY.Beauty,
    displayName: I_EXPENSES_KEY.Beauty,
    type: 'MaterialCommunityIcons',
    name: 'lipstick',
    color: colors.green,
  },
  {
    key: I_EXPENSES_KEY.Vegetables,
    displayName: I_EXPENSES_KEY.Vegetables,
    type: 'FontAwesome5',
    name: 'carrot',
    color: colors.red,
  },
  {
    key: I_EXPENSES_KEY.Bills,
    displayName: I_EXPENSES_KEY.Bills,
    type: 'FontAwesome5',
    name: 'book',
    color: colors.mainColor,
  },
  {
    key: I_EXPENSES_KEY.Others,
    displayName: I_EXPENSES_KEY.Others,
    type: 'FontAwesome',
    name: 'recycle',
    color: colors.sky,
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
