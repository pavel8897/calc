import { computed, ref, watch } from "vue"
import * as yup from "yup"
import { useField, useForm } from "vee-validate"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
// import { jsPDF } from "jspdf";
import { logoData } from "./logo"

export function calculateTypeOne() {
	const { handleSubmit, isSubmitting, submitCount } = useForm()
	const router = useRouter()
	const store = useStore()

	// const formValues = {
	//   thousandsTonnsProduction: 0,
	//   udelCheckVybr: 0
	// };
	// useForm({
	//   initialValues: formValues,
	// });

	const MIN_LENGTH = 4
	const {
		value: company,
		errorMessage: companyError,
		handleBlur: companyBlur,
	} = useField(
		"company",
		yup
			.string()
			.trim()
			.required("Введите наименование компании")
			.min(
				MIN_LENGTH,
				`Наименование компании не должно быть меньше ${MIN_LENGTH} символов`
			)
	)
	const {
		value: onvCode,
		errorMessage: onvCodeError,
		handleBlur: onvCodeBlur,
	} = useField(
		"onvCode",
		yup
			.string()
			.trim()
			.required("Введите код ОНВ")
			.min(
				MIN_LENGTH,
				`Код ОНВ не должен быть меньше ${MIN_LENGTH} символов`
			)
	)
	const {
		value: period,
		errorMessage: periodError,
		handleBlur: periodChange,
	} = useField("period", yup.string().trim().required("Введите период"), {
		initialValue: "",
	})
	const {
		value: year,
		errorMessage: yearError,
		handleBlur: yearBlur,
	} = useField(
		"year",
		yup
			.string()
			.trim()
			.required("Введите год")
			.min(4, "Введите корректный год")
	)

	const {
		value: udelCheckVybr,
		errorMessage: udelCheckVybrError,
		// handleBlur: yearBlur,
	} = useField(
		"udelCheckVybr",
		// yup.number().min(0, "Значение не должно быть меньше 0"),
		yup.number()/*,
		{ initialValue: 0 }*/
	)

	const {
		value: thousandsTonnsProduction,
		errorMessage: thousandsTonnsProductionError,
		handleBlur: thousandsTonnsProductionBlur,
	} = useField(
		"thousandsTonnsProduction",
		yup
			.number()
			.typeError("Введите число")
			.moreThan(0, "Значение должно быть больше 0")/*,
		{ initialValue: 1 }*/
	)

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
	)

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
	)
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
	)

	const {
		value: techVybross,
		errorMessage: techVybrossError,
		// handleBlur: yearBlur,
	} = useField(
		"techVybross",
		yup.number().min(0, "Значение не должно быть меньше 0")/*,
		{ initialValue: 0 }*/
	)

	const {
		value: energoVybross,
		errorMessage: energoVybrossError,
		// handleBlur: yearBlur,
	} = useField(
		"energoVybross",
		yup.number().min(0, "Значение не должно быть меньше 0")/*,
		{ initialValue: 0 }*/
	)

	const {
		value: summVybross,
		errorMessage: summVybrossError,
		// handleBlur: yearBlur,
	} = useField(
		"summVybross",
		// yup.number().min(0, "Значение не должно быть меньше 0"),
		yup.number()/*,
		{ initialValue: 0 }*/
	)

	// const {
	// 	value: activityType,
	// 	errorMessage: activityTypeError,
	// 	// handleBlur: yearBlur,
	// } = useField(
	// 	"activityType",
	// 	yup.string().required("Выберите вид деятельности").min(1),
	// 	{ initialValue: "" }
	// )

	// const {
	// 	value: productionType,
	// 	errorMessage: productionTypeError,
	// 	// handleBlur: yearBlur,
	// } = useField("productionType", yup.string(), { initialValue: "" })

	// const {
	// 	value: production,
	// 	// errorMessage: productionError,
	// 	// handleBlur: yearBlur,
	// } = useField("production", yup.object(), { initialValue: { k: "0", l: "zero" } })

	// const production = ref({ k: "0", l: "zero" })

	const {
		value: fuelType,
		errorMessage: fuelTypeError,
		// handleBlur: yearBlur,
	} = useField(
		"fuelType",
		yup
			.string()
			.matches(/^((?!zero).)/, { message: "Выберите тип топлива" }),
		{
			initialValue: "zero",
		}
	)

	const onSubmit = handleSubmit(async (values) => {
		const data = new FormData()
		data.append("dfdf", "sdsd")
		const response = await fetch("http://calc/api/", {
			method: "POST",
			body: JSON.stringify(values),
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
		})
		const res = await response.json()
		return
		router.push("/")
	})
	const onChangePT = () => {
		production.value = { k: "0", l: "zero" }
	}
	const onChangePTandVP = () => {
		production.value = { k: "0", l: "zero" }
		productionType.value = ""
	}
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
	}

	// watch(activityType, (newValue, oldValue) => {
	// 	production.value = { k: "0", l: "zero" }
	// })
	// watch(productionType, (newValue, oldValue) => {
	// 	production.value = { k: "0", l: "zero" }
	// })
	watch(techVybross, (newValue, oldValue) => {})

	const productionTypeInclArray = ["29", "31", "38", "44"]
	const diokUgl = 1
	const metan = 25
	const zakAzot = 298

	const calculate = handleSubmit((values) => {
		techVybross.value =
			thousandsTonnsProduction.value *
			store.state.production.k *
			(1 - stecloboyPath.value / 100)
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
				zakAzot
		// energoVybross.value = (energyQuantity.value * fuelType.value.k * 0.001) + (energyQuantity.value * 0.001 * fuelType.value.eoCH * 0.001) + (energyQuantity.value * 0.001 * fuelType.value.eoNO * 0.001)
		// console.log(techVybross.value, energoVybross.value, snigenieEcv.value)
		summVybross.value =
			techVybross.value + energoVybross.value - snigenieEcv.value

		udelCheckVybr.value = (
			summVybross.value / thousandsTonnsProduction.value
		).toFixed(3)

		techVybross.value = techVybross.value.toFixed(0)
		energoVybross.value = energoVybross.value.toFixed(0)
		summVybross.value = summVybross.value.toFixed(0)

		document.querySelector("button.sub_btn").removeAttribute("disabled")
	})

	function generatePdfFile() {
		var pdfMake = require("pdfmake/build/pdfmake.js")
		var pdfFonts = require("pdfmake/build/vfs_fonts")

		pdfMake.fonts = {
			Arial: {
				normal: "ArialRegular.ttf",
				bold: "ArialBold.ttf",
				italics: "ArialItalic.ttf",
				bolditalics: "ArialRegular.ttf",
			},
		}
		pdfMake.vfs = pdfFonts.pdfMake.vfs
		var docDefinition = {
			content: company.value,
			defaultStyle: {
				font: "Roboto",
			},
		}
		let d = new Date()
		let formatter = new Intl.DateTimeFormat("ru", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		})
		let date = formatter.format(d)
		var dd = {
			pageOrientation: "landscape",
			defaultStyle: {
				font: "Arial",
				fontSize: 11,
			},
			footer: function (currentPage, pageCount) {
				// return currentPage.toString() + ' из ' + pageCount;
				return [
					{
						columns: [
							{
								width: 750,
								text: date,
								margin: [15, 0, 0, 8],
								fontSize: 10,
							},
							{
								text:
									"Стр. " +
									currentPage.toString() +
									" из " +
									pageCount,
								margin: [10, 0, 0, 0],
								fontSize: 10,
							},
						],
					},
					{
						text: 'данный отчёт сформирован калькулятором, разработанным ФГАУ "НИИ "ЦЭПП"" и носит рекомендательный характер',
						fontSize: 9,
						color: "#515151",
						margin: [15, 0, 0, 8],
						italics: true,
					},
				]
			},
			content: [
				{
					image: logoData,
					width: 800,
				},
				{
					text: "Тип расчета:  Расчет выбросов при наличии данных только по типам продукции.",
					fontSize: 11,
					margin: [2, 2],
				},
				{
					text: "Организация    " + company.value,
					fontSize: 11,
					margin: [5, 5],
				},
				{
					text:
						"Код ОНВ      " +
						onvCode.value +
						"     Отчетный период   " +
						period.value +
						"   " +
						year.value,
					fontSize: 11,
					margin: [5, 8],
				},
				{
					alignment: "justify",
					columns: [
						{
							width: 300,
							text: store.state.activityType,
							margin: [10, 0, 0, 8],
							background: "#e8f0fe",
						},
						{
							text: store.state.productionType,
							margin: [10, 0, 0, 0],
							background: "#e8f0fe",
						},
					],
				},
				{
					alignment: "justify",
					columns: [
						{
							width: 300,
							text:
								store.state.production.l == "zero"
									? "-----"
									: store.state.production.l,
							margin: [10, 0, 0, 8],
							background: "#e8f0fe",
						},
						{
							columns: [
								{
									text:
										"Выпуск продукции тонн     " +
										thousandsTonnsProduction.value,
									margin: [10, 0, 0, 0],
								},
								{
									text:
										"Доля стеклобоя %         " +
										stecloboyPath.value,
									margin: [10, 0, 0, 0],
								},
							],
						},
					],
				},
				{
					alignment: "justify",
					columns: [
						{
							width: 300,
							text: fuelType.value,
							margin: [10, 0, 0, 8],
							background: "#e8f0fe",
						},
						{
							columns: [
								{
									text:
										"Расход топлива в ГДж       " +
										energyQuantity.value,
									margin: [10, 0, 0, 0],
								},
								{
									text:
										"Снижение т CO2 экв        " +
										snigenieEcv.value,
									margin: [10, 0, 0, 0],
								},
							],
						},
					],
				},
				{
					alignment: "justify",
					columns: [
						{
							width: 330,
							text: "Технологические выбросы, тонн (СО2-экв.)",
							margin: [10, 0, 0, 8],
						},
						{ width: "auto", text: techVybross.value },
					],
				},
				{
					alignment: "justify",
					columns: [
						{
							width: 330,
							text: "Энергетические выбросы, тонн (СО2-экв.)",
							margin: [10, 0, 0, 8],
						},
						{ width: "auto", text: energoVybross.value },
					],
				},
				{
					alignment: "justify",
					columns: [
						{
							width: 330,
							text: "Суммарный выброс, тонн (СО2-экв.)",
							margin: [10, 0, 0, 8],
						},
						{ width: "auto", text: summVybross.value },
					],
				},
				{
					alignment: "justify",
					columns: [
						{
							width: 330,
							text: "Удельный показатель выбросов, т. СО2-экв./т.",
							margin: [10, 0, 0, 8],
						},
						{ width: "auto", text: udelCheckVybr.value },
					],
				},
			],
		}
		pdfMake
			.createPdf(dd, null, pdfMake.fonts)
			.download(company.value + ".pdf")
	}

	return {
		onSubmit,
		company,
		companyError,
		companyBlur,
		onvCode,
		onvCodeError,
		onvCodeBlur,
		period,
		periodError,
		periodChange,
		year,
		yearError,
		yearBlur,
		thousandsTonnsProduction,
		thousandsTonnsProductionError,
		stecloboyPath,
		stecloboyPathError,
		fuelType,
		fuelTypeError,
		energyQuantity,
		energyQuantityError,
		snigenieEcv,
		snigenieEcvError,
		techVybross,
		energoVybross,
		summVybross,
		udelCheckVybr,
		udelCheckVybrError,
		calculate,
		productionTypeInclArray,
		onChangePT,
		onChangePTandVP,
		generatePdfFile,
	}
}
