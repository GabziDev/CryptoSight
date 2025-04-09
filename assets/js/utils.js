const formatCurrency = (amount) => "$" + amount.toLocaleString();
const formatNumber = (num) => num >= 1_000_000 ? (num / 1_000_000).toFixed(2) + "M" : num >= 1_000 ? (num / 1_000).toFixed(2) + "K" : num;

export { formatCurrency, formatNumber }