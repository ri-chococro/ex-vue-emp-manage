<template>
  <div class="employeeList"></div>
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
