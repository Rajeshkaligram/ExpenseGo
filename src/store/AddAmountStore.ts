import {action, makeObservable, observable} from 'mobx';
import {I_EXPENSES, I_TYPE} from '../common/constant';
import {openDatabase} from 'react-native-sqlite-storage';

const DEFAULT_SETTINGS = {
  selectedExpense: I_EXPENSES[0],
  expenseInfo: {},
  type: I_TYPE[0],
  allTransaction: [],
};

const db = openDatabase({name: 'UserDatabase.db'});

export class AddAmountStore {
  @observable selectedExpense: any;
  @observable expenseInfo: any;
  @observable type: any;
  @observable allTransaction: any;

  constructor() {
    this.init();
    makeObservable(this);
  }

  @action
  init = () => {
    Object.keys(DEFAULT_SETTINGS).forEach(
      key => (this[key] = DEFAULT_SETTINGS[key]),
    );
  };

  // Database Operations
  @action
  saveData = async () => {
    (await db).transaction(txn => {
      txn.executeSql(
        'INSERT INTO table_user (amount, date, type, reasons, description) VALUES (?, ?, ?, ?, ?)',
        [
          this.expenseInfo?.amount,
          this.expenseInfo?.date,
          this.type?.displayName,
          this.selectedExpense?.displayName,
          this.expenseInfo?.note,
        ],
        (txt, res) => {
          console.log('Inserted rows:', res);
          if (res.rowsAffected > 0) {
            this.getData();
            console.log('Data saved successfully');
          } else {
            console.log('Failed to save data');
          }
        },
        error => {
          console.log(error);
        },
      );
    });
  };

  @action
  getData = async () => {
    (await db).transaction(txn => {
      txn.executeSql('SELECT * FROM table_user', [], (_txn, res) => {
        console.log(res?.rows?.item);
        var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
          console.log(res.rows.item(i));
        }
        this.updateAllTransaction(temp);
      });
    });
  };

  @action
  updateSelectedExpense = (value: any) => {
    this.selectedExpense = value;
  };

  @action
  updateAllTransaction = (value: any) => {
    this.allTransaction = value;
  };

  @action
  updateType = (value: any) => {
    this.type = value;
  };

  @action
  updateCreateExpenseByKey = (key: string, value: string) => {
    const tempInfo = {...this.expenseInfo, [key]: value};
    this.updateCreateExpenseInfo(tempInfo);
  };

  @action
  updateCreateExpenseInfo = (value: any) => {
    this.expenseInfo = value;
  };

  async onSuccess(apiId: string, response: any) {
    switch (apiId) {
      default:
        break;
    }
  }

  onFailure(apiId: string, error: any) {
    switch (apiId) {
      default:
        break;
    }
  }
}
