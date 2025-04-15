import { formatCurrency, formatNumber } from './utils.js';

const tbody = document.querySelector("table tbody");
const paginationContainer = document.getElementById("pagination");
const url = new URL("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=1&x_cg_demo_api_key=CG-Fbk1zYKeAXcSxq7VcAxusyVE");
const itemsPerPage = 12;
let currentPage = 1;
let data = [];
let filteredData = []; 

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (e) => {
    const searchQuery = e.target.value.toLowerCase();
    filteredData = data.filter(coin => 
        coin.name.toLowerCase().includes(searchQuery) ||
        coin.symbol.toLowerCase().includes(searchQuery)
    );
    currentPage = 1;
    renderTable();
    renderPagination();
});

const fetchData = async () => {
    let response = await fetch(url);
    data = await response.json();
    filteredData = [...data];
    renderTable();
    renderPagination();
}

const renderTable = () => {
    tbody.innerHTML = "";
    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedData = filteredData.slice(start, end); 

    paginatedData.forEach((coin, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <button class="heartBtn">
                    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.08731 7.24264L7 14L12.9127 7.24264C13.6089 6.44699 14 5.36786 14 4.24264V4.05234C14 1.8143 12.4125 0 10.4542 0C9.37702 0 8.35829 0.55959 7.6854 1.52086L7 2.5L6.3146 1.52086C5.64171 0.55959 4.62296 0 3.5458 0C1.58751 0 0 1.8143 0 4.05234V4.24264C0 5.36786 0.391116 6.44699 1.08731 7.24264Z" />
                    </svg>
                </button>
            </td>
            <td>${start + index + 1}</td>
            <td>
                <div class="name">
                    <img src="${coin.image}" alt="${coin.name} logo">
                    <span class="name">${coin.name.length > 10 ? coin.name.slice(0, 10) + "..." : coin.name.toUpperCase()}</span>
                    <span class="symbole">${coin.symbol.toUpperCase()}</span>
                </div>
            </td>
            <td>$${coin.current_price}</td>
            <td>
                <div class="${coin.price_change_percentage_24h != null && coin.price_change_percentage_24h >= 0 ? 'priceUp' : 'priceDown'}">
                    <img src="assets/svg/${coin.price_change_percentage_24h != null && coin.price_change_percentage_24h >= 0 ? 'Up' : 'Down'}.svg" alt="${coin.price_change_percentage_24h != null && coin.price_change_percentage_24h >= 0 ? 'Hausse' : 'Baisse'} de prix">
                    ${coin.price_change_percentage_24h != null ? coin.price_change_percentage_24h.toFixed(2) : 'N/A'}%
                </div>
            </td>
            <td>${formatCurrency(coin.market_cap)}</td>
            <td>${formatNumber(coin.circulating_supply) + " " + coin.symbol.toUpperCase()}</td>
        `;
        tr.addEventListener("click", e => {
            location.href = "view.html?coin=" + coin.id;
        });
        tbody.appendChild(tr);
    });
    updateFooter();
};

const updateFooter = () => {
    document.querySelector(".footer #totalcrypto").textContent = filteredData.length;  // Mettre à jour le nombre total de résultats filtrés
    document.querySelector(".footer p #first").textContent = (currentPage - 1) * itemsPerPage + 1;
    document.querySelector(".footer p #last").textContent = Math.min(currentPage * itemsPerPage, filteredData.length);
};

const renderPagination = () => {
    paginationContainer.innerHTML = "";
    let totalPages = Math.ceil(filteredData.length / itemsPerPage);  // Calculer les pages en fonction des résultats filtrés
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    // Bouton gauche
    let leftBtn = document.createElement("button");
    leftBtn.innerHTML = "<";
    leftBtn.id = "left";
    leftBtn.classList.add("grayBtn");
    leftBtn.addEventListener("click", () => changePage(currentPage - 1));
    paginationContainer.appendChild(leftBtn);

    // 5 boutons du milieu
    for (let i = startPage; i <= endPage; i++) {
        let btn = document.createElement("button");
        btn.textContent = i;
        btn.classList.add("grayBtn");
        if (i === currentPage) btn.classList.add("active");
        btn.addEventListener("click", () => changePage(i));
        paginationContainer.appendChild(btn);
    }

    // Bouton droit
    let rightBtn = document.createElement("button");
    rightBtn.innerHTML = ">";
    rightBtn.id = "right";
    rightBtn.classList.add("grayBtn");
    rightBtn.addEventListener("click", () => changePage(currentPage + 1));
    paginationContainer.appendChild(rightBtn);
};

const changePage = (page) => {
    let totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderTable();
        renderPagination();
    }
};

document.addEventListener("DOMContentLoaded", fetchData);