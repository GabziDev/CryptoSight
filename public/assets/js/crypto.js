import { formatCurrency, formatNumber, truncateText, handleEmptyText } from './utils.js';

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

    if (response.ok) {
        document.getElementById("cryptoImage").src = data.image.small;
        document.getElementById("cryptoNom").textContent = data.name;
        document.getElementById("cryptoSymbol").textContent = data.symbol;
        document.getElementById("cryptoPosition").textContent = "#" + data.market_cap_rank;
        document.getElementById("cryptoPrice").textContent = formatCurrency(data.market_data.current_price.usd);
        document.getElementById("cryptoGenesis").textContent = data.genesis_date;
        document.getElementById("cryptoCaptitalisation").textContent = formatCurrency(data.market_data.market_cap.usd);
        document.getElementById("cryptoCirculation").textContent = formatNumber(data.market_data.circulating_supply) + " " + data.symbol.toUpperCase();
        document.getElementById("cryptoDesc").textContent =
            data.description.fr || data.description.en || "Aucune description trouvée !";

        // Links
        function removeEmptyLinks() {
            const links = document.querySelectorAll('.link');
            links.forEach(link => {
                const anchor = link.querySelector('a');
                if (anchor.textContent == "Empty") {
                    link.parentNode.removeChild(link);
                }
            });
        }

        // Links
        const homepage = data.links.homepage[0] || "";
        document.getElementById("cryptoWebsite").textContent = handleEmptyText(homepage);
        document.getElementById("cryptoWebsite").href = homepage;

        const whitepaper = data.links.whitepaper || "";
        document.getElementById("cryptoWhitePaper").textContent = handleEmptyText(whitepaper);
        document.getElementById("cryptoWhitePaper").href = whitepaper;

        const facebookUsername = data.links.facebook_username || "";
        document.getElementById("cryptoFacebook").textContent = handleEmptyText(facebookUsername);
        document.getElementById("cryptoFacebook").href = `https://www.facebook.com/${facebookUsername}`;

        const twitterUsername = data.links.twitter_screen_name || "";
        document.getElementById("cryptoTwitter").textContent = handleEmptyText(twitterUsername);
        document.getElementById("cryptoTwitter").href = `https://x.com/${twitterUsername}`;

        const github = data.links.repos_url.github[0] || "";
        document.getElementById("cryptoGithub").textContent = handleEmptyText(github);
        document.getElementById("cryptoGithub").href = github;

        const telegramChannel = data.links.telegram_channel_identifier || "";
        document.getElementById("cryptoTelegram").textContent = handleEmptyText(telegramChannel);
        document.getElementById("cryptoTelegram").href = `https://t.me/${telegramChannel}`;

        removeEmptyLinks();

        document.getElementById("1hPer").textContent = data.market_data?.price_change_percentage_1h_in_currency?.usd != null ? data.market_data.price_change_percentage_1h_in_currency.usd.toFixed(2) + "%" : 'N/A';
        const price1h = data.market_data?.price_change_percentage_1h_in_currency?.usd >= 0 ? "Up" : "Down";
        document.getElementById("1hPerImage").src = `assets/svg/${price1h}.svg`;
        document.getElementById("1hPerPrice").classList.add("price" + price1h);

        document.getElementById("1hPer2").textContent = data.market_data?.price_change_percentage_1h_in_currency?.usd != null ? data.market_data.price_change_percentage_1h_in_currency.usd.toFixed(2) + "%" : 'N/A';
        document.getElementById("1hPerImage2").src = `assets/svg/${price1h}.svg`;
        document.getElementById("1hPerPrice2").classList.add("price" + price1h);

        document.getElementById("24hPer").textContent = data.market_data?.price_change_percentage_24h_in_currency?.usd != null ? data.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2) + "%" : 'N/A';
        const price24h = data.market_data?.price_change_percentage_24h_in_currency?.usd >= 0 ? "Up" : "Down";
        document.getElementById("24hPerImage").src = `assets/svg/${price24h}.svg`;
        document.getElementById("24hPerPrice").classList.add("price" + price24h);

        document.getElementById("7dPer").textContent = data.market_data?.price_change_percentage_7d_in_currency?.usd != null ? data.market_data.price_change_percentage_7d_in_currency.usd.toFixed(2) + "%" : 'N/A';
        const price7j = data.market_data?.price_change_percentage_7d_in_currency?.usd >= 0 ? "Up" : "Down";
        document.getElementById("7dPerImage").src = `assets/svg/${price7j}.svg`;
        document.getElementById("7dPerPrice").classList.add("price" + price7j);
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
            datasets: [{
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