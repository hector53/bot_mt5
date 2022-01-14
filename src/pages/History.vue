<template>
       <q-card flat >
        <q-card-section class="row">
          <div class="text-h6 text-weight-bolder text-grey-8">
          Historial de Trade
          </div>
           <q-space></q-space>
            <div class="text-h5 text-weight-bolder text-grey-8">
            Total:  <q-badge class="badgeTotalProfit" color="red" v-if="totalprofit < 0">
                  {{ totalprofit }}
                </q-badge>
                <q-badge class="badgeTotalProfit" color="green" v-else>
                  {{ totalprofit }}
                </q-badge>
           </div>
        </q-card-section>
         <q-card-section class="row">
         <div class="text-h7 text-weight-bolder text-grey-8" style="width: 100%">
         Total Won: <q-badge class="badgeTotalProfit" style="    padding: 5px;" color="green">       {{ totalWon }}   </q-badge>
        </div>
        <div class="text-h7 text-weight-bolder text-grey-8" style="width: 100%">
         Total Losses: <q-badge class="badgeTotalProfit"  style="    padding: 5px;" color="red">       {{ totalLosses }}   </q-badge>
        </div>
      </q-card-section>
        <q-list >
          <q-table flat  :rows="rows" :rows-per-page-options="[10]"
           :columns="columns"  v-if="mostrarTabla" row-key="time"   >
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
                 <q-td key="time_close" :props="props">
                {{ props.row.time_close }}
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
        </q-list>
      </q-card>
</template>

<script>
import { Cookies } from 'quasar'
import {defineComponent,defineAsyncComponent} from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import {ref} from 'vue'
import { onMounted } from 'vue'
import { Loading } from "quasar";


const columns = [
  {name: 'time', label: 'Time', field: 'time', sortable: true, align: 'left'},
  {name: 'symbol', label: 'Symbol', field: 'symbol', sortable: true, align: 'left'},
  {name: 'type', label: 'Type', field: 'type', sortable: true, align: 'left'},
  {name: 'volume', label: 'Volume ', field: 'volume', sortable: false, align: 'center'},
  {name: 'price_open', label: 'Price ', field: 'price_open', sortable: false, align: 'center'},
  {name: 'sl', label: 'SL ', field: 'sl', sortable: false, align: 'center'},
  {name: 'tp', label: 'TP ', field: 'tp', sortable: false, align: 'center'},
  {name: 'time_close', label: 'Time_close ', field: 'time_close', sortable: false, align: 'center'},
  {name: 'price_close', label: 'Price Close ', field: 'price_close', sortable: false, align: 'center'},
  {name: 'profit', label: 'Profit ', field: 'profit', sortable: true, align: 'center'}
];

export default defineComponent({
    name: 'PageHistory',
      components: {
    tableHistoryTrade: defineAsyncComponent(() => import('components/tables/tableHistoryTrade')),
  },
    setup () {
      Loading.show();
        const token = Cookies.get('authToken')
  const $q = useQuasar()
const rows = ref(null)
const totalWon = ref(null)
const totalLosses = ref(null)
const totalprofit = ref(null)
const mostrarTabla = ref(false)
  function loadData () {
    api.get('get_history_trade', {
        headers: {
          'Authorization': `Bearer ${token.token}`
        }
    })
      .then((response) => {
          console.log("response", response)
        rows.value = response.data.history
        totalWon.value = response.data.totalWon
        totalLosses.value = response.data.totalLosses
        totalprofit.value = response.data.totalprofit
        mostrarTabla.value = true
        Loading.hide();
      })
      .catch(() => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
      })
  }

  onMounted(() => {
      loadData()
    })

  return { rows, loadData, columns, mostrarTabla, totalWon, totalLosses, totalprofit }
}, 

})
</script>

