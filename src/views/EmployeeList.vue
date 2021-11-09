<template>
  <div class="employeeList">
    <div>従業員数:{{ employeeCount }}人</div>
    <div class="row">
      <table class="striped">
        <thead>
          <tr>
            <th>名前</th>
            <th>入社日</th>
            <th>扶養人数</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="employee of employees" v-bind:key="employee.id">
            <router-link :to="'/employeeDetail/' + employee.id">{{
              employee.name
            }}</router-link>
            <td>{{ employee.hireDate }}</td>
            <td>{{ employee.dependentsCount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Employee } from "@/types/employee";

@Component
export default class EmployeeList extends Vue {
  /**
   * Vuexストアのアクション経由で⾮同期でWebAPIから従業員⼀覧を取得する.
   *
   */
  created() {
    this["$store"].dispatch("getEmployeeList");
  }

  /**
   * ⾮同期で取得したVuexストア内の従業員数を取得し返す.
   *
   * @returns - 従業員数
   */
  get employeeCount() {
    return this["$store"].getters.getEmployeeCount;
  }

  /**
   * ⾮同期で取得したVuexストア内の従業員⼀覧を取得し返す.
   *
   * @returns - 従業員一覧
   */
  get employees() {
    return this["$store"].getters.getEmployees;
  }
}
</script>

<style></style>
