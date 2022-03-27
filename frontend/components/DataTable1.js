import mockData from "../mock/data/datatable.js";

export default {
  name: "DataTable",
  props: {
    gridOptions: Object,
    onMounted: Function,
    data: Array,
  },
  setup() {
    const { onMounted } = Vue;

    function onFirstDataRendered(params) {
      // arbitrarily expand a row for presentational purposes
      setTimeout(function () {
        params.api.getDisplayedRowAtIndex(1).setExpanded(true);
      }, 0);
    }

    const gridOptions = {
      columnDefs: [
        // group cell renderer needed for expand / collapse icons
        { field: "name", cellRenderer: "agGroupCellRenderer" },
        { field: "account" },
        { field: "calls" },
        { field: "minutes", valueFormatter: "x.toLocaleString() + 'm'" },
      ],
      defaultColDef: {
        flex: 1,
      },
      masterDetail: true,
      pagination: true,
      detailCellRendererParams: {
        detailGridOptions: {
          rowSelection: "multiple",
          suppressRowClickSelection: true,
          enableRangeSelection: true,
          pagination: true,
          paginationAutoPageSize: true,
          columnDefs: [
            { field: "callId", checkboxSelection: true },
            { field: "direction" },
            { field: "number", minWidth: 150 },
            { field: "duration", valueFormatter: "x.toLocaleString() + 's'" },
            { field: "switchCode", minWidth: 150 },
          ],
          defaultColDef: {
            sortable: true,
            flex: 1,
          },
        },
        getDetailRowData: function (params) {
          params.successCallback(params.data.callRecords);
        },
      },
      onFirstDataRendered: onFirstDataRendered,
    };

    onMounted(() => {
      const gridDiv = document.querySelector("#myGrid");
      // Find a different way to prevent it from mounting multiple times when user navigates away and then back
      gridDiv.innerHTML = "";
      new agGrid.Grid(gridDiv, gridOptions);
      // fetch to server instead of Mock data
      gridOptions.api.setRowData(mockData);
    });
  },

  template: `
    <div class="container">
    <div id="myGrid" style="height: 800px; width:100%;" class="ag-theme-alpine"></div>
    </div>
    `,
};
