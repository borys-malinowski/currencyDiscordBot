type CoinGecko = {
    rates: {
        [key: string]: {
            name: string;
            unit: string;
            value: number;
            type: string;
        },
    }
};
export default CoinGecko;