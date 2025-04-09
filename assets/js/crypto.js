const baseUrl = `https://api.coingecko.com/api/v3/coins/`;
let barData = [];
let chartInstance = null;
let currentDays = 1;
let chartType = 'line';

async function fetchData() {
    const fullUrl = `${baseUrl}${new URLSearchParams(window.location.search).get("coin")}`;

    const response = await fetch(fullUrl);
    const data = await response.json();
    console.log(data);

    /*
    "price_change_percentage_24h": -2.23103,
    "price_change_percentage_7d": -8.65587,
    "price_change_percentage_14d": -12.10098,
    "price_change_percentage_30d": -4.89036,
    "price_change_percentage_60d": -19.36154,
    "price_change_percentage_200d": 22.69007,
    "price_change_percentage_1y": 9.59293
    */

    if (response.ok) {
        document.getElementById("cryptoImage").src = data.image.small;
        document.getElementById("cryptoNom").textContent = data.name;
        document.getElementById("cryptoSymbol").textContent = data.symbol;
        document.getElementById("cryptoPosition").textContent = "#" + data.market_cap_rank;
        document.getElementById("cryptoPrice").textContent = "$" + data.market_data.current_price.usd;
        document.getElementById("cryptoGenesis").textContent = data.genesis_date;
        document.getElementById("cryptoCaptitalisation").textContent = "$" + data.market_data.market_cap.usd;
        document.getElementById("cryptoCirculation").textContent = coin.circulating_supply + " " + coin.symbol.toUpperCase();
        /*
        document.getElementById("#cryptoWebsite").innerText;
        document.getElementById("#cryptoWhitePaper").innerText;
        document.getElementById("#cryptoTwitter").innerText;
        document.getElementById("#cryptoFacebook").innerText;
        document.getElementById("#cryptoTelegram").innerText;
        document.getElementById("#cryptoGithub").innerText;
        document.getElementById("#cryptoDesc").innerText;*/
    }
}

async function fetchDataChart(days = 1) {
    barData = [];
    const fullUrl = `${baseUrl}${new URLSearchParams(window.location.search).get("coin")}/ohlc?vs_currency=usd&days=${days}&x_cg_demo_api_key=CG-Fbk1zYKeAXcSxq7VcAxusyVE`;

    const response = await fetch(fullUrl);
    const data = await response.json();
    console.log(data);

    if (response.ok) {
        data.forEach(d => {
            barData.push({
                x: d[0],
                o: d[1],
                h: d[2],
                l: d[3],
                c: d[4]
            })
        });
    
        if (chartType === 'line') {
            chartLigne();
        } else {
            chartBougie();
        }
    }
}

function destroyChart() {
    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }
}

/**
 * Chart en bougie
 */
function chartBougie() {
    destroyChart();

    const ctx = document.getElementById('chart');

    chartInstance = new Chart(ctx, {
        type: 'candlestick',
        data: {
            datasets: [{
                data: barData,
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: { display: false },
            },
            scales: {
                x: {
                    type: 'timeseries',
                    grid: { color: 'transparent' },
                    ticks: { color: '#9CA3AF' }
                },
                y: {
                    type: 'linear',
                    grid: { color: '#9CA3AF20' },
                    ticks: { color: '#9CA3AF' }
                }
            }
        }
    });
}

/**
 * Chart en ligne
 */
function chartLigne() {
    destroyChart();

    const ctx = document.getElementById('chart');
    const lineData = barData.map(point => ({
        x: point.x,
        y: point.c
    }));


    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            //labels: ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00'],
            datasets: [{
                //data: [12, 19, 3, 5, 30, 29, 35, 40, 50, 70, 0.05, 3, 100],
                data: lineData,
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--purple-color'),
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 0,
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                x: {
                    type: 'timeseries',
                    grid: {
                        color: (context) => {
                            return context.index === 0 ? '#9CA3AF20' : 'transparent';
                        },
                    },
                    ticks: {
                        color: '#9CA3AF'
                    }
                },
                y: {
                    beginAtZero: false,
                    grid: {
                        color: '#9CA3AF20'
                    },
                    ticks: {
                        color: '#9CA3AF'
                    },
                }
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", e => {
    fetchData();
    fetchDataChart();

    const vueButtons = document.querySelectorAll('.options .links:nth-child(2) .purpleBtn');
    vueButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            vueButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            switch (btn.getAttribute("data-typechart")) {
                case "line":
                    chartType = 'line';
                    chartLigne();
                    break;
                case "candle":
                    chartType = 'candlestick';
                    chartBougie();
                    break;
            }
        });
    });

    const intervalButtons = document.querySelectorAll('.options .links:nth-child(1) .purpleBtn');
    intervalButtons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            intervalButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const label = btn.textContent.trim();
            switch (label) {
                case '24h': currentDays = 1; break;
                case '7j': currentDays = 7; break;
                case '1m': currentDays = 30; break;
                case '3m': currentDays = 90; break;
                case '1an': currentDays = 365; break;
            }

            fetchDataChart(currentDays);
        });
    });
});