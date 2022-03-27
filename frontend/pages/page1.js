import component1 from "../components/component1.js";

export default {
  name: "Page1",
  components: { component1 },

  setup() {
    const { ref } = Vue;
    const checkForm = (e) => {
      e.target.classList.add("was-validated");
    };

    const input11 = ref("Mark");
    const input12 = ref("Otto");
    const input13 = ref("");
    const input14 = ref("");
    const input15 = ref("");
    const checkbox3 = ref(false);
    const exampleModal = ref(false);
    const exampleSideModal1 = ref(false);
    return {
      checkForm,
      input11,
      input12,
      input13,
      input14,
      input15,
      checkbox3,
      exampleModal,
      exampleSideModal1,
    };
  },

  template: `
<main>
   <mdb-card>
      <mdb-card-body>
         <mdb-card-title>Material Design Vue Examples -- Full Documentation: www.mdbootstrap.com/docs/b5/vue </mdb-card-title>
      </mdb-card-body>
   </mdb-card>
   <mdb-card>
      <mdb-card-body>
         <mdb-card-title>Example Card title</mdb-card-title>
         <mdb-card-text>
            Some quick example text to build on the card title and make up the bulk of the
            card's content.
         </mdb-card-text>
         <mdb-button tag="a" href="#!" color="primary">Button</mdb-button>
      </mdb-card-body>
   </mdb-card>
   <mdb-card>
      <mdb-card-body>
         <mdb-card-title>Spinner</mdb-card-title>
         <mdb-card-text>
            <mdb-spinner style="width: 3rem; height: 3rem"  />
            <mdb-spinner grow style="width: 3rem; height: 3rem" />
         </mdb-card-text>
      </mdb-card-body>
   </mdb-card>
   <mdb-card>
      <mdb-card-body>
         <mdb-card-title>Navbar</mdb-card-title>
         <mdb-card-text>
            <mdb-navbar expand="lg" light bg="white" container>
               <mdb-navbar-toggler target="#navbarExample01"></mdb-navbar-toggler>
               <mdb-navbar-nav collapse="navbarExample01" class="mb-2 mb-lg-0">
                  <mdb-navbar-item to="#" active>
                     Home
                  </mdb-navbar-item>
                  <mdb-navbar-item to="#">
                     Features
                  </mdb-navbar-item>
                  <mdb-navbar-item to="#">
                     Pricing
                  </mdb-navbar-item>
                  <mdb-navbar-item to="#">
                     About
                  </mdb-navbar-item>
               </mdb-navbar-nav>
            </mdb-navbar>
         </mdb-card-text>
      </mdb-card-body>
   </mdb-card>
   <mdb-card>
      <mdb-card-body>
         <mdb-card-title>Forms</mdb-card-title>
         <mdb-card-text>
            <mdb-row tag="form" class="g-3">
               <mdb-col md="4">
                  <mdb-input
                     label="First name"
                     v-model="input11"
                     invalidFeedback=""
                     validFeedback=""
                     isValid
                     isValidated
                     required
                     />
               </mdb-col>
               <mdb-col md="4">
                  <mdb-input
                     label="Last name"
                     v-model="input12"
                     invalidFeedback=""
                     validFeedback=""
                     isValid
                     isValidated
                     required
                     />
               </mdb-col>
               <mdb-col md="4">
                  <mdb-input
                     inputGroup
                     aria-describedby="basic-addon3"
                     aria-label="Username"
                     placeholder="Username"
                     v-model="input13"
                     invalidFeedback="Please choose a unique and valid username."
                     validFeedback=""
                     :isValid="false"
                     isValidated
                     required
                     >
                     <template v-slot:prepend>
                        <span class="input-group-text" id="basic-addon3">@</span>
                     </template>
                  </mdb-input>
               </mdb-col>
               <mdb-col md="6">
                  <mdb-input
                     label="City"
                     v-model="input14"
                     invalidFeedback=""
                     validFeedback="Looks good!"
                     :isValid="false"
                     isValidated
                     required
                     />
               </mdb-col>
               <mdb-col md="6">
                  <mdb-input
                     label="Zip"
                     v-model="input15"
                     invalidFeedback=""
                     validFeedback="Looks good!"
                     :isValid="false"
                     isValidated
                     required
                     />
               </mdb-col>
               <mdb-col col="12">
                  <mdb-checkbox
                     label="Agree to terms and conditions"
                     v-model="checkbox3"
                     invalidFeedback=""
                     validFeedback="Looks good!"
                     :isValid="false"
                     isValidated
                     required
                     />
               </mdb-col>
               <mdb-col col="12">
                  <mdb-btn color="primary" type="submit">Submit form</mdb-btn>
               </mdb-col>
            </mdb-row>
         </mdb-card-text>
      </mdb-card-body>
      <mdb-card-body>
         <mdb-card-text>
            <mdb-row tag="form" class="g-3 needs-validation" novalidate @submit.prevent="checkForm">
               <mdb-col md="6">
                  <mdb-input
                     label="First name"
                     v-model="eventInput1"
                     invalidFeedback=""
                     validFeedback="Looks good!"
                     validationEvent="input"
                     required
                     title="Must contain between 5 and 30 characters"
                     minLength="5"
                     maxLength="30"
                     />
               </mdb-col>
               <mdb-col md="6">
                  <mdb-input
                     label="Last name"
                     v-model="eventInput2"
                     invalidFeedback=""
                     validFeedback="Looks good!"
                     validationEvent="input"
                     required
                     title="Must contain between 5 and 30 characters"
                     minLength="5"
                     maxLength="30"
                     />
               </mdb-col>
               <mdb-col md="4">
                  <mdb-input
                     inputGroup
                     aria-describedby="basic-addon1"
                     aria-label="Username"
                     placeholder="Username"
                     v-model="eventInput3"
                     invalidFeedback="Please choose a unique and valid username."
                     validFeedback="Looks good!"
                     validationEvent="input"
                     required
                     pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                     title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                     >
                     <template v-slot:prepend>
                        <span class="input-group-text" id="basic-addon5">@</span>
                     </template>
                  </mdb-input>
               </mdb-col>
               <mdb-col md="6">
                  <mdb-input
                     label="City"
                     v-model="eventInput4"
                     invalidFeedback="."
                     validFeedback="Looks good!"
                     validationEvent="input"
                     required
                     />
               </mdb-col>
               <mdb-col md="6">
                  <mdb-input
                     label="Zip"
                     v-model="eventInput5"
                     invalidFeedback=""
                     validFeedback="Looks good!"
                     validationEvent="input"
                     required
                     pattern="^[0-9]{5}(?:-[0-9]{4})?$"
                     title="Should match 12345 and 12345-6789 patterns"
                     />
               </mdb-col>
               <mdb-col col="12">
                  <mdb-checkbox
                     label="Agree to terms and conditions"
                     v-model="eventCheckbox1"
                     invalidFeedback=""
                     validFeedback="Looks good!"
                     validateOnChange
                     required
                     />
               </mdb-col>
               <mdb-col col="12">
                  <mdb-btn color="primary" type="submit">Submit form</mdb-btn >
               </mdb-col>
            </mdb-row>
         </mdb-card-text>
      </mdb-card-body>
   </mdb-card>
   <mdb-card>
      <mdb-card-body>
         <mdb-card-title>Example Modals</mdb-card-title>
         <mdb-card-text>
            <!-- Button trigger modal -->
            <mdb-btn
               color="primary"
               aria-controls="exampleModal"
               @click="exampleModal=true"
               >
               Launch simple modal
            </mdb-btn>
            <mdb-modal
               id="exampleModal"
               tabindex="-1"
               labelledby="exampleModalLabel"
               v-model="exampleModal"
               >
               <mdb-modal-header>
                  <mdb-modal-title id="exampleModalLabel"> Modal title </mdb-modal-title>
               </mdb-modal-header>
               <mdb-modal-body>...</mdb-modal-body>
               <mdb-modal-footer>
                  <mdb-btn color="secondary" @click="exampleModal = false">Close</mdb-btn>
                  <mdb-btn color="primary">Save changes</mdb-btn>
               </mdb-modal-footer>
            </mdb-modal>
         </mdb-card-text>
      </mdb-card-body>
      <mdb-card-body>
         <mdb-card-text>
            <mdb-btn
               color="primary"
               aria-controls="exampleSideModal1"
               @click="exampleSideModal1 = true"
               class="mb-2"
               >
               Shopping Card Modal
            </mdb-btn>
            <!-- Might require more features -->
            <mdb-modal
               side
               position="bottom-right"
               direction="right"
               id="exampleSideModal1"
               tabindex="-1"
               labelledby="exampleSideModalLabel1"
               v-model="exampleSideModal1"
               >
               <mdb-modal-header color="info" class="text-white">
                  <mdb-modal-title id="exampleSideModalLabel1"> Product in the cart </mdb-modal-title>
               </mdb-modal-header>
               <mdb-modal-body>
                  <mdb-row>
                     <mdb-col col="3" class="text-center">
                        <i class="fas fa-shopping-cart fa-4x text-info"></i>
                     </mdb-col>
                     <mdb-col col="9">
                        <p>Do you need more time to make a purchase decision?</p>
                        <p>No pressure, your product will be waiting for you in the cart.</p>
                     </mdb-col>
                  </mdb-row>
               </mdb-modal-body>
               <mdb-modal-footer>
                  <mdb-btn color="info"> Go to the cart </mdb-btn>
                  <mdb-btn color="outline-info" @click="exampleSideModal1 = false"> Close </mdb-btn>
               </mdb-modal-footer>
            </mdb-modal>
         </mdb-card-text>
      </mdb-card-body>
   </mdb-card>
</main>
    `,
};
