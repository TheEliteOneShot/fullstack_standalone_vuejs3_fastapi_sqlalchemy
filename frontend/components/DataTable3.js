import mockData from "../mock/data/datatable3.js";

export default {
  name: "DataTable3",
  setup() {
    const { onMounted } = Vue;

    function onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    }

    let gridOptions = {
      columnDefs: [
        {
          field: "athlete",
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              { filter: "agTextColumnFilter", display: "subMenu" },
              { filter: "agSetColumnFilter" },
            ],
          },
        },
        {
          field: "country",
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              {
                filter: "agTextColumnFilter",
                display: "accordion",
                title: "Expand Me for Text Filters",
              },
              { filter: "agSetColumnFilter", display: "accordion" },
            ],
          },
        },
        { field: "sport", filter: "agMultiColumnFilter" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 200,
        resizable: true,
        menuTabs: ["filterMenuTab"],
      },
      sideBar: {
        toolPanels: [
          {
            id: "filters",
            labelDefault: "Filters",
            labelKey: "filters",
            iconKey: "filter",
            toolPanel: "agFiltersToolPanel",
          },
        ],
      },
      onGridReady: onGridReady,
    };

    onMounted(() => {
      const gridDiv = document.querySelector("#myGrid3");
      // Find a different way to prevent it from mounting multiple times when user navigates away and then back
      gridDiv.innerHTML = "";
      new agGrid.Grid(gridDiv, gridOptions);
      // fetch to server instead of Mock data
      gridOptions.api.setRowData(mockData);
    });
  },

  template: `
    <div class="container">
    <div id="myGrid3" style="height: 800px; width:100%;" class="ag-theme-alpine"></div>
    </div>
    `,
};
