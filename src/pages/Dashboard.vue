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
          <tableEstadisticas />
        </q-list>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="padding: 20px">
        <q-list>
          <tableEstadisticas2 />
        </q-list>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="padding: 20px">
        <q-list>
          <tableEstadisticas />
        </q-list>
      </div>  
    </div>

    <div class="row q-col-gutter-sm q-py-sm">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 20px">
        <q-card flat>
          <q-card-section class="row">
            <div class="text-h6 text-weight-bolder text-grey-8">
              Posiciones Abiertas
            </div>
            <q-space></q-space>
            <q-btn
              class="text-capitalize btnCustom"
              icon="read_more"
              flat
              color="grey-4"
              text-color="black"
              unelevated
              style="background: #ebebeb99"
            ></q-btn>
          </q-card-section>
          <q-card-section class="row">
            <div
              class="text-h7 text-weight-bolder text-grey-8"
              style="width: 100%"
            >
              Flotante:
              <q-badge
                class="badgeTotalProfit"
                style="padding: 5px"
                color="green"
                v-if="flotante > 0"
              >
                {{ flotante }}
              </q-badge>
              <q-badge
                class="badgeTotalProfit"
                style="padding: 5px"
                color="red"
                v-else
              >
                {{ flotante }}
              </q-badge>
            </div>
            <div
              class="text-h7 text-weight-bolder text-grey-8"
              style="width: 100%"
            >
              Capital:
              <span
                class="usdGreen"
              >
                {{ balance }}
              </span>
            </div>
          </q-card-section>
          <q-list>
            <tableOpenTrade :arrayPositions="posiciones" v-if="mostrarItems" />
          </q-list>
        </q-card>
      </div>

      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 20px">
        <tableHistoryTrade :rowsHistory="historyTrade" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar, Loading } from "quasar";
import { defineComponent, defineAsyncComponent } from "vue";
import swapModal from "../components/swap/swapModal.vue";
import { Cookies } from "quasar";
import { api } from "boot/axios";
import { ref } from "vue";
import { onMounted } from "vue";

const columnsHistory = [
  { name: "time", label: "Time", field: "time", sortable: true, align: "left" },
  {
    name: "symbol",
    label: "Symbol",
    field: "symbol",
    sortable: true,
    align: "left",
  },
  { name: "type", label: "Type", field: "type", sortable: true, align: "left" },
  {
    name: "volume",
    label: "Volume ",
    field: "volume",
    sortable: false,
    align: "center",
  },
  {
    name: "price_open",
    label: "Price ",
    field: "price_open",
    sortable: false,
    align: "center",
  },
  { name: "sl", label: "SL ", field: "sl", sortable: false, align: "center" },
  { name: "tp", label: "TP ", field: "tp", sortable: false, align: "center" },
  {
    name: "time_close",
    label: "Time_close ",
    field: "time_close",
    sortable: false,
    align: "center",
  },
  {
    name: "price_close",
    label: "Price Close ",
    field: "price_close",
    sortable: false,
    align: "center",
  },
  {
    name: "profit",
    label: "Profit ",
    field: "profit",
    sortable: true,
    align: "center",
  },
];
export default defineComponent({
  name: "PageIndex",
  components: {
    lineChartsbalance: defineAsyncComponent(() =>
      import("components/charts/lineChartsbalance")
    ),
    lineChartCapital: defineAsyncComponent(() =>
      import("components/charts/lineChartCapital")
    ),
    tableOpenTrade: defineAsyncComponent(() =>
      import("components/tables/tableOpenTrade")
    ),
    tableHistoryTrade: defineAsyncComponent(() =>
      import("components/tables/tableHistoryTrade")
    ),
    tableEstadisticas: defineAsyncComponent(() =>
      import("components/tables/tableEstadisticas")
    ),

     tableEstadisticas2: defineAsyncComponent(() =>
      import("components/tables/tableEstadisticas2")
    ),
    swapModal,
  },
  setup() {
    const $q = useQuasar();
    const token = Cookies.get("authToken");
    const historyTrade = ref(null);
    const mostrarItems = ref(false);
    const posiciones = ref(null);
    const flotante = ref(null);
    const balance = ref(null);

    //funciones
    function loadData() {
      api
        .get("get_init_dashboard", {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
        .then((response) => {
          console.log("response", response);
          historyTrade.value = response.data.historyTrade;

          posiciones.value = response.data.arrayPositions;
          if (response.data.arrayPositions.length > 0) {
            mostrarItems.value = true;
          }
          flotante.value = response.data.flotante;
          balance.value = response.data.balance;
        })
        .catch(() => {
          $q.notify({
            color: "negative",
            position: "top",
            message: "Loading failed",
            icon: "report_problem",
          });
        });
    }
    //fin funciones
    Loading.hide();

    onMounted(() => {
      loadData();
    });

    return {
      historyTrade,
      mostrarItems,
      posiciones,
      balance,
      flotante,
      loadData,
      openSwapModal() {
        $q.dialog({
          component: swapModal,
          ok: false,
        })
          .onOk(() => {
            // console.log('OK')
          })
          .onCancel(() => {
            // console.log('Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      },
    };
  },
});
</script>
