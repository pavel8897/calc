import { ref, watch, nextTick } from "vue"
import * as yup from "yup"
import { useField, useForm } from "vee-validate"
import { logoData } from "./logo"
import { useStore } from "vuex"
import { useRoute } from "vue-router"

export function getDataForTypeTwo() {
	const { handleSubmit, isSubmitting, submitCount } = useForm()
	const store = useStore()
    const route = useRoute()
    let typeCalc = ''
    if(route.path == "/type-two"){
        typeCalc = 'Расчет выбросов с учетом технологии производства.'
    }
    if(route.path == "/type-three"){
        typeCalc = 'Расчет выбросов на основании загрузки карбонатов.'
    }
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
	} = useField(
		"period",
		yup.string().trim().required("Введите период").min(1, "Выберите период")
	)
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
	const sumVybrByCompany = ref(0)
	const sumVybrosCompanyFixed = ref(0)
	// const productionType = ref("");
	// const activityType = ref("")
	// const {
	// 	value: activityType,
	// 	errorMessage: activityTypeError,
	// 	// handleBlur: yearBlur,
	// } = useField(
	// 	"activityType",
	// 	yup.string().required("Выберите вид деятельности").min(1),
	// 	{ initialValue: "" }
	// )
	const devicesData = []
	const noDevice = ref(false)
	let devicesCount = ref(1)
	let act = ref(false)
	const addDevice = async () => {
		devicesCount.value++
		await nextTick() //ждет пока перестроится дом
		document
			.querySelector(".device_num_" + devicesCount.value)
			.scrollIntoView()
	}

	// watch(productionType, (newValue, oldValue) => {
	//     // console.log(newValue, oldValue)
	// })

	const onSubmit = handleSubmit(async (values) => {
		values.devices = devicesData
		if (devicesData.length == 0) {
			noDevice.value = true
			return
		}
		// values.devices = devicesData
		// console.log(JSON.stringify(values))
	})

	const getAllData = (data) => {
		noDevice.value = false
		if (devicesData.length != 0) {
			devicesData.forEach((el, index, array) => {
				for (let k in el) {
					for (let key in data) {
						if (k == key) {
							array.splice(index, 1)
						}
					}
				}
			})
			devicesData.push(data)
		} else {
			devicesData.push(data)
		}
		// console.log(devicesData)
		sumVybrByCompany.value = 0
		devicesData.forEach((el) => {
			for (let k2 in el) {
				sumVybrByCompany.value += el[k2].sv
			}
		})
		sumVybrosCompanyFixed.value = sumVybrByCompany.value.toFixed(0)
	}

	
    const generatePdfFile = handleSubmit(async (values) => {
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
				fontSize: 11
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
            content: [],
        }
		dd.content.push(
			{
				image: logoData,
				width: 800,
			},
            {text: "Тип расчета:  " + typeCalc, fontSize: 11, margin: [2, 2]},
			{
				text: "Организация    " + company.value,
				fontSize: 11,
				margin: [5, 5],
			},
			{
				text:
					"Код ОНВ    " +
					onvCode.value +
					"     Отчетный период   " +
					period.value +
					"   " +
					year.value,
				fontSize: 11,
				margin: [5, 2],
			},
			{
				alignment: "justify",
					columns: [
						{
							width: 150,
							text: "Деятельность",
							margin: [10, 0, 0, 8],
							background: "#e8f0fe",
						},
						{
							text: store.state.activityType,
							margin: [10, 0, 0, 0],
							background: "#e8f0fe",
						},
					],
			},
			{
				alignment: "justify",
					columns: [
						{
							width: 150,
							text: "Производство",
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
							width: 150,
							text: "Продукция",
							margin: [10, 0, 0, 8],
							background: "#e8f0fe",
						},
						{
							text: store.state.production.l == "zero"
							? "-----"
							: store.state.production.l, margin: [ 10, 0, 0, 0 ],
							margin: [10, 0, 0, 0],
							background: "#e8f0fe",
						},
					],
			},
			// { text: store.state.activityType, margin: [ 10, 2, 0, 0 ] },
			// { text: store.state.productionType, margin: [ 10, 0, 0, 0 ] },
			// {
			// 	text:
			// 		store.state.production.l == "zero"
			// 			? "-----"
			// 			: store.state.production.l, margin: [ 10, 0, 0, 0 ]
			// },
            { text: "\nСуммарный выброс по предприятию / ОНВ, тонн (СО2-экв) -   " + sumVybrByCompany.value.toFixed(0)+"\n\n", margin: [ 10, 0, 0, 0 ] },
		)

		for (let i = 0; i < devicesData.length; i++) {
			for (let key in devicesData[i]) {
				dd.content.push(
					{
						alignment: "justify",
							columns: [
								{
									width: 150,
									text: "Устройство",
									margin: [10, 0, 0, 8],
								},
								{
									text: devicesData[i][key].t_line,
									margin: [10, 0, 0, 0],
								},
							],
					},
					{
						alignment: "justify",
							columns: [
								{
									width: 300,
									columns: [
										{
											width: 200,
											text: "Выпуск продукции, тыс. тонн",
											margin: [10, 0, 0, 8],
										},
										{
											width: 50,
											text: devicesData[i][key].tonns,
											margin: [10, 0, 0, 0],
										},
									],
								},
								{
									width: 250,
									columns: [
										{
											width: 150,
											text: "Доля стеклобоя, %",
											margin: [10, 0, 0, 8],
										},
										{
											width: 50,
											text: devicesData[i][key].sbp,
											margin: [10, 0, 0, 0],
										},
									],
								}
							],
					},
					{
						alignment: "justify",
							columns: [
								{
									width: 300,
									columns: [
										{
											width: 200,
											text: "Топливо",
											margin: [10, 0, 0, 8],
										},
										{
											width: 200,
											text: devicesData[i][key].ft,
											margin: [10, 0, 0, 0],
										},
									],
								},
								{
									width: 250,
									columns: [
										{
											width: 150,
											text: "Снижение CO2",
											margin: [10, 0, 0, 8],
										},
										{
											width: 50,
											text: devicesData[i][key].secv,
											margin: [10, 0, 0, 0],
										},
									],
								}
							],
					},
					{
						alignment: "justify",
							columns: [
								{
									width: 150,
									text: "Расход топлива",
									margin: [10, 0, 0, 8],
								},
								{
									text: devicesData[i][key].eq,
									margin: [10, 0, 0, 0],
								},
							],
					},
				)
                
                if(devicesData[i][key].carbData.length){
					let table = {
						style: 'tableExample',
						layout: {
							// defaultBorder: false,
							fillColor: function (rowIndex, node, columnIndex) {
								return (rowIndex % 2 === 0) ? null : '#f1f3f4';
							},
							hLineWidth: function (i, node) {
								return (i === 0) ? 0 : 1;
							},
							hLineColor: function (i, node) {
								return (i === 0) ? 'transparent' : 'gray';
							},
							vLineWidth: function (i, node) {
								return 0;
							},
						},
						table: {
							headerRows: 1,
							body: [
								[{text: 'Сырье на основе карбонатов-минерал', bold: true}, {text: 'Масса загружаемого карбоната', bold: true}, {text: 'Выброс т. СО2-экв', bold: true}]
							]
						}
					}
					// dd.content.push(
					// 	{
					// 		alignment: "justify",
					// 			columns: [
					// 				{
					// 					width: 400,
					// 					text: "Сырье на основе карбонатов-минерал",
					// 					margin: [10, 0, 0, 8],
					// 				},
					// 				{
					// 					width: 200,
					// 					text: "Масса загружаемого карбоната",
					// 					margin: [10, 0, 0, 8],
					// 				},
					// 				{
					// 					width: 150,
					// 					text: "Выброс т. СО2-экв",
					// 					margin: [10, 0, 0, 8],
					// 				},
					// 			],
					// 	},
					// )
                    for(let k = 0; k < devicesData[i][key].carbData.length; k++){
                        for(let key2 in devicesData[i][key].carbData[k]){
							table.table.body.push(
								[
									{text: devicesData[i][key].carbData[k][key2].matVal.cName},
									{text: devicesData[i][key].carbData[k][key2].cwVal, alignment: 'center'}, 
									{text: devicesData[i][key].carbData[k][key2].vpVal.toFixed(0), alignment: 'center'}
								]
								)
							// dd.content.push(
							// 	{
							// 		alignment: "justify",
							// 			columns: [
							// 				{
							// 					width: 400,
							// 					text: devicesData[i][key].carbData[k][key2].matVal.cName,
							// 					margin: [10, 0, 0, 8],
							// 				},
							// 				{
							// 					width: 200,
							// 					text: devicesData[i][key].carbData[k][key2].cwVal,
							// 					margin: [10, 0, 0, 8],
							// 				},
							// 				{
							// 					width: 150,
							// 					text: devicesData[i][key].carbData[k][key2].vpVal.toFixed(0),
							// 					margin: [10, 0, 0, 8],
							// 				},
							// 			],
							// 	},
							// )
                        }
                        
                    }
                    dd.content.push(table)
                }
                dd.content.push(
					{
						alignment: "justify",
							columns: [
								{
									width: 250,
									text: "\nТехнологические выбросы т СО2-экв",
									margin: [10, 0, 0, 8],
								},
								{
									text: "\n"+Number(devicesData[i][key].tv).toFixed(0),
									margin: [10, 0, 0, 0],
								},
							],
					},
					{
						alignment: "justify",
							columns: [
								{
									width: 250,
									text: "Энергетические выбросы т СО2-экв",
									margin: [10, 0, 0, 8],
								},
								{
									text: devicesData[i][key].ev.toFixed(0),
									margin: [10, 0, 0, 0],
								},
							],
					},
					{
						alignment: "justify",
							columns: [
								{
									width: 250,
									text: "Суммарный выброс т СО2-экв",
									margin: [10, 0, 0, 8],
								},
								{
									text: devicesData[i][key].sv.toFixed(0),
									margin: [10, 0, 0, 0],
								},
							],
					},
					{
						alignment: "justify",
							columns: [
								{
									width: 250,
									text: "Удельный показатель выбросов (т CO2-экв/т)\n\n",
									margin: [10, 0, 0, 8],
								},
								{
									text: devicesData[i][key].uv+"\n\n",
									margin: [10, 0, 0, 0],
								},
							],
					},
					// {text: "Снижение (улавливание), тонн (СО2-экв.) -    " + devicesData[i][key].secv, margin: [ 30, 0, 0, 0 ]}
				)
                dd.content.push(
					// {text: "Технологический выброс, тонн (СО2-экв.) -    " + devicesData[i][key].tv, margin: [ 30, 0, 0, 0 ]}
				)
                dd.content.push(
					// {text: "Энергетический выброс, тонн (СО2-экв.) -    " + devicesData[i][key].ev, margin: [ 30, 0, 0, 0 ]}
				)
                dd.content.push(
					// {text: "Суммарный выброс, тонн (СО2-экв.) -    " + devicesData[i][key].sv, margin: [ 30, 0, 0, 0 ]}
				)
                dd.content.push(
					// {text: "Удельный показатель выбросов, т. СО2-экв./т. -    " + devicesData[i][key].uv, margin: [ 30, 0, 0, 0 ]}
				)
                dd.content.push(
					// {text: "--------------------------------------------------------------------------------------------------------------", margin: [ 30, 0, 0, 0 ]}
				)
			}
		}
		
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
		pdfMake.createPdf(dd, null, pdfMake.fonts).download(company.value+ ".pdf")
		// values.devices = devicesData
		// console.log(JSON.stringify(values))
	})

	return {
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
		addDevice,
		devicesCount,
		// productionType,
		// activityType, activityTypeError,
		parent,
		getAllData,
		// saveData,
		sumVybrByCompany,
		sumVybrosCompanyFixed,
		onSubmit,
		noDevice,
		generatePdfFile,
	}
}
