<template>
  <div class="bd-main">
    <form
      class="bd-content ps-lg-4 container"
      id="thirdType"
      @submit.prevent="onSubmit"
    >
      <div class="row mb-3">
        <!--label for="company" class="col-sm-2 col-form-label">Предприятие</label-->
        <div class="col-sm-12">
          <Field
            v-model="company"
            type="text"
            class="form-control input"
            id="company"
            name="company"
            placeholder="Введите наименование предприятия"
            @blur="companyBlur"
          />
          <small class="invalid" v-if="companyError">{{ companyError }}</small>
        </div>
      </div>
      <div class="row g-3">
        <div class="col-sm-5">
          <div class="row">
            <!--label for="onvCode" class="col-sm-3 col-form-label">Код ОНВ</label-->
            <div class="col-sm-12">
              <Field
                v-model="onvCode"
                type="text"
                class="form-control input"
                id="onvCode"
                name="onvCode"
                placeholder="Введите код ОНВ"
                @blur="onvCodeBlur"
              />
              <small class="invalid" v-if="onvCodeError">{{
                onvCodeError
              }}</small>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="row">
            <!--label for="period" class="col-sm-3 col-form-label">Период</label-->
            <div class="col-sm-12">
              <Field
                as="select"
                v-model="period"
                class="form-select input"
                aria-label="Default select example"
                id="period"
                name="period"
                placeholder="Выберите период"
                @change="periodChange"
              >
                <option disabled style="color: #fff" value="" >
                  Выберите период
                </option>
                <option value="Год">Год</option>
                <option value="Квартал">Квартал</option>
                <option value="Месяц">Месяц</option>
              </Field>
              <small class="invalid" v-if="periodError">{{
                periodError
              }}</small>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="row">
            <!--label for="year" class="col-sm-5 col-form-label"
              >Значение периода</label
            -->
            <div class="col-sm-12">
              <Field
                v-model="year"
                type="number"
                class="form-control input"
                id="year"
                name="year"
                placeholder="Значение периода"
                @blur="yearBlur"
              />
              <small class="invalid" v-if="yearError">{{ yearError }}</small>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="row mb-3 mt-3">
          <label for="sumVybrByCompany" class="col-sm-6 col-form-label"
            >Суммарный выброс по предприятию / ОНВ, тонн (СО2-экв)</label
          >
          <div class="col-sm-6">
            <Field
              type="text"
              class="form-control green input"
              id="sumVybrByCompany"
              name="sumVybrByCompany"
              placeholder="..."
              
            />
          </div>
        </div>
        <hr />
        <the-device
          v-for="deviceNumber in devicesCount"
          :key="deviceNumber"
          
          :noDevice="noDevice"
          :number="devicesCount"
          @getData="getAllData"
        ></the-device>
        <div class="row justify-content-between">
          <div class="col-sm-6 mb-3">
            <button @click.prevent="addDevice" style="background: #6b6b6b; color :#fff" class="btn col-sm-12">
              Добавить устройство
            </button>
          </div>
          <div class="col-sm-6">
            <button type="submit" style="background: #6b6b6b; opacity: 1; color :#fff" class="btn col-sm-12 pdf-make" disabled @click.prevent="generatePdfFile">
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import TheDevice from "../components/TheDevice.vue";
import { getDataForTypeTwo } from "../use/type_two";
import { Field } from "vee-validate";

export default {
  components: { TheDevice, Field },
  setup() {
    return {
      ...getDataForTypeTwo(),
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

.input::placeholder {
  color: #fff;
}

.input {
  background: #7b6f47;
  color: #fff;
}

</style>