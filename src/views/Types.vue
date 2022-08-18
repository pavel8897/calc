<template>
  
  <div class="home">
    <div class="row gy-2" style="display: flex; justify-content: center">


      <div class="col-xxl-3 col-xl-6">
        <router-link to="/type-one">
          <div class="card card-one">
            <div class="card-body">
              <h5 class="card-title">Расчет 1</h5>
              <p class="card-text">
                Расчет выбросов при наличии данных только по типам продукции
              </p>
              <a href="#" class="btn btn-types btn-primary">Перейти</a>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-xxl-3 col-xl-6">
        <router-link to="/type-two">
          <div class="card card-one">
            <div class="card-body">
              <h5 class="card-title">Расчет 2</h5>
              <p class="card-text">
                Расчет выбросов с учетом технологии производства
              </p>
              <a href="#" class="btn btn-types btn-primary">Перейти</a>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-xxl-3 col-xl-6">
        <router-link to="/type-three">
          <div class="card card-one">
            <div class="card-body">
              <h5 class="card-title">Расчет 3</h5>
              <p class="card-text">
                Расчет выбросов на основании загрузки карбонатов
              </p>
              <a href="#" class="btn btn-types btn-primary">Перейти</a>
            </div>
          </div>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: "Types"
};
</script>

<style>

a{
  text-decoration: none !important;
}
.home{
  width: 90%;
  margin: 0 auto;
}
.card{
  border: 4px solid #7b6f47 !important;
  /*border-radius: 10px !important;*/
  position: relative;
  margin-bottom: 40px;
}
.card-title, .card-text {
  color: #7b6f47;
}
.btn-types {
  position: absolute;
  background: #7b6f47 !important;
  border: 10px solid !important;
  border-radius: 0 !important;
  font-size: 24px !important;  
  top: calc(100% - 17% - 10px);
  transform: translateX(-50%);
}
.bd-main{
  /* border: 2px solid lightgray; */
  padding: 2rem;
  border-radius: 15px;
}
</style>
