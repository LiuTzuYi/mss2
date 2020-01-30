/*
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:29
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-10-08 11:04:40
 */

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Constant
 * @name chartConfig
 * @description
 *   Setup chart constant variables and configurations.
 *
 * @property {Object} gaugeColor Grade chart color scale
 *
 * @property {Object} spiderAsix Overall chart (spider) scale and asix
 * @property {Object} spiderAsix Overall chart (spider) scale and asix
 * @property {String[]} spiderLabel Overall chart (spider) label
 * @property {Object[]} spiderColor Overall chart (spider) color
 *
 * @property {Object[]} scoreTagColorTotal Inline chart color (total score)
 * @property {Object[]} scoreTagColor Inline chart color (warning type)
 * @property {Object} scoreTagOptsTotal Inline chart option (total score), [any ChartJS options](https://www.chartjs.org/docs/latest/configuration/)
 * @property {Object} scoreTagOpts Inline chart option (warning type), [any ChartJS options](https://www.chartjs.org/docs/latest/configuration/)
 *
 * @property {Object[]} chartSetOverride Inline mixed chart type
 * @property {Object[]} scoreTagColorTotalMix Inline mixed chart color (total score)
 * @property {Object[]} scoreTagColorMix Inline mixed chart color (warning type)
 * @property {Object} scoreTagOptsTotal2 Inline mixed chart option (total score), [any ChartJS options](https://www.chartjs.org/docs/latest/configuration/)
 * @property {Object} scoreTagOpts2 Inline mixed chart option (warning type), [any ChartJS options](https://www.chartjs.org/docs/latest/configuration/)
 *
 * @property {Object} scoreTagOptsTotalFull Inline chart fullscreen option (total score), [any ChartJS options](https://www.chartjs.org/docs/latest/configuration/)
 * @property {Object} scoreTagOptsFull Inline chart fullscreen option (warning type), [any ChartJS options](https://www.chartjs.org/docs/latest/configuration/)
 *
 * @property {Object[]} chartSetOverrideFull Inline mixed chart fullscreen type
 * @property {String[]} scoreChartSeriesFullGrp Inline mixed chart fullscreen label (group)
 * @property {String[]} scoreChartSeriesFullVeh Inline mixed chart fullscreen label (vehicle)
 * @property {String[]} scoreChartSeriesFullDrv Inline mixed chart fullscreen label (driver)
 * @property {Object} scoreTagOptsTotalFullMix Inline mixed chart fullscreen option (total score), [any ChartJS options](https://www.chartjs.org/docs/latest/configuration/)
 * @property {Object} scoreTagOptsFullMix Inline mixed chart fullscreen option (warning type), [any ChartJS options](https://www.chartjs.org/docs/latest/configuration/)
 *
 * @property {String[]} scoreChartSeriesCollision Chart label (collision)
 * @property {String[]} scoreChartSeriesBDB Chart label (bad driving behavior)
 * @property {String[]} scoreChartSeriesComfort Chart label (comfortability)
 * @property {Object[]} scoreChartTotalFix Chart type (total score)
 * @property {Object} scoreChartOptsTotal Chart option (total score), [any ChartJS options](https://www.chartjs.org/docs/latest/configuration/)
 * @property {Object} scoreChartOpts Chart option (warning type), [any ChartJS options](https://www.chartjs.org/docs/latest/configuration/)
 *
 * @property {String[]} KMB_spiderLabel Overall chart (spider) label for KMB
 * @property {Object[]} KMB_spiderColor Overall chart (spider) color for KMB
 */
angular.module('carSafety').constant('chartConfig', {
    gaugeColor: {
        "0": {
            "color": "transparent"
        },
        "0.01": {
            "color": "red"
        },
        "20.01": {
            "color": "orange"
        },
        "40.01": {
            "color": "yellow"
        },
        "60.01": {
            "color": "greenyellow"
        },
        "80.01": {
            "color": "lime"
        }
    },
    spiderFieldSet: [
        ['FCW', 'LDW', 'HMW'],
        ['FDW', 'CLW', 'DTW', 'NDW', 'YW'],
        ['AAW', 'ABW', 'ATW']
    ],
    CLP_spiderFieldSet: [
        ['FCW', 'LDW', 'HMW'],
        //['FDW', 'CLW', 'DTW', 'NDW', 'YW'],
        ['AAW', 'ABW', 'ATW']
    ],
    scoreTagFieldSet: ['FCW', 'LDW', 'HMW', 'FDW', 'CLW', 'DTW', 'NDW', 'YW', 'AAW', 'ABW', 'ATW'],
    CLP_scoreTagFieldSet: ['FCW', 'LDW', 'HMW', 'AAW', 'ABW', 'ATW'],
    dataFieldSet: [
        ['FCW', 'LDW', 'HMW'],
        ['FDW', 'CLW', 'DTW', 'NDW', 'YW'],
        ['AAW', 'ABW', 'ATW']
    ],
    videotypeSelect: ['FCW_L2', 'HMW_L2', 'FDW_L2', 'ABW_L2', 'ATW_L2'],
    spiderAsix: {
        0: "",
        10: "F",
        20: "E",
        30: "D",
        40: "C",
        50: "B-",
        60: "B",
        70: "B+",
        80: "A-",
        90: "A",
        100: "A+"
    },
    spiderColor: [{
            backgroundColor: "rgba(255, 120, 120, 0.5)",
            pointBackgroundColor: "#ff2323",
            pointHoverBackgroundColor: "#ff7878",
            borderColor: "#ff2323",
            pointBorderColor: '#fff',
            pointHoverBorderColor: "#ff7878"
        },
        {
            backgroundColor: "rgba(255, 252, 101, 0.5)",
            pointBackgroundColor: "#e6da00",
            pointHoverBackgroundColor: "#fffc65",
            borderColor: "#e6da00",
            pointBorderColor: '#fff',
            pointHoverBorderColor: "#fffc65"
        },
        {
            backgroundColor: "rgba(100, 255, 103, 0.5)",
            pointBackgroundColor: "#38e000",
            pointHoverBackgroundColor: "#64ff67",
            borderColor: "#38e000",
            pointBorderColor: '#fff',
            pointHoverBorderColor: "#64ff67"
        }
    ],
    scoreTagColor: [{
            borderColor: "rgba(48, 25, 255, 0)",
            backgroundColor: "rgba(48, 25, 255, 0.3)",
            hoverBackgroundColor: "rgb(185, 178, 248)",
            hoverBorderColor: "rgb(185, 178, 248)"
        },
        {
            backgroundColor: "rgb(255, 0, 4)",
            borderColor: "rgb(255, 0, 4)",
            pointBackgroundColor: "rgb(255, 0, 4)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "rgb(255, 0, 4)",
            pointHoverBorderColor: "rgb(255, 0, 4)"
        }
    ],
    scoreTagColorTotal: [{
            borderColor: "rgba(13, 157, 246, 0)",
            backgroundColor: "rgba(13, 157, 246, 0.3)",
            hoverBackgroundColor: "rgb(174, 218, 245)",
            hoverBorderColor: "rgb(174, 218, 245)"
        },
        {
            backgroundColor: "rgb(0, 91, 18)",
            borderColor: "rgb(0, 91, 18)",
            pointBackgroundColor: "rgb(0, 91, 18)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "rgb(0, 91, 18)",
            pointHoverBorderColor: "rgb(0, 91, 18)"
        }
    ],
    scoreTagColorMix: [{
            backgroundColor: "rgb(255, 0, 4)",
            borderColor: "rgb(255, 0, 4)",
            pointBackgroundColor: "rgb(255, 0, 4)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "rgb(255, 0, 4)",
            pointHoverBorderColor: "rgb(255, 0, 4)"
        },
        {
            borderColor: "rgba(48, 25, 255, 0)",
            backgroundColor: "rgba(48, 25, 255, 0.3)",
            hoverBackgroundColor: "rgb(185, 178, 248)",
            hoverBorderColor: "rgb(185, 178, 248)"
        }
    ],
    scoreTagColorTotalMix: [{
            backgroundColor: "rgb(0, 91, 18)",
            borderColor: "rgb(0, 91, 18)",
            pointBackgroundColor: "rgb(0, 91, 18)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "rgb(0, 91, 18)",
            pointHoverBorderColor: "rgb(0, 91, 18)"
        },
        {
            borderColor: "rgba(13, 157, 246, 0)",
            backgroundColor: "rgba(13, 157, 246, 0.3)",
            hoverBackgroundColor: "rgb(174, 218, 245)",
            hoverBorderColor: "rgb(174, 218, 245)"
        }
    ],
    scoreTagOpts: {
        responsive: false,
        legend: false,
        scales: {
            yAxes: [{
                display: false,
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                display: false
            }]
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    if (tooltipItem.yLabel == null) {
                        return
                    } else if (tooltipItem.yLabel == 0) {
                        return '0'
                    } else {
                        return tooltipItem.yLabel;
                    }
                },
                title: function (tooltipItem, data) {
                    return;
                }
            }
        }
    },
    scoreTagOptsTotal: {
        responsive: false,
        legend: false,
        scales: {
            yAxes: [{
                display: false,
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    stepSize: 10
                }
            }],
            xAxes: [{
                display: false
            }]
        },
        tooltips: {
            filter: function (tooltipItem, data) {
                if (tooltipItem.yLabel == null) {
                    return
                } else if (tooltipItem.yLabel == null) {
                    return false;
                } else {
                    return true;
                }
            },
            callbacks: {
                label: function (tooltipItem, data) {
                    if (tooltipItem.yLabel == 0) {
                        return '0'
                    } else {
                        return tooltipItem.yLabel;
                    }
                },
                title: function (tooltipItem, data) {
                    return;
                }
            }
        }
    },
    scoreChartOpts: {
        legend: {
            display: true,
            labels: {
                boxWidth: 10
            },
            onHover: function (e) {
                e.target.style.cursor = 'pointer';
            }
        },
        hover: {
            onHover: function () {
                var target = document.querySelectorAll("canvas#line.chart.chart-line")
                for (var i = 0; i < target.length; i++) {
                    target[i].style.cursor = 'default';
                }
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        tooltips: {
            filter: function (tooltipItem, data) {
                if (tooltipItem.yLabel == null) {
                    return false;
                } else {
                    return true;
                }
            },
            callbacks: {
                label: function (tooltipItem, data) {
                    if (tooltipItem.yLabel == 0) {
                        return data.datasets[tooltipItem.datasetIndex].label + ': 0'
                    } else {
                        return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel;
                    }
                }
            }
        }
    },
    scoreChartOptsTotal: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    stepSize: 10
                }
            }]
        },
        tooltips: {
            filter: function (tooltipItem, data) {
                if (tooltipItem.yLabel == null) {
                    return false;
                } else {
                    return true;
                }
            },
            callbacks: {
                label: function (tooltipItem, data) {
                    if (tooltipItem.datasetIndex == 0) {
                        if (tooltipItem.yLabel == 0) {
                            return '0'
                        } else {
                            return tooltipItem.yLabel;
                        }
                    }
                }
            }
        }
    },
    scoreChartTotalFix: [{},
        {
            showLine: false,
            pointRadius: 0,
            pointHoverRadius: 0
        }
    ],
    chartSetOverride: [{
            type: 'line',
            fill: false
        },
        {
            type: 'bar'
        }
    ],
    scoreTagOpts2: {
        responsive: false,
        legend: false,
        scales: {
            yAxes: [{
                display: false,
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                display: false
            }]
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    if (tooltipItem.yLabel == null || tooltipItem.datasetIndex == 0) {
                        return
                    } else if (tooltipItem.yLabel == 0) {
                        return '0'
                    } else {
                        return tooltipItem.yLabel;
                    }
                },
                title: function (tooltipItem, data) {
                    return;
                }
            }
        }
    },
    scoreTagOptsTotal2: {
        responsive: false,
        legend: false,
        scales: {
            yAxes: [{
                display: false,
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    stepSize: 10
                }
            }],
            xAxes: [{
                display: false
            }]
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    if (tooltipItem.yLabel == null || tooltipItem.datasetIndex == 0) {
                        return
                    } else if (tooltipItem.yLabel == 0) {
                        return '0'
                    } else {
                        return tooltipItem.yLabel;
                    }
                },
                title: function (tooltipItem, data) {
                    return;
                }
            }
        }
    },
    scoreTagOptsTotalFull: {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    stepSize: 10
                },
                stacked: true
            }]
        },
        tooltips: {
            filter: function (tooltipItem, data) {
                if (tooltipItem.yLabel == null) {
                    return false;
                } else {
                    return true;
                }
            },
            callbacks: {
                label: function (tooltipItem, data) {
                    if (tooltipItem.datasetIndex == 0) {
                        if (tooltipItem.yLabel == 0) {
                            return '0'
                        } else {
                            return tooltipItem.yLabel;
                        }
                    }
                }
            }
        }
    },
    scoreTagOptsFull: {
        scales: {
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                stacked: true
            }]
        },
        tooltips: {
            filter: function (tooltipItem, data) {
                if (tooltipItem.yLabel == null) {
                    return false;
                } else {
                    return true;
                }
            },
            callbacks: {
                label: function (tooltipItem, data) {
                    if (tooltipItem.datasetIndex == 0) {
                        if (tooltipItem.yLabel == 0) {
                            return '0'
                        } else {
                            return tooltipItem.yLabel;
                        }
                    }
                }
            }
        }
    },
    scoreTagOptsTotalFullMix: {
        legend: {
            display: true,
            labels: {
                boxWidth: 10
            },
            onHover: function (e) {
                e.target.style.cursor = 'pointer';
            }
        },
        hover: {
            onHover: function () {
                var target = document.querySelectorAll("canvas#barline.chart.chart-bar")
                for (var i = 0; i < target.length; i++) {
                    target[i].style.cursor = 'default';
                }
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    stepSize: 10
                }
            }]
        },
        tooltips: {
            filter: function (tooltipItem, data) {
                if (tooltipItem.yLabel == null) {
                    return false;
                } else {
                    return true;
                }
            },
            callbacks: {
                label: function (tooltipItem, data) {
                    if (tooltipItem.yLabel == 0) {
                        return data.datasets[tooltipItem.datasetIndex].label + ': 0'
                    } else {
                        return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel;
                    }
                }
            }
        }
    },
    scoreTagOptsFullMix: {
        legend: {
            display: true,
            labels: {
                boxWidth: 10
            },
            onHover: function (e) {
                e.target.style.cursor = 'pointer';
            }
        },
        hover: {
            onHover: function () {
                var target = document.querySelectorAll("canvas#barline.chart.chart-bar")
                for (var i = 0; i < target.length; i++) {
                    target[i].style.cursor = 'default';
                }
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        tooltips: {
            filter: function (tooltipItem, data) {
                if (tooltipItem.yLabel == null) {
                    return false;
                } else {
                    return true;
                }
            },
            callbacks: {
                label: function (tooltipItem, data) {
                    if (tooltipItem.yLabel == 0) {
                        return data.datasets[tooltipItem.datasetIndex].label + ': 0'
                    } else {
                        return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel;
                    }
                }
            }
        }
    },
    chartSetOverrideFull: [{
            type: 'line',
            fill: false
        },
        {
            type: 'bar'
        }
    ],
    scoreChartSeriesFullGrp: ['company', 'group'],
    scoreChartSeriesFullVeh: ['company', 'vehicle'],
    scoreChartSeriesFullDrv: ['company', 'driver']
})