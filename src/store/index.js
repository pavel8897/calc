import { createStore } from "vuex"

export default createStore({
	state: {
		activityType: "",
		productionType: "",
		production: {
			k: "0",
			l: "zero",
		},
	},
	mutations: {
    setActivityType: (state, payload) => {
      state.activityType = payload
    },
    setProductionType: (state, payload) => {
      state.productionType = payload
    },
    setProduction: (state, payload) => {
      state.production = payload
    }
  },
	actions: {
    setActivityType: (state, payload) => {
      state.activityType = payload
    },
    setProductionType: (state, payload) => {
      state.productionType = payload
    },
    setProduction: (state, payload) => {
      state.production = payload
    }
  },
	modules: {},
  getters: {
    activ: state => {
      return state.activityType
    },
    prodType: state => {
      return state.productionType
    },
    prod: state => {
      return state.production
    }
  }
})
