import Vue from "vue";
import Vuex from "vuex";
import { Employee } from "../types/employee";

import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    //従業員数
    totalEmployeeCount: 0,
    //従業員一覧
    employees: new Array<Employee>(),
  }, // end state
  actions: {
    /**
     * 従業員⼀覧情報をWebAPIから取得してmutationを呼び出す.
     *
     * @param context - commitメソッドを呼ぶための引数
     */
    async getEmployeeList(context) {
      const response = await axios.get(
        "http://54.202.162.233:8080/ex-emp-api/employee/employees"
      );
      console.log("response:" + JSON.stringify(response));
      const payload = response.data;
      context.commit("showEmployeeList", payload);
    },
  }, // end actions
  mutations: {
    /**
     * 従業員⼀覧情報をWebAPIから取得してmutationを呼び出す.
     *
     * @param state - stateを利用するための引数
     * @param payload - getEmployeeListメソッドで外部APIより受け取ったデータを渡される引数(Json形式の従業員数と従業員一覧)
     */
    showEmployeeList(state, payload) {
      console.log("totalEmployeeCount:" + payload.totalEmployeeCount);
      state.totalEmployeeCount = payload.totalEmployeeCount;
      for (const employee of payload.employees) {
        state.employees.push(
          new Employee(
            employee.id,
            employee.name,
            employee.image,
            employee.gender,
            employee.hireDate,
            employee.mailAddress,
            employee.zipCode,
            employee.address,
            employee.telephone,
            employee.salary,
            employee.characteristics,
            employee.dependentsCount
          )
        );
      }
      console.log("employees:" + state.employees);
    },
  }, // end mutations
  getters: {
    /**
     * 従業員数を返す.
     *
     * @param state - stateを利用するための引数
     * @returns - ・state内の従業員⼀覧の件数を返す
     */
    getEmployeeCount(state) {
      return state.totalEmployeeCount;
    },

    /**
     * 従業員⼀覧を返す.
     *
     * @param state - stateを利用するための引数
     * @returns - state内の従業員⼀覧を返す
     */
    getEmployees(state) {
      return state.employees;
    },

    /**
     * IDから従業員を検索し返す.
     *
     * @param state - stateを利用するための引数
     * @returns 渡されたIDで絞り込んだ従業員情報を1件返す
     */
    getEmployeeById(state) {
      return (id: number) => {
        return state.employees.filter((employee) => employee.id == id)[0];
      };
    },
  }, // end getters
  modules: {}, // end modules
});
