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
    campo: 'Trades',
    value: 2580,
  },
  {
    campo: 'Pips',
    value: 22417.7,
  },
  {
    campo: 'Average Win',
    value: '11.40 pips / $306.05',
  },
  {
    campo: 'Average Loss',
    value: '-238.51 pips / -$22665.52',
  },
  {
    campo: 'Longs Won',
    value: '(1243/1259) 98%',
  },
  {
    campo: 'Shorts Won',
    value: '(1309/1321) 99%',
  },
   {
    campo: 'Best Trade (Pips)',
    value: '(Jan 07) 215.2',
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
