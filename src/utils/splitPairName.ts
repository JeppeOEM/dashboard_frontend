export function splitPairName(pair: string): string {
    const parts = pair.split('USDT');
    return parts.join('/USDT');
  }