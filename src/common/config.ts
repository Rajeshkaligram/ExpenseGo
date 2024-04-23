const colors = {
  black: '#0C0C0C',
  screenBackground: '#FEFEFE',
  tabIconColor: '#979797',
  shimmerBackground: '#EAEAEA',
  white: '#FFFFFF',
  grey: '#ececec',
  greyBorder: '#c6cedd',
  greyText: '#667085',
  darkGreyText: '#424F7B',
  red: '#FB1010',
  mainColor: '#8044FF',
};

const fonts = {
  black: 'Roboto-Black',
  bold: 'Roboto-Bold',
  light: 'Roboto-Light',
  medium: 'Roboto-Medium',
  regular: 'Roboto-Regular',
};

const formatDate = (date: {
  getDate: () => any;
  getMonth: () => number;
  getFullYear: () => any;
}) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const monthDate = (date: Date) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const monthName = months[monthIndex];

  return `${day} ${monthName} ${year}`;
};

const formatDateWithMonth = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const options = {day: 'numeric', month: 'long', year: 'numeric'};
  return date.toLocaleDateString('en-US', options);
};

export {colors, formatDate, monthDate, formatDateWithMonth, fonts};
