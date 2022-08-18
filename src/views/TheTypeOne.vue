<template>
  <div class="bd-main">
    <!-- <img src="../assets/pic-2.svg" alt="" class="back-picks-left" />
    <img src="../assets/pic-2.svg" alt="" class="back-picks-right" /> -->

    <form
      class="bd-content ps-lg-4 container"
      id="typeOne"
      @submit.prevent="onSubmit"
    >
      <div class="row mb-3">
        <!-- <label for="company" class="col-sm-2 col-form-label">Предприятие</label> -->
        <div class="col-sm-12">
          <input
            v-model="company"
            type="text"
            class="form-control input"
            id="company"
            name="company"
            @blur="companyBlur"
            placeholder="Введите наименование предприятия"
          />
          <small class="invalid" v-if="companyError">{{ companyError }}</small>
        </div>
      </div>
      <div class="row g-3">
        <div class="col-sm-5">
          <!-- <div class="row"> -->
          <!-- <label for="onvCode" class="col-sm-3 col-form-label">Код ОНВ</label> -->
          <div class="col-sm-12">
            <input
              v-model="onvCode"
              type="text"
              class="form-control input"
              id="onvCode"
              name="onvCode"
              @blur="onvCodeBlur"
              placeholder="Введите код ОНВ"
            />
            <small class="invalid" v-if="onvCodeError">{{
              onvCodeError
            }}</small>
          </div>
          <!-- </div> -->
        </div>
        <div class="col-sm-4">
          <!-- <div class="row"> -->
          <!-- <label for="period" class="col-sm-3 col-form-label">Период</label> -->
          <div class="col-sm-12">
            <select
              v-model="period"
              class="form-select input"
              aria-label="Default select example"
              id="period"
              name="period"
              @change="periodChange"
            >
              <option disabled style="color: #fff" value="" >
                Выберите период
              </option>
              <option value="Год">Год</option>
              <option value="Квартал">Квартал</option>
              <option value="Месяц">Месяц</option>
            </select>
            <small class="invalid" v-if="periodError">{{ periodError }}</small>
          </div>
          <!-- </div> -->
        </div>
        <div class="col-sm-3">
          <div class="col-sm-12">
            <input
              v-model="year"
              type="number"
              class="form-control input"
              id="year"
              name="year"
              @blur="yearBlur"
              placeholder="Год"
            />
            <small class="invalid" v-if="yearError">{{ yearError }}</small>
          </div>
        </div>
      </div>
      <!-- <div class="row mt-3 mb-3 g-3">
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
      </div> -->
      <!-- <div
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
          </select>
        </div>
      </div> -->
      <!-- <div
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
            <option disabled selected :value="{ k: '0', l: 'zero' }">
              Выберите продукцию
            </option>
            <option
              :value="{ k: '0.21', l: 'Листовое стекло' }"
              v-if="productionType == 44"
            >
              Листовое стекло
            </option>
            <option
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
            </option>
          </select>
        </div>
      </div> -->
      <div class="col-sm-12">
        <div class="row mb-3 mt-3">
          <label for="thousandsTonnsProduction" class="col-sm-5 col-form-label"
            >Выпуск продукции, тыс. тонн</label
          >
          <div class="col-sm-7">
            <input
              v-model="thousandsTonnsProduction"
              placeholder="..."              
              step="0.01"
              @blur="thousandsTonnsProductionBlur"
              class="form-control form-control-type-two"
              id="thousandsTonnsProduction"
              name="thousandsTonnsProduction"
            />
            <small class="invalid" v-if="thousandsTonnsProductionError">{{
              thousandsTonnsProductionError
            }}</small>
          </div>
        </div>
        <div class="row mb-3">
          <label for="stecloboyPath" class="col-sm-5 col-form-label"
            >Доля стеклобоя, %</label
          >
          <div class="col-sm-7">
            <input
              placeholder="..."
              v-model="stecloboyPath"
              type="text"
              class="form-control form-control-type-two"
              id="stecloboyPath"
              name="stecloboyPath"
            />
            <small class="invalid" v-if="stecloboyPathError">{{
              stecloboyPathError
            }}</small>
          </div>
        </div>
        <div class="row mb-3">
          <label for="fuelType" class="col-sm-5 col-form-label">Топливо</label>
          <div class="col-sm-7">
            <Field
              as="select"
              v-model="fuelType"
              class="form-select form-control-type-two"
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
            <small class="invalid" v-if="fuelTypeError">{{
              fuelTypeError
            }}</small>
          </div>
        </div>
        <div class="row mb-3">
          <label for="energyQuantity" class="col-sm-5 col-form-label"
            >Расход энергии за период (ГДж)</label
          >
          <div class="col-sm-7">
            <input
              v-model="energyQuantity"
              placeholder="..."
              step="0.01"
              class="form-control form-control-type-two"
              id="energyQuantity"
              name="energyQuantity"
            />
            <small class="invalid" v-if="energyQuantityError">{{
              energyQuantityError
            }}</small>
          </div>
        </div>
        <div class="row mb-3">
          <label for="snigenieEcv" class="col-sm-5 col-form-label"
            >Снижение (улавливание), тонн (СО2-экв.)</label
          >
          <div class="col-sm-7">
            <input
              placeholder="..."
              v-model="snigenieEcv"
              step="0.01"
              class="form-control form-control-type-two"
              id="snigenieEcv"
              name="snigenieEcv"
            />
            <small class="invalid" v-if="snigenieEcvError">{{
              snigenieEcvError
            }}</small>
          </div>
        </div>
        <div class="row mb-3">
          <label for="techVybross" class="col-sm-5 col-form-label"
            >Технологические выбросы, тонн (СО2-экв.)</label
          >
          <div class="col-sm-7">
            <input
              placeholder="..."
              v-model="techVybross"
              type="text"
              class="form-control form-control-type-two"
              id="techVybross"
              name="techVybross"
              disabled
            />
          </div>
        </div>
        <div class="row mb-3">
          <label for="energoVybross" class="col-sm-5 col-form-label"
            >Энергетические выбросы, тонн (СО2-экв.)</label
          >
          <div class="col-sm-7">
            <input
              placeholder="..."
              v-model="energoVybross"
              type="text"
              class="form-control form-control-type-two"
              id="energoVybross"
              name="energoVybross"
              disabled
            />
          </div>
        </div>
        <div class="row mb-3">
          <label for="summVybross" class="col-sm-5 col-form-label"
            >Суммарный выброс, тонн (СО2-экв.)</label
          >
          <div class="col-sm-7">
            <input
              placeholder="..."
              v-model="summVybross"
              type="text"
              class="form-control form-control-type-two"
              id="summVybross"
              name="summVybross"
              disabled
            />
          </div>
        </div>
        <div class="row mb-3">
          <label for="udelCheckVybr" class="col-sm-5 col-form-label"
            >Удельный показатель выбросов, т. СО2-экв./т.</label
          >
          <div class="col-sm-7">
            <input
              placeholder="..."
              v-model="udelCheckVybr"
              class="form-control form-control-type-two"
              id="udelCheckVybr"
              name="udelCheckVybr"
              disabled
            />
            <small class="invalid" v-if="udelCheckVybrError">{{
              udelCheckVybrError
            }}</small>
          </div>
        </div>
        <div class="d-grid d-md-flex justify-content-between">
          <button
            type="button"
            @click.prevent="calculate"
            class="btn btn-primary col-sm-6"
            style="background: #7b6f47; border: 0"
          >
            Рассчитать
          </button>
          <button
          @click.prevent="generatePdfFile"
            type="submit"
            class="btn btn-success col-sm-5 sub_btn"
            style="background: #6b6b6b; border: 0; opacity: 1"
            disabled
          >
            Сохранить
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { calculateTypeOne } from "../use/type_one";
import { Field, useForm } from "vee-validate";

export default {
  components: {
    Field,
  },
  setup(context) {
    return { ...calculateTypeOne() };
  },
};
</script>

<style scoped lang="scss">
@import "~bootstrap/scss/mixins";
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";

// $calculate-for-device-button-color: #7a6d49;
// $hover-button-color: #ffffff;

// $custom-btn-type-two-color: #6b6b6b;
// $hover-custom-btn-type-two-color: #ffffff;
// $input-btn-border-width: 0.2rem;

// $input-border-radius: 0;

// .form-control,
// .form-select {
//   border-radius: $input-border-radius;
//   color: $hover-button-color;
//   background-color: $calculate-for-device-button-color;
// }
// .form-control.form-control-type-two,
// .form-select.form-control-type-two {
//   color: $calculate-for-device-button-color;
//   background-color: $hover-button-color;
//   border-width: $input-btn-border-width;
//   border-color: $calculate-for-device-button-color;
// }
// .form-control::placeholder {
//   color: $hover-custom-btn-type-two-color;
// }

// .custom-btn {
//   @include button-variant(
//     $calculate-for-device-button-color,
//     $calculate-for-device-button-color,
//     $hover-button-color
//   );
//   border-radius: 0;
// }
// .custom-btn:hover {
//   @include button-variant(
//     $hover-button-color,
//     $calculate-for-device-button-color,
//     $calculate-for-device-button-color
//   );
// }
// .custom-btn-type-two {
//   @include button-variant(
//     $custom-btn-type-two-color,
//     $custom-btn-type-two-color,
//     $hover-custom-btn-type-two-color
//   );
//   border-radius: 0;
// }
// .custom-btn-type-two:hover {
//   @include button-variant(
//     $hover-custom-btn-type-two-color,
//     $custom-btn-type-two-color,
//     $custom-btn-type-two-color
//   );
// }

.bd-main {
  width: 60%;
  margin: 0 auto;
  margin-bottom: 50px;
}
label {
  text-align: left;
}
.green {
  background-color: aquamarine;
}
.invalid {
  color: red;
  font-size: 12px;
  float: left;
  margin-left: 0.5rem;
}

// back-picks
.back-picks-left {
  position: absolute;
  top: 9vw;
  left: .5rem;
  width: 20%;
  height: auto;
}
.back-picks-right {
  position: absolute;
  top: 11vw;
  right: .5rem;
  height: auto;
  width: 20%;
  height: auto;
}

.input {
  background: #7b6f47;
  color: #fff;
}

.input::placeholder {
  color: #fff;
}

.form-control-type-two {
  border: 2px solid #7b6f47; 
}

// back-picks end
</style>
