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
const puntosDowJones                        = document.getElementById("puntosDowJones");
const variacionDowJones                     = document.getElementById("variacionDowJones");
const varPorcDowJones                       = document.getElementById("varPorcDowJones");
const puntosNasdaq                          = document.getElementById("puntosNasdaq");
const variacionNasdaq                       = document.getElementById("variacionNasdaq");
const varPorcNasdaq                         = document.getElementById("varPorcNasdaq");
const puntosSP500                          = document.getElementById("puntosSP500");
const variacionSP500                       = document.getElementById("variacionSP500");
const varPorcSP500                         = document.getElementById("varPorcSP500");

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
    let variacionPuntos                     = Math.round(Math.random() * 100000) / 100;
    let puntosNuevos                        = 0;
    let puntosIniciales                     = 38707.72;
    let variacionPorcentual                 = 0;
    let fecha                               = new Date();
    let segundo                             = fecha.getSeconds();

    if(segundo === 0 || (segundo % 2) === 0){
        puntosNuevos = (puntosIniciales + variacionPuntos).toFixed(2);
        variacionBMV.innerHTML = `+${variacionPuntos}`;
        puntosBMV.classList.remove("text-danger");
        puntosBMV.classList.add("text-success");
        variacionBMV.classList.remove("text-danger");
        variacionBMV.classList.add("text-success");
        varPorcBMV.classList.remove("text-danger");
        varPorcBMV.classList.add("text-success");
    } else {
        puntosNuevos = (puntosIniciales - variacionPuntos).toFixed(2);
        variacionBMV.innerHTML = `-${variacionPuntos}`;
        puntosBMV.classList.remove("text-success");
        puntosBMV.classList.add("text-danger");
        variacionBMV.classList.remove("text-success");
        variacionBMV.classList.add("text-danger");
        varPorcBMV.classList.remove("text-success");
        varPorcBMV.classList.add("text-danger");
    }

    variacionPorcentual = ((variacionPuntos / puntosIniciales) * 100).toFixed(2);

    puntosBMV.innerHTML = puntosNuevos.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');//38,707.72
    varPorcBMV.innerHTML = `(${variacionPorcentual}%)`
}

const cambiaPuntosDowJones = () => {
    let variacionPuntos                     = Math.round(Math.random() * 100000) / 100;
    let puntosNuevos                        = 0;
    let puntosIniciales                     = 29861.55;
    let variacionPorcentual                 = 0;
    let fecha                               = new Date();
    let segundo                             = fecha.getSeconds();

    if(segundo === 0 || (segundo % 2) === 0){
        puntosNuevos = (puntosIniciales - variacionPuntos).toFixed(2);
        variacionDowJones.innerHTML = `-${variacionPuntos}`;
        puntosDowJones.classList.remove("text-success");
        puntosDowJones.classList.add("text-danger");
        variacionDowJones.classList.remove("text-success");
        variacionDowJones.classList.add("text-danger");
        varPorcDowJones.classList.remove("text-success");
        varPorcDowJones.classList.add("text-danger");
    } else {
        puntosNuevos = (puntosIniciales + variacionPuntos).toFixed(2);
        variacionDowJones.innerHTML = `+${variacionPuntos}`;
        puntosDowJones.classList.remove("text-danger");
        puntosDowJones.classList.add("text-success");
        variacionDowJones.classList.remove("text-danger");
        variacionDowJones.classList.add("text-success");
        varPorcDowJones.classList.remove("text-danger");
        varPorcDowJones.classList.add("text-success");
    }

    variacionPorcentual = ((variacionPuntos / puntosIniciales) * 100).toFixed(2);

    puntosDowJones.innerHTML = puntosNuevos.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');//38,707.72
    varPorcDowJones.innerHTML = `(${variacionPorcentual}%)`
}

const cambiaPuntosNasdaq = () => {
    let variacionPuntos                     = Math.round(Math.random() * 100000) / 100;
    let puntosNuevos                        = 0;
    let puntosIniciales                     = 12440.04;
    let variacionPorcentual                 = 0;
    let fecha                               = new Date();
    let segundo                             = fecha.getSeconds();

    if(segundo === 0 || (segundo % 2) === 0){
        puntosNuevos = (puntosIniciales + variacionPuntos).toFixed(2);
        variacionNasdaq.innerHTML = `+${variacionPuntos}`;
        puntosNasdaq.classList.remove("text-danger");
        puntosNasdaq.classList.add("text-success");
        variacionNasdaq.classList.remove("text-danger");
        variacionNasdaq.classList.add("text-success");
        varPorcNasdaq.classList.remove("text-danger");
        varPorcNasdaq.classList.add("text-success");
    } else {
        puntosNuevos = (puntosIniciales - variacionPuntos).toFixed(2);
        variacionNasdaq.innerHTML = `-${variacionPuntos}`;
        puntosNasdaq.classList.remove("text-success");
        puntosNasdaq.classList.add("text-danger");
        variacionNasdaq.classList.remove("text-success");
        variacionNasdaq.classList.add("text-danger");
        varPorcNasdaq.classList.remove("text-success");
        varPorcNasdaq.classList.add("text-danger");
    }

    variacionPorcentual = ((variacionPuntos / puntosIniciales) * 100).toFixed(2);

    puntosNasdaq.innerHTML = puntosNuevos.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');//38,707.72
    varPorcNasdaq.innerHTML = `(${variacionPorcentual}%)`
}

const cambiaPuntosSP500 = () => {
    let variacionPuntos                     = Math.round(Math.random() * 30000) / 100;
    let puntosNuevos                        = 0;
    let puntosIniciales                     = 3647.49;
    let variacionPorcentual                 = 0;
    let fecha                               = new Date();
    let segundo                             = fecha.getSeconds();

    if(segundo === 0 || (segundo % 2) === 0){
        puntosNuevos = (puntosIniciales - variacionPuntos).toFixed(2);
        variacionSP500.innerHTML = `-${variacionPuntos}`;
        puntosSP500.classList.remove("text-success");
        puntosSP500.classList.add("text-danger");
        variacionSP500.classList.remove("text-success");
        variacionSP500.classList.add("text-danger");
        varPorcSP500.classList.remove("text-success");
        varPorcSP500.classList.add("text-danger");
    } else {
        puntosNuevos = (puntosIniciales + variacionPuntos).toFixed(2);
        variacionSP500.innerHTML = `+${variacionPuntos}`;
        puntosSP500.classList.remove("text-danger");
        puntosSP500.classList.add("text-success");
        variacionSP500.classList.remove("text-danger");
        variacionSP500.classList.add("text-success");
        varPorcSP500.classList.remove("text-danger");
        varPorcSP500.classList.add("text-success");
    }

    variacionPorcentual = ((variacionPuntos / puntosIniciales) * 100).toFixed(2);

    puntosSP500.innerHTML = puntosNuevos.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');//38,707.72
    varPorcSP500.innerHTML = `(${variacionPorcentual}%)`
}

/*************************** EVENTOS ****************************/

//// TEMPORALES PARA MUESTRA DE PROYECTO

setInterval(cambiaPuntosBMV, 3000);
setInterval(cambiaPuntosDowJones, 3000);
setInterval(cambiaPuntosNasdaq, 3000);
setInterval(cambiaPuntosSP500, 3000);

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
