<template>
  <div :class="'device device_num_' + num">
    <div class="row mb-3">
      <h5 style="text-align: left" class="col-sm-3">Устройство {{ num }}</h5>
    </div>
    <div class="row mb-3">
      <label :for="'techLine' + num" class="col-sm-5 col-form-label"
        >Технологическая линия / устройство</label
      >
      <div class="col-sm-7">
        <input
          placeholder="Введите наименование устройства"
          type="text"
          class="form-control"
          :id="'techLine' + num"
          :name="'techLine' + num"
          v-model="techLine"
          @blur="techLineBlur"
        />
        <small class="invalid" v-if="techLineError">{{ techLineError }}</small>
      </div>
    </div>
    
    <div class="row mb-3">
      <label
        :for="'thousandsTonnsProduction' + num"
        class="col-sm-5 col-form-label"
        >Выпуск продукции, тыс. тонн</label
      >
      <div class="col-sm-7">
        <input
          placeholder="Выберите тип топлива"
          v-model="thousandsTonnsProduction"
          type="text"
          class="form-control"
          :id="'thousandsTonnsProduction' + num"
          :name="'thousandsTonnsProduction' + num"
          @blur="thousandsTonnsProductionBlur"
        />
        <small class="invalid" v-if="thousandsTonnsProductionError">{{
          thousandsTonnsProductionError
        }}</small>
      </div>
    </div>
    <div class="row mb-3">
      <label :for="'stecloboyPath' + num" class="col-sm-5 col-form-label"
        >Доля стеклобоя, %</label
      >
      <div class="col-sm-7">
        <input
          type="text"
          placeholder="..."
          class="form-control"
          :id="'stecloboyPath' + num"
          :name="'stecloboyPath' + num"
          v-model="stecloboyPath"
          @blur="stecloboyPathBlur"
        />
        <small class="invalid" v-if="stecloboyPathError">{{
          stecloboyPathError
        }}</small>
      </div>
    </div>
    <div class="row mb-3">
      <label :for="'energyQuantity' + num" class="col-sm-5 col-form-label"
        >Расход энергии за период (ГДж)</label
      >
      <div class="col-sm-7">
        <input
          v-model="energyQuantity"
          placeholder="..."
          type="text"
          class="form-control"
          :id="'energyQuantity' + num"
          :name="'energyQuantity' + num"
          @blur="energyQuantityBlur"
        />
        <small class="invalid" v-if="energyQuantityError">{{
          energyQuantityError
        }}</small>
      </div>
    </div>
    <div class="row mb-3">
      <label :for="'fuelType' + num" class="col-sm-5 col-form-label"
        >Топливо</label
      >
      <div class="col-sm-7">
        <Field
          as="select"
          v-model="fuelType"
          class="form-select"
          aria-label="Default select example"
          id="fuelType"
          name="fuelType"
        >
          <option disabled value="zero">Выберите тип топлива</option>
          <option value="Природный газ">Природный газ</option>
          <option value="Газовое топливо">Газовое топливо</option>
          <option value="Торф">Торф</option>
          <option value="Брикеты торфяные">Брикеты торфяные</option>
        </Field>
        <small class="invalid" v-if="fuelTypeError">{{ fuelTypeError }}</small>
      </div>
    </div>
    <div class="row p-4" v-if="carbonate">
      <the-carbonate
        v-for="rawNumber in rawCount"
        :key="rawNumber"
        :numberO="rawCount"
        @getCarbData="getCarbsData"
        :noCarbonates="noCarbonates"
      ></the-carbonate>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-2">
        <!--button
          type="button"
          class="btn btn-info btn-sm"
          @click.prevent="addRaw"
        >
          Добавить сырье
        </button-->
      </div>
    </div>
    <div class="row mb-3">
      <label :for="'snigenieEcv' + num" class="col-sm-5 col-form-label"
        >Снижение (улавливание), тонн (СО2-экв.)</label
      >
      <div class="col-sm-7">
        <input
          placeholder="..."
          v-model="snigenieEcv"
          type="text"
          class="form-control"
          :id="'snigenieEcv' + num"
          :name="'snigenieEcv' + num"
          @blur="snigenieEcvBlur"
        />
        <small class="invalid" v-if="snigenieEcvError">{{
          snigenieEcvError
        }}</small>
      </div>
    </div>
    <div class="row mb-3">
      <label :for="'techVybross' + num" class="col-sm-5 col-form-label"
        >Технологический выброс, тонн (СО2-экв.)</label
      >
      <div class="col-sm-7">
        <input
          type="text"
          placeholder="..."
          class="form-control green"
          :id="'techVybross' + num"
          :name="'techVybross' + num"
          v-model="techVybross"
          disabled
        />
      </div>
    </div>
    <div class="row mb-3">
      <label :for="'energoVybross' + num" class="col-sm-5 col-form-label"
        >Энергетический выброс, тонн (СО2-экв.)</label
      >
      <div class="col-sm-7">
        <input
          type="text"
          placeholder="..."
          class="form-control green"
          :id="'energoVybross' + num"
          :name="'energoVybross' + num"
          v-model="energoVybross"
          disabled
        />
      </div>
    </div>
    <div class="row mb-3">
      <label :for="'summVybross' + num" class="col-sm-5 col-form-label"
        >Суммарный выброс, тонн (СО2-экв.)</label
      >
      <div class="col-sm-7">
        <input
          type="text"
          placeholder="..."
          class="form-control green"
          :id="'summVybross' + num"
          :name="'summVybross' + num"
          v-model="summVybross"
          disabled
        />
      </div>
    </div>
    <div class="row mb-3">
      <label :for="'udelCheckVybr' + num" class="col-sm-5 col-form-label"
        >Удельный показатель выбросов, т. СО2-экв./т.</label
      >
      <div class="col-sm-7">
        <input
          type="text"
          placeholder="..."
          class="form-control green"
          :id="'udelCheckVybr' + num"
          :name="'udelCheckVybr' + num"
          v-model="udelCheckVybr"
          disabled
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-20">
        <button
          type="button"
          @click="deviceCalculate"
          class="btn btn-primary ms-5"
          style="width: 100%; margin-left: 0 !important; background: #7b6f47; border: 0"
        >
          Рассчитать для устройства
        </button>
        <small class="invalid" v-if="noDevice"
          >Произведите расчет хотя бы для одного устройства</small
        >
      </div>
    </div>
  </div>
  <hr />
</template>

<script>
import { toRef, ref, watch, toRefs, computed, nextTick } from "vue";
import { useRoute } from "vue-router";
import TheCarbonate from "./TheCarbonate.vue";
import * as yup from "yup";
import { useField, useForm, Field } from "vee-validate";
import { useStore } from 'vuex'
export default {
  components: { TheCarbonate, Field },
  name: "TheDevice",
  props: ["number", "noDevice"],
  emits: ["getData"],
  setup(props, context) {
    const store = useStore()
    const { handleSubmit, isSubmitting, submitCount } = useForm();
    const prodType = toRefs(props);
    const num = props.number;
    const noDevice = toRef(props, "noDevice");
    const totalCarbData = [];
    const noCarbonates = ref(false);
    // const techLine = ref("");
    const {
      value: techLine,
      errorMessage: techLineError,
      handleBlur: techLineBlur,
    } = useField(
      "techLine",
      yup
        .string()
        .required("Введите наименование устройства")
        .min(3, "Наименование должно быть не менее 3 символа"),
      { initialValue: "" }
    );
    // const production = ref({ k: "0", l: "zero" });
    // const stecloboyPath = ref(10);
    const {
      value: stecloboyPath,
      errorMessage: stecloboyPathError,
      handleBlur: stecloboyPathBlur,
    } = useField(
      "stecloboyPath",
      yup
        .number()
        .typeError("Введите число")
        .min(0, "Значение не должно быть меньше 0")/*,
      { initialValue: 10 }*/
    );
    // const fuelType = ref("");
    const {
      value: fuelType,
      errorMessage: fuelTypeError,
      // handleBlur: yearBlur,
    } = useField(
      "fuelType",
      yup.string().matches(/^((?!zero).)/, { message: "Выберите тип топлива" }),
      {
        initialValue: "zero",
      }
    );
    // const snigenieEcv = ref("0");
    const {
      value: snigenieEcv,
      errorMessage: snigenieEcvError,
      handleBlur: snigenieEcvBlur,
    } = useField(
      "snigenieEcv",
      yup
        .number()
        .typeError("Введите число")
        .min(0, "Значение не должно быть меньше 0")/*,
      { initialValue: 0 }*/
    );
    const techVybross = ref("");
    const energoVybross = ref("");
    const summVybross = ref("");
    const udelCheckVybr = ref("");
    // const thousandsTonnsProduction = ref(1);
    const {
      value: thousandsTonnsProduction,
      errorMessage: thousandsTonnsProductionError,
      handleBlur: thousandsTonnsProductionBlur,
    } = useField(
      "thousandsTonnsProduction",
      yup
        .number()
        .typeError("Введите число")
        .moreThan(0, "Значение должно быть больше 0")
    );
    // const energyQuantity = ref("0");
    const {
      value: energyQuantity,
      errorMessage: energyQuantityError,
      handleBlur: energyQuantityBlur,
    } = useField(
      "energyQuantity",
      yup
        .number()
        .typeError("Введите число")
        .moreThan(0, "Значение должно быть больше 0")/*,
      { initialValue: 1 }*/
    );
    const summCarbonatsVybros = ref("0");
    const summCarbonatsVybrosFixed = ref(0);
    const fuelTypeData = {
      "Природный газ": {
        k: "54.40",
        eoCH: "1",
        eoNO: "0.1",
        opCH: "1",
        opNO: "0.1",
        ksCH: "5",
        ksNO: "0.1",
        jsCH: "5",
        jsNO: "0.1",
      },
      "Газовое топливо": {
        k: "56.10",
        eoCH: "0",
        eoNO: "0",
        opCH: "1",
        opNO: "0.1",
        ksCH: "5",
        ksNO: "0.1",
        jsCH: "5",
        jsNO: "0.1",
      },
      Торф: {
        k: "106",
        eoCH: "1",
        eoNO: "1.5",
        opCH: "2",
        opNO: "1.5",
        ksCH: "10",
        ksNO: "1.4",
        jsCH: "300",
        jsNO: "1.4",
      },
      "Брикеты торфяные": {
        k: "106",
        eoCH: "1",
        eoNO: "1.5",
        opCH: "2",
        opNO: "1.5",
        ksCH: "10",
        ksNO: "1.4",
        jsCH: "300",
        jsNO: "1.4",
      },
      zero: {
        k: "0",
        eoCH: "0",
        eoNO: "0",
        opCH: "0",
        opNO: "0",
        ksCH: "0",
        ksNO: "0",
        jsCH: "0",
        jsNO: "0",
      },
    };

    let rawCount = ref(1);
    const addRaw = async () => {
      rawCount.value++;
      await nextTick(); //ждет пока перестроится дом
      document
        .querySelector(
          ".device_num_" + num + " .row .rawMaterial_num_" + rawCount.value
        )
        .scrollIntoView({ block: "center", behavior: "smooth" });
    };

    const route = useRoute();
    const carbonate = computed(() => route.meta.carbonate);

    // watch(prodType.productionType, (newValue, oldValue) => {
    //   production.value = { k: "0", l: "zero" };
    // });
    watch(prodType.noDevice, (newValue, oldValue) => {});

    // const productionTypeInclArray = ["29", "31", "38", "44"];

    const diokUgl = 1;
    const metan = 25;
    const zakAzot = 298;

    // test
    const getCarbsData = (data) => {
      noCarbonates.value = false;
      if (totalCarbData.length != 0) {
        totalCarbData.forEach((el, index, array) => {
          for (let k in el) {
            for (let key in data) {
              if (k == key) {
                array.splice(index, 1);
              }
            }
          }
        });
        totalCarbData.push(data);
      } else {
        totalCarbData.push(data);
      }
      summCarbonatsVybros.value = 0;
      totalCarbData.forEach((el) => {
        for (let k2 in el) {
          summCarbonatsVybros.value += el[k2].vpVal;
        }
      });
      summCarbonatsVybrosFixed.value = summCarbonatsVybros.value.toFixed(0);
    };
    // test

    const deviceCalculate = handleSubmit((values) => {
      noCarbonates.value = false;
      if (totalCarbData.length == 0) {
        noCarbonates.value = true;
        // return;
      }
      // noCarbonates.value = false;
      values.carbonates = totalCarbData;
      if (carbonate.value) {
        techVybross.value = summCarbonatsVybrosFixed.value;
      } else {
        techVybross.value =
          thousandsTonnsProduction.value *
          store.state.production.k *
          (1 - stecloboyPath.value / 100);
        // energoVybross.value = energyQuantity.value * fuelType.value.k * 0.001;
      }
      energoVybross.value =
        energyQuantity.value *
          0.001 *
          fuelTypeData[fuelType.value].k *
          diokUgl +
        energyQuantity.value *
          0.001 *
          fuelTypeData[fuelType.value].eoCH *
          0.001 *
          metan +
        energyQuantity.value *
          0.001 *
          fuelTypeData[fuelType.value].eoNO *
          0.001 *
          zakAzot;
      summVybross.value =
        Number(techVybross.value) +
        Number(energoVybross.value) -
        snigenieEcv.value;

      udelCheckVybr.value = (
        summVybross.value / thousandsTonnsProduction.value
      ).toFixed(3);
      context.emit("getData", {
        [num]: {
          tv: techVybross.value,
          ev: energoVybross.value,
          sv: summVybross.value,
          uv: udelCheckVybr.value,
          t_line: techLine.value,
          production: store.state.production,
          sbp: stecloboyPath.value,
          ft: fuelType.value,
          secv: snigenieEcv.value,
          tonns: thousandsTonnsProduction.value,
          eq: energyQuantity.value,
          carbData: totalCarbData,
        },
      });
      techVybross.value = Number(techVybross.value).toFixed(0);
      energoVybross.value = Number(energoVybross.value).toFixed(0);
      summVybross.value = Number(summVybross.value).toFixed(0);
      document.querySelector(".pdf-make").removeAttribute("disabled")
    });
    return {
      deviceCalculate,
      num,
      techLine,
      techLineError,
      techLineBlur,
      // production,
      stecloboyPath,
      stecloboyPathError,
      stecloboyPathBlur,
      fuelType,
      fuelTypeError,
      snigenieEcv,
      snigenieEcvError,
      snigenieEcvBlur,
      techVybross,
      energoVybross,
      summVybross,
      udelCheckVybr,
      thousandsTonnsProduction,
      thousandsTonnsProductionError,
      thousandsTonnsProductionBlur,
      energyQuantity,
      energyQuantityError,
      energyQuantityBlur,
      // productionTypeInclArray,
      prodType,
      carbonate,
      rawCount,
      addRaw,
      getCarbsData,
      summCarbonatsVybros,
      summCarbonatsVybrosFixed,
      noDevice,
      noCarbonates,
    };
  },
};
</script>

<style scoped lang="scss">
@import "~bootstrap/scss/mixins";
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";

$calculate-for-device-button-color: #7a6d49;
$hover-button-color: #ffffff;

$custom-btn-type-two-color: #6b6b6b;
$hover-custom-btn-type-two-color: #ffffff;

.custom-btn {
  @include button-variant(
    $calculate-for-device-button-color,
    $calculate-for-device-button-color,
    $hover-button-color
  );
  width: 100%;
}
.custom-btn:hover {
  @include button-variant(
    $hover-button-color,
    $calculate-for-device-button-color,
    $calculate-for-device-button-color
  );
}
.custom-btn-type-two {
  @include button-variant(
    $custom-btn-type-two-color,
    $custom-btn-type-two-color,
    $hover-custom-btn-type-two-color
  );
}
.custom-btn-type-two:hover {
  @include button-variant(
    $hover-custom-btn-type-two-color,
    $custom-btn-type-two-color,
    $custom-btn-type-two-color
  );
}

.green {
  background-color: aquamarine;
}
.device {
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
}
.invalid {
  color: red;
  font-size: 12px;
  float: left;
  margin-left: 0.5rem;
}

label {
  text-align: left;
}

.device_num_1 .form-control {
  border: 2px solid #7a6d49;
}

/* .custom-btn{
  width: 100%;
} */

</style>
