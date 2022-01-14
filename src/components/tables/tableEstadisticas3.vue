<template>
   <q-table flat  :rows="rows" :rows-per-page-options="[10]"
            hide-header
      hide-bottom  >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="campo" :props="props">
               <b>{{ props.row.campo }}:</b> 
                </q-td>
                <q-td key="value" :props="props">
                {{ props.row.value }}
                </q-td>
               
              </q-tr>
            </template>
          </q-table>
</template>

<script>
import {defineComponent} from 'vue'


const columns = [
  {name: 'campo', label: 'campo', field: 'campo', sortable: true, align: 'left'},
  {name: 'value', label: 'value', field: 'value', sortable: true, align: 'left'},
  
];
const rows = [
  {
    campo: 'Profit Factor',
    value: 1.23,
  },
  {
    campo: 'Standard Deviation',
    value: '$5413.83',
  },
  {
    campo: 'Sharpe Ratio',
    value: '0.00',
  },
  {
    campo: 'Z-Score (Probability):',
    value: '--30.43 (99.99%)',
  },
  {
    campo: 'Expectancy',
    value: '8.7 Pips / $56.74',
  },
  {
    campo: 'Avg. Trade Length',
    value: '2d',
  },
]

export default defineComponent({
  name: "TableActions",
setup() {
    return {
        rows, columns
    }
}

})
</script>

<style scoped>

</style>
