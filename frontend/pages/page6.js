export default {
  name: "Page6",

  setup() {
    const { getCurrentInstance } = Vue;
    const app = getCurrentInstance().appContext.config.globalProperties;
    function goToApiDocs() {
        window.open(app.getApiBaseDocsUrl())
    }

    return { goToApiDocs };
  },

  template: `
    <main>
    <div class="px-4 py-5 my-5 text-center">
        <h1 class="display-5 fw-bold">Backend API Documentation</h1>
        <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">Use the API docs to manually test the data flow into the backend server</p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <mdb-btn color="white" @click="goToApiDocs" class="btn btn-outline-secondary btn-lg px-4">Open API Docs</mdb-btn>
        </div>
        </div>
    </div>
    </main>
    `,
};
