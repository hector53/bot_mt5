<template>
  <q-card flat >
        <q-card-section class="row">
          <div class="text-h6 text-weight-bolder text-grey-8">
          Historial de Trade
          </div>
         
        </q-card-section>
       
        <q-list >
          <q-table flat  :rows="rowsHistory" :rows-per-page-options="[20]"
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
                <q-td key="price" :props="props">
                {{ props.row.price }}
                </q-td>
                 <q-td key="sl" :props="props">
                {{ props.row.sl }}
                </q-td>
                 <q-td key="tp" :props="props">
                {{ props.row.tp }}
                </q-td>
                 <q-td key="timeClose" :props="props">
                {{ props.row.timeClose }}
                </q-td>
                 <q-td key="priceClose" :props="props">
                {{ props.row.priceClose }}
                </q-td>
                 <q-td key="commision" :props="props">
                {{ props.row.commision }}
                </q-td>
                 <q-td key="swap" :props="props">
                {{ props.row.swap }}
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
        </q-list>
      </q-card>
</template>

<script>
import {defineComponent} from 'vue'


export default ({
  name: "TableActions",
  props:["rowsHistory"],
 
  data() {
    return {
      rows: [],
      columns: [
  {name: 'time', label: 'Time', field: 'time', sortable: true, align: 'left'},
  {name: 'symbol', label: 'Symbol', field: 'symbol', sortable: true, align: 'left'},
  {name: 'type', label: 'Type', field: 'type', sortable: true, align: 'left'},
  {name: 'volume', label: 'Volume ', field: 'volume', sortable: false, align: 'center'},
  {name: 'price', label: 'Price ', field: 'price_open', sortable: false, align: 'center'},
  {name: 'sl', label: 'SL ', field: 'sl', sortable: false, align: 'center'},
  {name: 'tp', label: 'TP ', field: 'tp', sortable: false, align: 'center'},
  {name: 'timeClose', label: 'Time_close ', field: 'timeClose', sortable: false, align: 'center'},
  {name: 'priceClose', label: 'Price Close ', field: 'priceClose', sortable: false, align: 'center'},
  {name: 'commision', label: 'Comision ', field: 'commision', sortable: true, align: 'center'},
  {name: 'swap', label: 'Swap ', field: 'swap', sortable: true, align: 'center'},
  {name: 'profit', label: 'Profit ', field: 'profit', sortable: true, align: 'center'}
]
    }
  },
 
})
</script>

