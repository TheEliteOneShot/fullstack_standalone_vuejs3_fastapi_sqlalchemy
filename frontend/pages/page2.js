import component2 from "../components/component2.js";
import functions from "../functions.js";

export default {
  name: "Page2",
  components: { component2 },

  setup() {
    const title = "Page Two";

    function showSuccessToast() {
      this.$toast.success("The operation was successful.");
    }

    function showInfoToast() {
      this.$toast.info("Here is the information.");
    }

    function showErrorToast() {
      this.$toast.error("There was an error.");
    }

    //get url parameter 'msg' (for example: /page2?msg=something)
    const msg = functions.getUrlParam("msg");

    return { title, showSuccessToast, showInfoToast, showErrorToast };
  },

  template: `
    <mdb-card>
        <mdb-card-body>
        <mdb-card-title>Toast Examples -- Full Documentation: www.github.com/ankurk91/vue-toast-notification</mdb-card-title>
        <mdb-card-text>
        <mdb-btn
            color="success"
            v-on:click="showSuccessToast()"
            class="mb-2"
        >
        Show Success
        </mdb-btn>
        <mdb-btn
            color="info"
            v-on:click="showInfoToast()"
            class="mb-2"
        >
        Show Info
        </mdb-btn>
        <mdb-btn
            color="danger"
            v-on:click="showErrorToast()"
            class="mb-2"
        >
        Show Error
        </mdb-btn>
        </mdb-card-text>
        </mdb-card-body>
    </mdb-card>
    `,
};
