const formatCurrency = (amount) => "$" + amount.toLocaleString();
const formatNumber = (num) => num >= 1_000_000 ? (num / 1_000_000).toFixed(2) + "M" : num >= 1_000 ? (num / 1_000).toFixed(2) + "K" : num;
const truncateText = (text, max) => text.length > max ? text.substring(0, max) + '...' : text;
const handleEmptyText = (text) => text && text.trim() !== "" ? truncateText(text, 22) : "Empty";

export { formatCurrency, formatNumber, truncateText, handleEmptyText }