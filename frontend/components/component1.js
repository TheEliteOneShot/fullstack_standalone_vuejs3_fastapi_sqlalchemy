import store from "../store.js";

export default {
  name: "One",

  setup() {
    function createToast() {
      this.$toast.success("It works");
    }

    return { store, createToast };
  },

  template: `
    <a href="javascript:void(0);" v-on:click="createToast()">Add Toast</a>
    `,
};
