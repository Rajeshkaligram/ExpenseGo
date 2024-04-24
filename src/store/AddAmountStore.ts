import {action, makeObservable, observable} from 'mobx';
import {I_EXPENSES, I_TYPE} from '../common/constant';

const DEFAULT_SETTINGS = {
  selectedExpense: I_EXPENSES[0],
  expenseInfo: {},
  type: I_TYPE[0],
  allTransaction: [],
};

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

  // getGroupPeople = async leadGroupId => {
  //   this.updateFetchingListStatus(true);
  //   const registerUserRequest = new BaseRequest(this, {
  //     methodType: 'POST',
  //     apiEndPoint: API_END_POINTS.GET_GROP_LEAD_LOGS,
  //     apiId: API_IDS.GET_GROP_LEAD_LOGS,
  //     prefetch: false,
  //     reqParams: {
  //       filters: {
  //         leadGroupId,
  //         isRemoved: false,
  //       },
  //       status: 'all',
  //       page: 1,
  //       limit: 50000,
  //     },
  //   });
  //   await registerUserRequest.setRequestHeaders();
  //   await registerUserRequest.hitPostApi();
  // };

  async onSuccess(apiId: string, response: any) {
    switch (apiId) {
      // case API_IDS.GET_LEAD_GROUP:
      //   const group = get(response, 'result.data', []);
      //   const totalPagesStaff = get(response, 'result.totalPages', 0);
      //   this.setTotalCount(totalPagesStaff);
      //   this.updateDealList(group);
      //   this.updateRefreshingStatus(false);
      //   this.updateFetchingListStatus(false);
      //   break;
      // case API_IDS.GET_GROP_LEAD_LOGS:
      //   const logs = get(response, 'result.data', []);
      //   this.updateAllLogs(logs);
      //   this.updateFetchingListStatus(false);
      //   break;
      default:
        break;
    }
  }

  onFailure(apiId: string, error: any) {
    // const responseData = get(error, 'data', {});
    switch (apiId) {
      // case API_IDS.GET_LEAD_GROUP:
      //   this.updateRefreshingStatus(false);
      //   this.updateFetchingListStatus(false);
      //   break;
      // case API_IDS.GET_GROP_LEAD_LOGS:
      //   this.updateFetchingListStatus(false);
      //   break;
      default:
        break;
    }
  }
}
