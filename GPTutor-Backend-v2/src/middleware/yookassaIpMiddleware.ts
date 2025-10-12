import { FastifyRequest, FastifyReply } from 'fastify';
import { logger } from '../services/LoggerService';

// Список разрешенных IP адресов ЮКассы
const YOOKASSA_IPS = [
  '185.71.76.0/27',
  '185.71.77.0/27',
  '77.75.153.0/25',
  '77.75.156.11/32',
  '77.75.156.35/32',
  '77.75.154.128/25',
  '2a02:5180::/32',
];

// Функция для проверки IP в CIDR диапазоне
function ipInCIDR(ip: string, cidr: string): boolean {
  // IPv6 проверка
  if (ip.includes(':') && cidr.includes(':')) {
    return checkIPv6InRange(ip, cidr);
  }
  
  // IPv4 проверка
  if (!cidr.includes('/')) {
    return ip === cidr;
  }

  const [range, bits] = cidr.split('/');
  const mask = ~(2 ** (32 - parseInt(bits)) - 1);
  
  const ipInt = ipToInt(ip);
  const rangeInt = ipToInt(range);
  
  return (ipInt & mask) === (rangeInt & mask);
}

function ipToInt(ip: string): number {
  return ip.split('.').reduce((int, oct) => (int << 8) + parseInt(oct), 0) >>> 0;
}

function checkIPv6InRange(ip: string, cidr: string): boolean {
  // Простая проверка IPv6 по префиксу
  const [prefix] = cidr.split('/');
  return ip.toLowerCase().startsWith(prefix.toLowerCase());
}

export function yookassaIpCheck(request: FastifyRequest, reply: FastifyReply, done: Function) {
  const clientIp = request.ip || request.headers['x-real-ip'] || request.headers['x-forwarded-for'];
  const ip = Array.isArray(clientIp) ? clientIp[0] : clientIp;

  logger.info('Checking IP for YooKassa webhook', { ip });

  // Проверяем IP в списке разрешенных
  const isAllowed = YOOKASSA_IPS.some(allowedIp => {
    try {
      return ipInCIDR(String(ip), allowedIp);
    } catch (error) {
      logger.error('Error checking IP', error, { ip, allowedIp });
      return false;
    }
  });

  if (!isAllowed) {
    logger.warn('Unauthorized webhook request from IP', { ip });
    reply.code(403).send({ error: 'Forbidden - Invalid IP address' });
    return;
  }

  done();
}

