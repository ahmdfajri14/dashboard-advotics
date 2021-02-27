export default {
    toCurrency(n) {
        if (isNaN(n)) {
            return n;
        }
        return `Rp ${n
            .toFixed(2)
            .replace(/\./g, ',')
            .replace(/\d(?=(\d{3})+,)/g, '$&,')}`;
    },
}