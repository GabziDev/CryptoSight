const formatCurrency = (amount) => "$" + amount.toLocaleString();
const formatNumber = (num) => num >= 1_000_000 ? (num / 1_000_000).toFixed(2) + "M" : num >= 1_000 ? (num / 1_000).toFixed(2) + "K" : num;
const truncateText = (text) => text.length > 10 ? text.substring(0, 10) + '...' : text;

export { formatCurrency, formatNumber, truncateText }