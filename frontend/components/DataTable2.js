import mockData from "../mock/data/datatable2.js";

export default {
  name: "DataTable2",
  setup() {
    const { onMounted } = Vue;

    function onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    }

    let gridOptions = {
      columnDefs: [
        { field: "symbol", maxWidth: 110 },
        { field: "name", minWidth: 250 },
        {
          field: "rateOfChange",
          cellRenderer: "agSparklineCellRenderer",
          cellRendererParams: {
            sparklineOptions: {
              type: "column",
              xKey: "xVal",
              yKey: "yVal",
              axis: { type: "number" },
            },
          },
        },
        { field: "volume", type: "numericColumn", maxWidth: 140 },
      ],

      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
      },
      rowData: null,
      rowHeight: null,
      onGridReady: onGridReady,
    };

    onMounted(() => {
      const gridDiv = document.querySelector("#myGrid2");
      // Find a different way to prevent it from mounting multiple times when user navigates away and then back
      gridDiv.innerHTML = "";
      new agGrid.Grid(gridDiv, gridOptions);
      // fetch to server instead of Mock data
      gridOptions.api.setRowData(mockData);
    });
  },

  template: `
    <div class="container">
    <div id="myGrid2" style="height: 800px; width:100%;" class="ag-theme-alpine"></div>
    </div>
    `,
};
