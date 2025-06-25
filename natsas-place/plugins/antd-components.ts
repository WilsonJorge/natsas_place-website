import { defineNuxtPlugin } from "#app";
import { Rate, Button, Modal, Pagination, Input, Spin } from "ant-design-vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Rate);
  nuxtApp.vueApp.use(Button);
  nuxtApp.vueApp.use(Modal);
  nuxtApp.vueApp.use(Pagination);
  nuxtApp.vueApp.use(Input);
  nuxtApp.vueApp.use(Spin);
});
