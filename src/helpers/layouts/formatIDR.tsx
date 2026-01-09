export const formatIDR = (money: string): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(parseInt(money));
}

export const numberFormat = (value: string): string => {
    const number = String(value).replace(/[^0-9]/g, '');
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}