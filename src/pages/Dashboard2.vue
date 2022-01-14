<template>
    <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm q-py-sm">
      <q-card flat style="width:100%">
        <q-card-section class="row">
          <div class="text-h6 text-weight-bolder text-grey-8" style="width:100%">Estadisticas</div>
        </q-card-section>
      </q-card>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="padding: 20px">
        <q-list>
            
             <q-table flat  :rows="rows1" :rows-per-page-options="[10]"
            hide-header
      hide-bottom  >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="campo" :props="props">
               <b>{{ props.row.campo }}:</b> 
                </q-td>
                <q-td key="value" :props="props" :class="'text-right'">
                
                
                <span >{{ props.row.value }}</span>
                </q-td>
               
              </q-tr>
            </template>
          </q-table>
        </q-list>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="padding: 20px">
        <q-list>
            <q-table flat  :rows="rows2" :rows-per-page-options="[10]"
            hide-header
      hide-bottom  >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="campo" :props="props">
               <b>{{ props.row.campo }}:</b> 
                </q-td>
                <q-td key="value" :props="props" :class="'text-right'">
                
                <q-linear-progress :value="props.row.value" color="green" 
                class="q-mt-md" size="10px" v-if="props.row.campo == 'Profitability'">
                          <q-tooltip>
                          <p style="font-weight: bold;  font-size: 12px;">How many trades were won?</p> 
                          <p style="font-size: 12px; margin-top:-10px">Won {{dataInicial["ganadas"]}} out of {{dataInicial["trades"]}} trades, which represents {{ props.row.value }}</p>
                          <p style="font-size: 12px; margin-top:-10px">Loss {{dataInicial["perdidas"]}} out of {{dataInicial["trades"]}} trades, which represents {{ 1  - props.row.value }}</p>
                          </q-tooltip>
                </q-linear-progress>
                <span v-else >{{ props.row.value }}</span>
                </q-td>
               
              </q-tr>
            </template>
          </q-table>
        </q-list>
      </div>

      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="padding: 20px">
        <q-list>
            <q-table flat  :rows="rows3" :rows-per-page-options="[10]"
            hide-header
      hide-bottom  >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="campo" :props="props">
               <b>{{ props.row.campo }}:</b> 
                </q-td>
                <q-td key="value" :props="props" :class="'text-right'">
                
                
                <span >{{ props.row.value }}</span>
                </q-td>
               
              </q-tr>
            </template>
          </q-table>
        </q-list>
      </div>
    
    </div>

     <div class="row q-col-gutter-sm q-py-sm">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding: 20px">
        <table-history-trade :rowsHistory="dataInicial['historyTrade']" />
      </div>
    </div>
    </q-page>
</template>

<script>
import { Cookies } from "quasar";
import { useQuasar, Loading } from "quasar";
import { api } from "boot/axios";
import tableEstadisticas from 'src/components/tables/tableEstadisticas.vue';
import TableEstadisticas2 from 'src/components/tables/tableEstadisticas2.vue';
import TableHistoryTrade from 'src/components/tables/tableHistoryTrade.vue';
    export default {
  components: { tableEstadisticas, TableEstadisticas2, TableHistoryTrade },
        data() {
            return {
                dataInicial: {}, 
                rows1:[], 
                rows2:[],
                rows3: [], 

            }
        },

        methods: {
            async getDatos(){
                const token = Cookies.get("authToken");
                await api
                .get("get_data_ini", {
                headers: {
                Authorization: `Bearer ${token.token}`,
                },
                })
                .then((response) => {
                console.log("response", response);
                this.dataInicial = response.data
                this.rows1 = [
                                {
                                    campo: 'Deposit',
                                    value: 1000,
                                },
                                {
                                    campo: 'Balance',
                                    value: response.data["balance"],
                                },
                                {
                                    campo: 'Drawdown',
                                    value: response.data["drawdown"],
                                },
                                {
                                    campo: 'Highest',
                                    value: response.data["highest"],
                                },
                                {
                                    campo: 'Comisiones',
                                    value: response.data["comisiones"].toFixed(2),
                                },
                                {
                                    campo: 'Swap',
                                    value: response.data["swap"],
                                },
                               
                               
                              
                                ]
                  this.rows2 = [
                                 {
                                    campo: 'Profit',
                                    value: response.data["totalProfit"],
                                },
                                {
                                    campo: 'Trades',
                                    value: response.data["trades"],
                                },
                                {
                                    campo: 'Profitability',
                                    value: ( ( response.data["ganadas"]*100/response.data["trades"] ) / 100 ).toFixed(2),
                                },
                                
                                {
                                    campo: 'Longs Won',
                                    value: response.data["longsWons"],
                                },
                                {
                                    campo: 'Best Trade ($)',
                                    value: response.data["bestTrade"],
                                },
                                 {
                                    campo: 'Worst Trade ($)',
                                    value: response.data["worstTrade"]
                                },
                                ]
                    this.rows3 = [
                                 {
                                    campo: 'Pips',
                                    value: response.data["pipsGanados"] - response.data["pipsPerdidos"]
                                },
                                {
                                    campo: 'Best Trade (Pips)',
                                    value: "("+response.data["fechaBestTrade"]+")"+" "+ response.data["bestTradePips"],
                                },
                                {
                                    campo: 'Worst Trade (Pips)',
                                    value: "("+response.data["worstTradeDate"]+")"+" "+ response.data["worstTradePips"], 
                                },
                                
                                ]
                                Loading.hide();
                })
            }
        },
        mounted() {
                this.getDatos()
        },
    }
</script>

