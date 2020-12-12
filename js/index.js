/******************** VARIABLES Y CONSTANTES ********************/

// CONSTANTES

const montoInicialInversion                 = document.getElementById("montoInicial");
const aportacionMensualInversion            = document.getElementById("ahorroMensual");
const rendimientoInversion                  = document.getElementById("rendimiento");
const periodosInversion                     = document.getElementById("periodos");
const frecuenciaInversion                   = document.getElementById("frecuenciaInversion");
const muestraResultado                      = document.getElementById("muestraResultado"); //Revisar si se queda
const btnCalcular                           = document.getElementById("btnCalcular");
const chartInversion                        = document.getElementById("chartInversion");

// TEMPORALES PARA MUESTRA DE PROYECTO


// VARIABLES

/************************** FUNCIONES ***************************/

// FINANCIERAS

const calculaTasaMensual = (tasaAnual) => {
    let tasaMensual = 0;

    tasaMensual = (Math.pow((1 + tasaAnual), (1/12))) - 1;

    return tasaMensual;
    //return tasaMensual.toFixed(4);
}

const calculaVFAnualidadAnticipada = (aportacion, tasa, periodos) => {
    let valorFuturoAnualidad = 0;

    valorFuturoAnualidad = ((aportacion * (1 + tasa)) * (((Math.pow((1 + tasa), periodos)) - 1) / tasa));

    if(isNaN(Number(valorFuturoAnualidad))){
        valorFuturoAnualidad = 0;
    }

    return valorFuturoAnualidad;
}

const calculaVFAnualidadVencida = (aportacion, tasa, periodos) => {
    let valorFuturoAnualidad = 0;

    valorFuturoAnualidad = (aportacion * (((Math.pow((1 + tasa), periodos)) - 1) / tasa));

    if(isNaN(Number(valorFuturoAnualidad))){
        valorFuturoAnualidad = 0;
    }

    return valorFuturoAnualidad;
}


// GRAFICACION

const generaArrayInversion = (aportacion, tasa, periodos) => {
    let arrayInversion = [];

    for(let i = 1; i <= periodos; i++){
        arrayInversion.push({
            totalAportado: aportacion * (i),
            montoTotal: calculaVFAnualidadAnticipada(aportacion, tasa, i - 1) + aportacion
        })
    }

    return arrayInversion;
}

const graficaInversion = (chart, labels, aportaciones, totales) => {
    let myChart = new Chart(chart, {
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


// TEMPORALES PARA MUESTRA DE PROYECTO


/*************************** EVENTOS ****************************/

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

    return muestraResultado.innerHTML = `$${valorFuturoAportaciones}`;
})








/*************************** TESTING ****************************/


// Graficación

//console.log(generaArrayInversion(500, 12, 10));
/*
const array = generaArrayInversion(500, 12, 10);

let dataArray = [];

let dataArray2 = [];

for(let i = 0; i < array.length; i++){
    dataArray.push(array[i].montoTotal);
}

for(let i = 0; i < array.length; i++){
    dataArray2.push(array[i].totalAportado);
}
*/

//console.log(dataArray);
//console.log(dataArray2);

//var ctx = document.getElementById('myChart');
/*
var myChart = new Chart(chartInversion, {
    type: 'line',
    data: {
        labels: Object.keys(generaArrayInversion(500, 12, 10)),
        datasets: [{
            label: 'Inversión',
            data: dataArray,
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
            data: dataArray2,
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
*/
