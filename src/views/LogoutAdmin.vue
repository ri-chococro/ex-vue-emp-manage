<template>
  <div>dubby</div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LogoutAdmin extends Vue {
  /**
   * ログアウトをする.
   */
  async created(): Promise<void> {
    const response = await axios.get(
      "http://34.214.207.222:8080/ex-emp-api/logout"
    );
    if (response.data.status === "success") {
      this["$router"].push("/loginAdmin");
    }
  }
}
</script>

<style></style>
