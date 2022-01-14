<template>
   <q-table flat  :rows="posiciones" :rows-per-page-options="[10]"
           :columns="columns" row-key="time"   >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="time" :props="props">
                {{ props.row.time }}
                </q-td>
                <q-td key="symbol" :props="props">
                {{ props.row.symbol }}
                </q-td>
                <q-td key="type" :props="props">
                {{ props.row.type }}
                </q-td>
                <q-td key="volume" :props="props">
                {{ props.row.volume }}
                </q-td>
                <q-td key="price_open" :props="props">
                {{ props.row.price_open }}
                </q-td>
                 <q-td key="sl" :props="props">
                {{ props.row.sl }}
                </q-td>
                 <q-td key="tp" :props="props">
                {{ props.row.tp }}
                </q-td>
                 <q-td key="price_close" :props="props">
                {{ props.row.price_close }}
                </q-td>
                <q-td key="profit" :props="props">
                <q-badge color="red" v-if="props.row.profit < 0">
                  {{ props.row.profit }}
                </q-badge>
                <q-badge color="green" v-else>
                  {{ props.row.profit }}
                </q-badge>

                </q-td>
              </q-tr>
            </template>
          </q-table>
</template>

<script>
import {defineComponent} from 'vue'





export default defineComponent({
  name: "TableActions",
  props:["arrayPositions"],
   mounted() {
     console.log("asdasdsadasd", this.arrayPositions)
    let myTarget = JSON.parse(JSON.stringify(this.arrayPositions))
    console.log(myTarget)
    this.posiciones = myTarget
  },
  data() {
    return {
      posiciones: [],
         columns: [
  {name: 'time', label: 'Time', field: 'time', sortable: true, align: 'left'},
  {name: 'symbol', label: 'Symbol', field: 'symbol', sortable: true, align: 'left'},
  {name: 'type', label: 'Type', field: 'type', sortable: true, align: 'left'},
  {name: 'volume', label: 'Volume ', field: 'volume', sortable: false, align: 'center'},
  {name: 'price_open', label: 'Price ', field: 'price_open', sortable: false, align: 'center'},
  {name: 'sl', label: 'SL ', field: 'sl', sortable: false, align: 'center'},
  {name: 'tp', label: 'TP ', field: 'tp', sortable: false, align: 'center'},
  {name: 'price_close', label: 'Price Close ', field: 'price_close', sortable: false, align: 'center'},
  {name: 'profit', label: 'Profit ', field: 'profit', sortable: true, align: 'center'}
]
    }
  },

})
</script>

<style scoped>

</style>
