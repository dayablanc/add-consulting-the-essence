export type Lang = 'es' | 'en';
export type Currency = 'CRC' | 'USD';

// TODO: conectar a API de tipo de cambio BCCR
export const EXCHANGE_RATE = 520; // 1 USD = 520 CRC

export const formatPrice = (amountUSD: number, currency: Currency): string => {
  if (currency === 'USD') {
    return `$${amountUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  const amountCRC = Math.round(amountUSD * EXCHANGE_RATE);
  return `₡${amountCRC.toLocaleString('es-CR').replace(/,/g, '.')}`;
};

// Format a price natively in CRC (when source price is in colones, no conversion).
export const formatPriceCRC = (amountCRC: number, currency: Currency): string => {
  if (currency === 'USD') {
    const usd = amountCRC / EXCHANGE_RATE;
    return `$${usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `₡${amountCRC.toLocaleString('es-CR').replace(/,/g, '.')}`;
};
