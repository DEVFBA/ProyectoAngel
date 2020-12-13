/******************** VARIABLES Y CONSTANTES ********************/

//// CONSTANTES

const montoInicialInversion                 = document.getElementById("montoInicial");
const aportacionMensualInversion            = document.getElementById("ahorroMensual");
const rendimientoInversion                  = document.getElementById("rendimiento");
const periodosInversion                     = document.getElementById("periodos");
const frecuenciaInversion                   = document.getElementById("frecuenciaInversion");
const muestraResultado                      = document.getElementById("muestraResultado"); //Revisar si se queda
const btnCalcular                           = document.getElementById("btnCalcular");
const chartInversion                        = document.getElementById("chartInversion");
const fechaHoy                              = document.getElementById("fechaResumen");

//// VARIABLES

let fecha                                   = new Date();
let dia                                     = fecha.getDate();
let mes                                     = fecha.getMonth();
let anio                                    = fecha.getFullYear();

//// TEMPORALES PARA MUESTRA DE PROYECTO

const puntosBMV                             = document.getElementById("puntosBMV");
const variacionBMV                          = document.getElementById("variacionBMV");
const varPorcBMV                            = document.getElementById("varPorcBMV");

/************************** FUNCIONES ***************************/

//// GENERALES

/* Genera la fecha en formato dd / mm / aaaa */
const formateaFecha = (dia, mes, anio) => {
    return `${dia} / ${mes + 1} / ${anio}`
}

//// FINANCIERAS

const calculaTasaMensual = (tasaAnual) => {
    let tasaMensual             = 0;

    tasaMensual = (Math.pow((1 + tasaAnual), (1 / 12))) - 1;

    return tasaMensual;
}

const calculaVFAnualidadAnticipada = (aportacion, tasa, periodos) => {
    let valorFuturoAnualidad    = 0;

    valorFuturoAnualidad = ((aportacion * (1 + tasa)) * (((Math.pow((1 + tasa), periodos)) - 1) / tasa));

    if(isNaN(Number(valorFuturoAnualidad))){
        valorFuturoAnualidad = 0;
    }

    return valorFuturoAnualidad;
}

const calculaVFAnualidadVencida = (aportacion, tasa, periodos) => {
    let valorFuturoAnualidad    = 0;

    valorFuturoAnualidad = (aportacion * (((Math.pow((1 + tasa), periodos)) - 1) / tasa));

    if(isNaN(Number(valorFuturoAnualidad))){
        valorFuturoAnualidad = 0;
    }

    return valorFuturoAnualidad;
}


//// GRAFICACION

const generaArrayInversion = (aportacion, tasa, periodos) => {
    let arrayInversion                      = [];

    for(let i = 1; i <= periodos; i++){
        arrayInversion.push({
            totalAportado: aportacion * (i),
            montoTotal: calculaVFAnualidadAnticipada(aportacion, tasa, i - 1) + aportacion
        })
    }

    return arrayInversion;
}

const graficaInversion = (chart, labels, aportaciones, totales) => {
    let myChart                             = new Chart(chart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Inversión',
                data: totales,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1,
                fill: +1
            },
            {
                label: 'Aportaciones',
                data: aportaciones,
                backgroundColor: [
                    'rgba(0, 255, 0, 0.2)'
                ],
                borderColor: [
                    'rgba(0, 255, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    return myChart;
}


//// TEMPORALES PARA MUESTRA DE PROYECTO

const cambiaPuntosBMV = () => {
    let variacionPuntos                     = Math.round(Math.random() * 80000) / 100;
    let puntosNuevos                        = 0;
    let puntosIniciales                     = 38707.72;
    let variacionPorcentual                 = 0;
    let fecha                               = new Date();
    let segundo                             = fecha.getSeconds();

    let cambioString = "";

    if(segundo === 0 || (segundo % 2) === 0){
        puntosNuevos = (puntosIniciales + variacionPuntos).toFixed(2);
        variacionBMV.innerHTML = `+${variacionPuntos}`;
        puntosBMV.classList.remove("text-danger");
        puntosBMV.classList.add("text-success");
        variacionBMV.classList.remove("text-danger");
        variacionBMV.classList.add("text-success");
        varPorcBMV.classList.remove("text-danger");
        varPorcBMV.classList.add("text-success");
        cambioString = ("positivo");
    } else {
        puntosNuevos = (puntosIniciales - variacionPuntos).toFixed(2);
        variacionBMV.innerHTML = `-${variacionPuntos}`;
        puntosBMV.classList.remove("text-success");
        puntosBMV.classList.add("text-danger");
        variacionBMV.classList.remove("text-success");
        variacionBMV.classList.add("text-danger");
        varPorcBMV.classList.remove("text-success");
        varPorcBMV.classList.add("text-danger");
        cambioString = ("negativo");
    }

    variacionPorcentual = ((variacionPuntos / puntosIniciales) * 100).toFixed(2);

    puntosBMV.innerHTML = puntosNuevos.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');//38,707.72
    varPorcBMV.innerHTML = `(${variacionPorcentual}%)`

    //console.log(`Inicia con ${puntosIniciales} y hay un cambio ${cambioString} de ${variacionPuntos} dando ${puntosNuevos} y variación Porcentual de ${variacionPorcentual}`);
}

/*************************** EVENTOS ****************************/

//// TEMPORALES PARA MUESTRA DE PROYECTO

setInterval(cambiaPuntosBMV, 3000);

//// CARGA DE PAGINA

fechaHoy.innerHTML = formateaFecha(dia, mes, anio);

//// BOTONES

btnCalcular.addEventListener('click', () => {
    let aportacion                          = parseFloat(aportacionMensualInversion.value);
    let tasa                                = parseFloat(rendimientoInversion.value / 100);
    let periodos                            = parseFloat(periodosInversion.value);
    let frecuenciaSeleccionada              = frecuenciaInversion.value;
    let valorFuturoAportaciones             = 0;
    let arrayVDT                            = [];
    let arrayLabels                         = [];
    let arrayAportaciones                   = [];
    let arrayInversionTotal                 = [];

    if(frecuenciaSeleccionada === 'Meses'){
        tasa = calculaTasaMensual(tasa);
    }

    valorFuturoAportaciones = calculaVFAnualidadVencida(aportacion, tasa, periodos).toFixed(2);

    arrayVDT = generaArrayInversion(aportacion, tasa, periodos);

    for(let i = 0; i < arrayVDT.length; i++){
        arrayLabels.push(i);
    }

    for(let i = 0; i < arrayVDT.length; i++){
        arrayInversionTotal.push(arrayVDT[i].montoTotal);
    }

    for(let i = 0; i < arrayVDT.length; i++){
        arrayAportaciones.push(arrayVDT[i].totalAportado);
    }

    graficaInversion(chartInversion, arrayLabels, arrayAportaciones, arrayInversionTotal);

    chartInversion.style.backgroundColor = "#ffffff";

    return muestraResultado.innerHTML = `$${valorFuturoAportaciones}`;
})

/*************************** TESTING ****************************/
