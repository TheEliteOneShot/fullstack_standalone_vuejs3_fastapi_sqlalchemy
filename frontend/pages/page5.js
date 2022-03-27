import DataTable1 from "../components/DataTable1.js";
import DataTable2 from "../components/DataTable2.js";
import DataTable3 from "../components/DataTable3.js";

export default {
  name: "Page5",
  components: { DataTable1, DataTable2, DataTable3 },

  setup() {},

  template: `
<main>
   <mdb-card>
      <mdb-card-title>AG Grid Enterprise Unlocked Examples -- Full Documentation: www.ag-grid.com/javascript-data-grid</mdb-card-title>
   </mdb-card>
   <mdb-card>
      <mdb-card-body>
         <mdb-card-title>Example 1</mdb-card-title>
         <mdb-card-text>
            Display cool graphics
         </mdb-card-text>
      </mdb-card-body>
   </mdb-card>
   <DataTable2></DataTable2>
   <mdb-card>
      <mdb-card-body>
         <mdb-card-title>Example 2</mdb-card-title>
         <mdb-card-text>
            Pagination and categories
         </mdb-card-text>
      </mdb-card-body>
   </mdb-card>
   <DataTable1></DataTable1>
   <mdb-card>
      <mdb-card-body>
         <mdb-card-title>Example 3</mdb-card-title>
         <mdb-card-text>
            Filtering
         </mdb-card-text>
      </mdb-card-body>
   </mdb-card>
   <DataTable3></DataTable3>
</main>
    `,
};
