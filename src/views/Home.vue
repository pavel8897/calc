<template>
  <div class="container">
    <form action="" @submit.prevent="saveData">
      <div class="row mt-3 mb-3 g-3">
        <div class="col-sm">
          <select
            v-model="activityType"
            class="form-select"
            aria-label="Default select example"
            name="activityType"
            @change="onChangePTandVP"
          >
            <option disabled value="" selected>
              Выберите Вид деятельности
            </option>
            <option disabled value="1">
              Стационарное сжигание газообразного, жидкого и твердого топлива,
              включая следующие виды топлива
            </option>
            <option disabled value="2">Сжигание на факельных установках</option>
            <option disabled value="3">
              Проведение технологических операций, осуществляемых при разведке,
              добыче, переработке, транспортировке, хранении нефти и газа
            </option>
            <option disabled value="4">
              Проведение технологических операций, осуществляемых при добыче,
              обработке, транспортировке и хранении угля
            </option>
            <option value="5">Черная металлургия</option>
            <option value="6">Цветная металлургия</option>
            <option value="7">Производство минеральных материалов</option>
            <option value="8">Химическая промышленность</option>
            <option disabled value="9">
              Нефтехимическое производство и производство сажи
            </option>
            <option disabled value="10">Сжигание топлива в транспорте</option>
            <option disabled value="11">
              Сбор и хранение навоза и помета, а также использование удобрений в
              сельском хозяйстве
            </option>
            <option disabled value="12">
              Обработка, сжигание и захоронение твердых отходов
            </option>
          </select>
          <small class="invalid" v-if="activityTypeError">{{
            activityTypeError
          }}</small>
        </div>
      </div>
      <div
        class="row mt-3 mt-3 g-3"
        v-if="
          activityType == 5 ||
          activityType == 6 ||
          activityType == 7 ||
          activityType == 8
        "
      >
        <div class="col-sm">
          <select
            v-model="productionType"
            class="form-select"
            aria-label="Default select example"
            name="productionType"
            @change="onChangePT"
          >
            <option value="" disabled selected>Выберите производство</option>
            <!-- <option value="1" v-if="activityType == 1">Производство цемента</option>
          <option value="2">Производство извести</option>
          <option value="3">Производство всех видов стекла</option>
          <option value="4">Производство керамических изделий</option> -->

            <!-- <option value="1">Газ горючий природный (естественный)</option>
            <option value="2">Газ сжиженный</option>
            <option value="3">
              Пропан и бутан сжиженные, газы углеводородные и их смеси сжиженные
            </option>
            <option value="4">
              Газ попутный нефтяной (нефтяные месторождения)
            </option>
            <option value="5">
              Газ попутный нефтяной (газоконденсатные месторождения)
            </option>
            <option value="6">
              Газ попутный нефтяной (газовые месторождения)
            </option>
            <option value="7">Газ горючий искусственный доменный</option>
            <option value="8">Кокс металлургический</option>
            <option value="9">Кокс нефтяной и сланцевый</option>
            <option value="10">Мазут (мазут топочный)</option>
            <option value="10">Уголь, за исключением бурого</option>
            <option value="10">Уголь бурый</option>
            <option value="10">
              Торф топливный, брикеты и полубрикеты торфяные
            </option>
            <option value="10">Производство природного газа</option>
            <option value="10">Производство попутного нефтяного газа</option>
            <option value="10">Добыча нефти и газового конденсата</option>
            <option value="10">Сжигание ПНГ на факельных установках</option>
            <option value="10">
              Транспорт нефти по магистральным трубопроводам
            </option>
            <option value="10">Нефтепереработка</option>
            <option value="10">Добыча природного газа</option>
            <option value="10">Транспорт природного газа</option>
            <option value="10">Добыча угля открытым способом</option>
            <option value="10">
              Добыча угля подземным способом (высокая газоносность шахт)
            </option>
            <option value="10">Добыча угля подземным способом</option> -->
            <option value="25" v-if="activityType == 5">
              Производство кокса
            </option>
            <option value="26" v-if="activityType == 5">
              Производство агломерата
            </option>
            <option value="27" v-if="activityType == 5">
              Производство железорудных окатышей
            </option>
            <option value="28" v-if="activityType == 5">
              Производство железа прямого восстановления
            </option>
            <option value="29" v-if="activityType == 5">
              Производство чугуна
            </option>
            <option value="30" v-if="activityType == 5">
              Производство кислородно-конвертерной и мартеновской стали
            </option>
            <option value="31" v-if="activityType == 5">
              Производство электростали
            </option>
            <option value="32" v-if="activityType == 5">
              Производство феррохрома
            </option>
            <option value="33" v-if="activityType == 5">
              Производство металлического кремния
            </option>
            <option value="34" v-if="activityType == 5">
              Производство ферросилиция
            </option>
            <option value="35" v-if="activityType == 5">
              Производство силикомарганца
            </option>
            <option value="36" v-if="activityType == 6">
              Производство свинца первичного
            </option>
            <option value="37" v-if="activityType == 6">
              Производство цинка
            </option>
            <option value="38" v-if="activityType == 6">
              Производство алюминия (технология CWPB/PFPB)
            </option>
            <option value="39" v-if="activityType == 6">
              Производство алюминия (технология SWPB)
            </option>
            <option value="40" v-if="activityType == 6">
              Производство алюминия (технология HSS)
            </option>
            <option value="41" v-if="activityType == 6">
              Производство алюминия (технология VSS)
            </option>
            <option value="42" v-if="activityType == 7">
              Производство цемента
            </option>
            <option value="43" v-if="activityType == 7">
              Производство извести
            </option>
            <option value="44" v-if="activityType == 7">
              Производство всех видов стекла
            </option>
            <option value="45" v-if="activityType == 7">
              Производство керамических изделий
            </option>
            <option value="46" v-if="activityType == 8">
              Производство аммиака
            </option>
            <option value="47" v-if="activityType == 8">
              Производство азотной кислоты
            </option>
            <option value="48" v-if="activityType == 8">
              Производство капролактама
            </option>
            <option value="49" v-if="activityType == 8">
              Производство глиоксаля
            </option>
            <option value="50" v-if="activityType == 8">
              Производство карбида кальция
            </option>
            <option value="51" v-if="activityType == 8">
              Производство карбида кремния
            </option>
            <option value="52" v-if="activityType == 8">
              Производство диоксида титана
            </option>
            <!-- <option value="10">Производство метанола</option>
            <option value="10">Производство этилена</option>
            <option value="10">
              Производство этилендихлорида и хлористого винила
            </option>
            <option value="10">Производство этиленоксида</option>
            <option value="10">Производство акрилонитрила</option>
            <option value="10">Производство сажи (углерод технический)</option>
            <option value="10">Авиационный керосин</option>
            <option value="10">Авиационный бензин</option>
            <option value="10">Топливо для реактивных двигателей</option>
            <option value="10">
              Дизельное топливо (железнодорожный транспорт)
            </option>
            <option value="10">
              Бензин (А70 (АИ-80), АИ-92, АИ-93, АИ-95, АИ-98) в автотранспорте
            </option>
            <option value="10">
              Дизельное топливо (летнее, зимнее, арктическое) в автотранспорте
            </option>
            <option value="10">
              Сжиженный нефтяной газ (пропан, изобутан, н-бутан)
            </option>
            <option value="10">
              Газ сжиженный (морской и внутренний водный транспорт)
            </option>
            <option value="10">Мазутное топливо (мазут флотский)</option>
            <option value="10">
              Разведение крупного молочного рогатого скота
            </option>
            <option value="10">
              Разведение прочих пород крупного рогатого скота
            </option>
            <option value="10">Свиноводство</option>
            <option value="10">Овцеводство</option>
            <option value="10">Птицеводство (индейка)</option>
            <option value="10">Птицеводство (несушки (сухой)</option>
            <option value="10">
              Птицеводство (несушки (сухой), бройлеры, утки)
            </option>
            <option value="10">Выращивание риса</option>
            <option value="10">Компостирование</option>
            <option value="10">Анаэробное сбраживание</option>
            <option value="10">
              Сжигание твердых коммунальных отходов (небиологическая фракция)
            </option>
            <option value="10">Захоронение отходов</option> -->
          </select>
          <small class="invalid" v-if="productionTypeError">{{
            productionTypeError
          }}</small>
        </div>
      </div>
      <div
        class="row mt-3 mb-3 g-3"
        v-if="productionTypeInclArray.includes(productionType)"
      >
        <div class="col-sm">
          <select
            v-model="production"
            class="form-select"
            aria-label="Default select example"
            name="production"
          >
            <!-- <option disabled :value="{ k: '0', l: 'zero' }" selected>Выберите продукцию</option>
          <option value="0.21" v-if="productionType == 44">Листовое стекло</option>
          <option value="0.21" v-if="productionType == 44">Тарное (бесцветное) стекло</option>
          <option value="0.21" v-if="productionType == 44">
            Тарное цветное стекло тарное (желтое/зеленое)
          </option>
          <option value="0.19" v-if="productionType == 44">Из стекловолокна (марки Е)</option>
          <option value="0.25" v-if="productionType == 44">Из стекловолокна (изоляционное)</option>
          <option value="0.18" v-if="productionType == 44">
            Специального назначения (телевизионные панели)
          </option>
          <option value="0.13" v-if="productionType == 44">
            Специального назначения (телевизионные трубки)
          </option>
          <option value="0.10" v-if="productionType == 44">
            Специального назначения (столовая посуда)
          </option>
          <option value="0.03" v-if="productionType == 44">Специального назначения (лаборат./фарм.)</option>
          <option value="0.2" v-if="productionType == 44">Специального назначения (ламповое)</option>
          <option value="1" v-if="productionType == 29">Чугун</option>
          <option value="1" v-if="productionType == 31">Электросталь</option>
          <option value="1" v-if="productionType == 38">Алюминий</option> -->
            <option disabled selected :value="{ k: '0', l: 'zero' }">
              Выберите продукцию
            </option>
            <option v-for="(pData, index) in productionFilteredData" :key="index" :value="pData">{{pData.l}}</option>
            <!-- <option
              :value="{ k: '0.21', l: 'Тарное (бесцветное) стекло' }"
              v-if="productionType == 44"
            >
              Тарное (бесцветное) стекло
            </option>
            <option
              :value="{
                k: '0.21',
                l: 'Тарное цветное стекло тарное (желтое/зеленое)',
              }"
              v-if="productionType == 44"
            >
              Тарное цветное стекло тарное (желтое/зеленое)
            </option>
            <option
              :value="{ k: '0.19', l: 'Из стекловолокна (марки Е)' }"
              v-if="productionType == 44"
            >
              Из стекловолокна (марки Е)
            </option>
            <option
              :value="{ k: '0.25', l: 'Из стекловолокна (изоляционное)' }"
              v-if="productionType == 44"
            >
              Из стекловолокна (изоляционное)
            </option>
            <option
              :value="{
                k: '0.18',
                l: 'Специального назначения (телевизионные панели)',
              }"
              v-if="productionType == 44"
            >
              Специального назначения (телевизионные панели)
            </option>
            <option
              :value="{
                k: '0.13',
                l: 'Специального назначения (телевизионные трубки)',
              }"
              v-if="productionType == 44"
            >
              Специального назначения (телевизионные трубки)
            </option>
            <option
              :value="{
                k: '0.1',
                l: 'Специального назначения (столовая посуда)',
              }"
              v-if="productionType == 44"
            >
              Специального назначения (столовая посуда)
            </option>
            <option
              :value="{
                k: '0.03',
                l: 'Специального назначения (лаборат./фарм.)',
              }"
              v-if="productionType == 44"
            >
              Специального назначения (лаборат./фарм.)
            </option>
            <option
              :value="{ k: '0.2', l: 'Специального назначения (ламповое)' }"
              v-if="productionType == 44"
            >
              Специального назначения (ламповое)
            </option>
            <option :value="{ k: '1', l: 'Чугун' }" v-if="productionType == 29">
              Чугун
            </option>
            <option
              :value="{ k: '1', l: 'Электросталь' }"
              v-if="productionType == 31"
            >
              Электросталь
            </option>
            <option
              :value="{ k: '1', l: 'Алюминий' }"
              v-if="productionType == 38"
            >
              Алюминий
            </option> -->
          </select>
        </div>
      </div>
      <div class="row">
        <button style="position: inherit" class="btn btn-success col-2 m-3 save-to-store">Далее</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import {productionData} from "../use/productionData"
export default {
  setup() {
    const { handleSubmit, isSubmitting, submitCount } = useForm();
    const store = useStore();
    const router = useRouter();
    const activityText = ref("");
    const productionTypeText = ref("");
    let productionFilteredData = ref([])
    const onChangePT = (e) => {
      if (e.target.options.selectedIndex > -1) {
        productionTypeText.value =
          e.target.options[e.target.options.selectedIndex].innerText;
      }
      production.value = { k: "0", l: "zero" };
    };
    const onChangePTandVP = (e) => {
      if (e.target.options.selectedIndex > -1) {
        activityText.value =
          e.target.options[e.target.options.selectedIndex].innerText;
      }
      production.value = { k: "0", l: "zero" };
      productionType.value = "";
    };
    const {
      value: activityType,
      errorMessage: activityTypeError,
      // handleBlur: yearBlur,
    } = useField(
      "activityType",
      yup
        .string()
        .required("Выберите вид деятельности")
        .min(1, "Выберите вид деятельности"),
      { initialValue: "" }
    );
    const {
      value: productionType,
      errorMessage: productionTypeError,
      // handleBlur: yearBlur,
    } = useField("productionType", yup.string().required("Выберите производство")
        .min(1, "Выберите производство"), { initialValue: "" });
    const productionTypeInclArray = ["29", "31", "38", "44"];
    const {
      value: production,
      // errorMessage: productionError,
      // handleBlur: yearBlur,
    } = useField("production", yup.object(), {
      initialValue: { k: "0", l: "zero" },
    });

    const saveData = handleSubmit((values) => {
      store.commit("setActivityType", activityText.value);
      store.commit("setProductionType", productionTypeText.value);
      store.commit("setProduction", production.value);
      router.push({ path: "/types" });
    });

    watch(activityType, (newValue, oldValue) => {
      production.value = { k: "0", l: "zero" };
    });
    watch(productionType, (newValue, oldValue) => {
      production.value = { k: "0", l: "zero" };
      productionFilteredData.value = productionData.filter(data => data.pT == newValue)
    });
    // watch(techVybross, (newValue, oldValue) => {});
    // productionFilteredData.value = productionData.filter(data => data.pt == productionType.value)
    return {
      activityType,
      activityTypeError,
      productionType,
      productionTypeError,
      productionTypeInclArray,
      production,
      saveData,
      onChangePT,
      onChangePTandVP,
      productionFilteredData
    };
  },
};
</script>

<style scoped>
.invalid {
  color: red;
  font-size: 12px;
  float: left;
  margin-left: 2rem;
}
</style>