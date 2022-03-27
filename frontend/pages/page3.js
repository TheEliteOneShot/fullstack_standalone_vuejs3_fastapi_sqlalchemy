export default {
  name: "3",
  setup() {
    const { onMounted, getCurrentInstance, ref } = Vue;

    const app = getCurrentInstance().appContext.config.globalProperties;
    let API_BASE_URL = app.getApiBaseUrl();
    let API_BULK_BASE_URL = API_BASE_URL + "bulk";

    const name = ref();
    const description = ref();

    async function createServerSideDatasource() {
      return {
        getRows: async function (params) {
          return await fetch(API_BASE_URL)
            .then(async (response) => {
              if (response.ok) {
                // TODO: Have a javascript Web Worker parse the JSON response
                params.success({ rowData: await response.json() });
              } else {
                params.fail();
              }
            })
            .catch((error) => {
              console.error(error);
            });
        },
      };
    }

    var gridOptionsAddData = {
      columnDefs: [
        { field: "name", minWidth: 220 },
        { field: "description", minWidth: 200 },
      ],

      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
      },
      animateRows: true,
      rowData: [],
      paginationAutoPageSize: true,
      pagination: true,
      rowSelection: "multiple",
    };

    var gridOptionsServer = {
      columnDefs: [
        { field: "name", minWidth: 220 },
        { field: "description", minWidth: 200 },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
      },
      rowSelection: null,
      rowModelType: "serverSide",
      serverSideStoreType: "full",
      animateRows: true,
    };

    async function addRow() {
      let newRow = {
        name: name.value,
        description: description.value,
      };
      gridOptionsAddData.api.applyTransaction({
        add: [newRow],
      });
    }

    async function bulkInsertData(items) {
      return fetch(API_BULK_BASE_URL, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      })
        .then((response) => response.ok)
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    async function bulkDeleteData() {
      return fetch(API_BULK_BASE_URL, {
        method: "DELETE",
      })
        .then((response) => response.ok)
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    async function onRemoveSelected() {
      const selectedData = gridOptionsAddData.api.getSelectedRows();
      const res = gridOptionsAddData.api.applyTransaction({
        remove: selectedData,
      });
    }

    async function onBulkInsert() {
      let data = [];
      gridOptionsAddData.api.forEachNode((node) => data.push(node.data));
      if (data.length <= 0) {
        app.$toast.warning("There are no items to insert.", {
          position: "top",
        });
        return;
      }
      await bulkInsertData(data).then(async (response) => {
        if (response) {
          await gridOptionsServer.api.refreshServerSideStore();
          app.$toast.success(
            `${data.length} items were inserted successfully.`,
            { position: "top" }
          );
        }
      });
    }

    async function onBulkDelete() {
      const currentRowCount = gridOptionsServer.api.getDisplayedRowCount();
      if (currentRowCount <= 0) {
        app.$toast.warning("There are no items to delete.", {
          position: "top",
        });
        return;
      }
      let data = [];
      gridOptionsAddData.api.forEachNode((node) => data.push(node.data));
      await bulkDeleteData().then(async (response) => {
        if (response) {
          await gridOptionsServer.api.refreshServerSideStore();
          app.$toast.info(
            `${data.length} were successfully deleted.`,
            { position: "top" }
          );
        }
      });
    }

    onMounted(async () => {
      const gridAddData = document.querySelector("#addRow");
      const gridDivServer = document.querySelector("#fullstack");
      // onMounted is called each time a user navigates away and back. Find a different way to handle preventing the table from being mounted multiple times.
      gridAddData.innerHTML = "";
      gridDivServer.innerHTML = "";

      new agGrid.Grid(gridAddData, gridOptionsAddData);
      new agGrid.Grid(gridDivServer, gridOptionsServer);

      var datasource = await createServerSideDatasource();

      gridOptionsServer.api.setServerSideDatasource(datasource);
    });

    return {
      addRow,
      name,
      description,
      onRemoveSelected,
      onBulkInsert,
      onBulkDelete,
    };
  },

  template: `
    <main class="border border-2 border-primary">
    <h3><mdb-badge color="info" class="p-3 m-5" pill>1. Add a name and description to the bulk insertion data table </mdb-badge></h3>
    <mdb-card class="w-50 border border-info">
    <mdb-card-body>
    <mdb-card-text>
    <mdb-row tag="form" class="g-3 needs-validation" validate @submit.prevent="addRow">
    <mdb-input
       label="Name"
       v-model="name"
       invalidFeedback=""
       required
       title="Must contain between 5 and 30 characters"
       minLength="1"
       maxLength="30"
       validationEvent="addRow"
       />
    <mdb-input
       label="Description"
       v-model="description"
       invalidFeedback=""
       required
       title="Must contain between 5 and 30 characters"
       minLength="1"
       maxLength="30"
       />
    <mdb-btn color="primary" type="submit">Add Data</mdb-btn >
    </mdb-row>
    </mdb-card-text>
  </mdb-card-body>
  </mdb-card>
  <h3><mdb-badge class="p-3 m-5" color="info" pill>2. This is the data that will be bulk inserted </mdb-badge></h3>
    <mdb-card>
       <mdb-card-body class="border border-dark">
          <mdb-card-text>
          <mdb-btn color="danger" type="submit" @click="onRemoveSelected">Remove Selected Rows</mdb-btn >
          </mdb-card-text>
       </mdb-card-body>
    </mdb-card>
    <div class="container">
        <div id="addRow" style="height: 400px; width:100%;" class="ag-theme-alpine"></div>           
    </div>
    <mdb-card-body class="border border-dark">
    <mdb-card-text>
    <mdb-btn color="success" type="submit" @click="onBulkInsert">Insert All Data</mdb-btn ><mdb-btn color="danger" type="submit" @click="onBulkDelete">Delete All Data</mdb-btn >
    </mdb-card-text>
    </mdb-card-body>
    <h3><mdb-badge class="p-3 m-5" color="info" pill>3. This is the current data inside the database </mdb-badge></h3>
    <mdb-card>
    </mdb-card>
    <div class="container">
        <div id="fullstack" style="height: 400px; width:100%;" class="ag-theme-alpine"></div>
    </div>
    </main>
    `,
};
