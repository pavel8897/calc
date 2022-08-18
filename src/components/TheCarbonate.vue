<template>
  <div class="mb-2" :class="'rawMaterial rawMaterial_num_' + num">
    <div class="row mb-3">
      <h5 class="col-sm-2">Сырье {{ num }}</h5>
    </div>

    <div class="row mb-3">
      <label :for="'material' + num" class="col-sm-5 col-form-label"
        >Сырье</label
      >
      <div class="col-sm-7">
        <select
          class="form-select"
          aria-label="Default select example"
          :id="'material' + num"
          :name="'material' + num"
          v-model="material"
          @change="materialBlur"
        >
          <option value="">Выберите сырье</option>
          <option :value="{ EF: 0.43971, F: 1, GWP: 1, cName: 'Карбонат кальция (Кальцит или Арагонит; Известняк; Мел; Мрамор) CaCO3' }">
            Карбонат кальция (Кальцит или Арагонит; Известняк; Мел; Мрамор)
            CaCO3
          </option>
          <option :value="{ EF: 0.52197, F: 1, GWP: 1, cName: 'Магнезит MgCO3' }">Магнезит MgCO3</option>
          <option :value="{ EF: 0.47732, F: 1, GWP: 1, cName: 'Доломит CaMg(CO3)2' }">
            Доломит CaMg(CO3)2
          </option>
          <option :value="{ EF: 0.37987, F: 1, GWP: 1, cName: 'Сидерит FeCO3' }">Сидерит FeCO3</option>
          <option :value="{ EF: 0.40822, F: 1, GWP: 1, cName: 'Анкерит Ca(Fe,Mg,Mn)(CO3)2' }">
            Анкерит Ca(Fe,Mg,Mn)(CO3)2
          </option>
          <option :value="{ EF: 0.38286, F: 1, GWP: 1, cName: 'Родохрозит MnCO3' }">
            Родохрозит MnCO3
          </option>
          <option :value="{ EF: 0.41492, F: 1, GWP: 1, cName: 'Карбонат натрия (Кальцинированная сода) Na2CO3' }">
            Карбонат натрия (Кальцинированная сода) Na2CO3
          </option>
          <option :value="{ EF: 0.524, F: 1, GWP: 1, cName: 'Гидрокарбонат натрия (Сода пищевая) NaHCO3' }">
            Гидрокарбонат натрия (Сода пищевая) NaHCO3
          </option>
          <option :value="{ EF: 0.223, F: 1, GWP: 1, cName: 'Карбонат бария BaCO3' }">
            Карбонат бария BaCO3
          </option>
          <option :value="{ EF: 0.318, F: 1, GWP: 1, cName: 'Карбонат калия (Поташ) K2CO3' }">
            Карбонат калия (Поташ) K2CO3
          </option>
          <option :value="{ EF: 0.596, F: 1, GWP: 1, cName: 'Карбонат лития Li2CO3' }">
            Карбонат лития Li2CO3
          </option>
          <option :value="{ EF: 0.284, F: 1, GWP: 1, cName: 'Карбонат стронция (Соль угольной кислоты) SrCO3' }">
            Карбонат стронция (Соль угольной кислоты) SrCO3
          </option>
        </select>
        <small class="invalid" v-if="materialError">{{ materialError }}</small>
      </div>
    </div>
    <div class="row mb-3">
      <label :for="'carbonateWeight' + num" class="col-sm-5 col-form-label"
        >Масса загружаемого сырья, тыс. тонн</label
      >
      <div class="col-sm-7">
        <input
          v-model="carbonateWeight"
          type="number"
          class="form-control"
          :id="'carbonateWeight' + num"
          :name="'carbonateWeight' + num"
          @blur="carbonateWeightBlur"
        />
        <small class="invalid" v-if="carbonateWeightError">{{
          carbonateWeightError
        }}</small>
      </div>
    </div>
    <div class="row mb-3">
      <label :for="'vybrosPg' + num" class="col-sm-5 col-form-label"
        >Выброс парниковых газов, тонн (СО2-экв.)</label
      >
      <div class="col-sm-7">
        <input
          type="text"
          class="form-control green"
          :id="'vybrosPg' + num"
          :name="'vybrosPg' + num"
          v-model="vybrosPg"
          disabled
        />
        <small class="invalid">{{ vybrosPgError }}</small>
      </div>      
    </div>

    <div class="col-sm-7" style="float: right; padding-left: 10px; display: flex;
     justify-content: space-between">
      <button
        class="btn btn-secondary col-sm-5"
        @click.prevent="calculateVybrosPG"
      >
        Рассчитать
      </button>

      <button
          type="button"
          class="btn btn-secondary col-sm-5"
          @click.prevent="addRaw"
        >
          Добавить сырье
      </button>
    </div>    

    <small class="invalid" v-if="noCarbonates"
      >Сделайте расчет хотя бы для одного типа сырья</small
    >
  </div>
</template>

<script>
import { ref, toRef, watch } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
export default {
  name: "TheCarbonate",
  props: ["numberO", "noCarbonates"],
  emits: ["getCarbData"],
  setup(props, context) {
    const num = props.numberO;
    const noCarbonates = toRef(props, "noCarbonates");

    const { handleSubmit, isSubmitting, submitCount } = useForm();
    const {
      value: material,
      errorMessage: materialError,
      handleChange: materialBlur,
    } = useField("material", yup.object().typeError("Выберите сырьё"), {
      initialValue: "",
    });
    const { value: carbonateWeight, errorMessage: carbonateWeightError } =
      useField(
        "carbonateWeight",
        yup
          .number()
          .typeError("Должно быть число")
          .moreThan(0, "Значение должно быть больше 0"),
        { initialValue: 0 }
      );
    const { value: vybrosPg, errorMessage: vybrosPgError } = useField(
      "vybrosPg",
      yup.number(),
      { initialValue: 0 }
    );
    const calculateVybrosPG = handleSubmit((values) => {
      vybrosPg.value =
        material.value.EF *
        carbonateWeight.value *
        material.value.F *
        material.value.GWP;
      context.emit("getCarbData", {
        [num]: {
          matVal: {
            EF: material.value.EF,
            F: material.value.F,
            GWP: material.value.GWP,
            cName: material.value.cName
          },
          cwVal: carbonateWeight.value,
          vpVal: vybrosPg.value,
        },
      });
    });

    return {
      num,
      material,
      materialError,
      carbonateWeight,
      carbonateWeightError,
      vybrosPg,
      vybrosPgError,
      calculateVybrosPG,
      noCarbonates,
    };
  },
};
</script>

<style scoped>
.green {
  background-color: aquamarine;
}
.rawMaterial {
  background-color: #d9d9d9;
  padding: 10px;
  border-radius: 10px;
}
.invalid {
  color: red;
  font-size: 12px;
  float: left;
  margin-left: 0.5rem;
}
</style>