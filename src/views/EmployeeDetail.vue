<template>
  <div class="employeeDetail">
    <div class="row">
      <form action="employeeList.html">
        <fieldset>
          <legend>従業員情報</legend>
          <table>
            <tr>
              <th nowrap>従業員名</th>
              <td>
                <span>{{ currentEmployee.name }}</span>
              </td>
            </tr>
            <tr>
              <th nowrap>写真</th>
              <td>
                <img :src="currentEmployeeImage" />
              </td>
            </tr>
            <tr>
              <th nowrap>性別</th>
              <td>
                <span>{{ currentEmployee.gender }}</span>
              </td>
            </tr>
            <tr>
              <th nowrap>入社日</th>
              <td>
                <span>{{ currentEmployee.hireDate }}</span>
              </td>
            </tr>
            <tr>
              <th nowrap>メールアドレス</th>
              <td>
                <span>{{ currentEmployee.mailAddress }}</span>
              </td>
            </tr>
            <tr>
              <th nowrap>郵便番号</th>
              <td>
                <span>{{ currentEmployee.zipCode }}</span>
              </td>
            </tr>
            <tr>
              <th nowrap>住所</th>
              <td>
                <span>{{ currentEmployee.address }}</span>
              </td>
            </tr>
            <tr>
              <th nowrap>電話番号</th>
              <td>
                <span>{{ currentEmployee.telephone }}</span>
              </td>
            </tr>
            <tr>
              <th nowrap>給料</th>
              <td>
                <span>{{ currentEmployee.salary }}</span>
              </td>
            </tr>
            <tr>
              <th nowrap>特性</th>
              <td>
                <span>{{ currentEmployee.characteristics }}</span>
              </td>
            </tr>
            <tr>
              <th nowrap>扶養人数</th>
              <td>
                <div class="input-field col s12">
                  <div class="error">{{ errorMessage }}</div>
                  <input
                    id="dependentsCount"
                    type="text"
                    class="validate"
                    value="3"
                    required
                  />
                  <label for="dependentsCount2">扶養人数</label>
                </div>
              </td>
            </tr>
          </table>

          <button class="btn btn-register waves-effect waves-light">
            更新
          </button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Employee } from "@/types/employee";
import axios from "axios";

@Component
export default class EmployeeDetail extends Vue {
  //大正の従業員オブジェクト
  private currentEmployee!: Employee;
  //エラーメッセージ
  private errorMessage!: string;
  //対象の従業員のimageパス
  private currentEmployeeImage!: string;
  //対象の従業員の扶養⼈数
  private currentDependentsCount!: number;

  /**
   * VuexストアのGetter経由で受け取ったリクエストパラメータのIDから１件の従業員情報を取得する.
   */
  created() {
    const employeeId = parseInt(this["$route"].params.id);
    this.currentEmployee = this["$store"].getters.getEmployeeById(employeeId);
    this.currentEmployeeImage = `http://34.214.207.222:8080/ex-emp-api/img/${this.currentEmployee.image}`;

    console.dir(
      "curentEmployeeImage:" + JSON.stringify(this.currentEmployeeImage)
    );

    this.currentDependentsCount = this.currentEmployee.dependentsCount;
  }
}
</script>

<style></style>
