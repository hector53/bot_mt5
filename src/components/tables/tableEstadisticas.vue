<template>
   <q-table flat  :rows="rows" :rows-per-page-options="[10]"
            hide-header
      hide-bottom  >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="campo" :props="props">
               <b>{{ props.row.campo }}:</b> 
                </q-td>
                <q-td key="value" :props="props" :class="'text-right'">
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
  {name: 'value', label: 'value', field: 'value', sortable: true, align: 'right'},
];
const rows = [
  {
    campo: 'Gain',
    value: '+14.14%',
  },
  {
    campo: 'Abs Gain',
    value: '+8.47%',
  },
  {
    campo: 'Daily',
    value: '0.03%',
  },
  {
    campo: 'Monthly',
    value: '0.89%',
  },
  {
    campo: 'Drawdown:',
    value: '39.62%',
  },
  {
    campo: 'Deposits:',
    value: '$1,735,174.00',
  },
  {
    campo: 'Withdrawals:',
    value: '$797,531.16',
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
