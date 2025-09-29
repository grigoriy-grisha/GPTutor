#!/usr/bin/env node

/**
 * Скрипт для тестирования rate limiting
 * Использование: node scripts/test-rate-limits.js [endpoint] [requests]
 */

const http = require('http');

const ENDPOINTS = {
  health: 'http://localhost:3001/health',
  models: 'http://localhost:3001/v1/models',
  // Добавьте другие эндпоинты по необходимости
};

const DEFAULT_REQUESTS = 10;
const DEFAULT_DELAY = 100; // миллисекунды между запросами

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const req = http.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const duration = Date.now() - startTime;
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data,
          duration: duration,
          rateLimitRemaining: res.headers['x-ratelimit-remaining'],
          rateLimitLimit: res.headers['x-ratelimit-limit'],
          rateLimitReset: res.headers['x-ratelimit-reset']
        });
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function testRateLimit(endpoint, numRequests = DEFAULT_REQUESTS, delay = DEFAULT_DELAY) {
  console.log(`\n🧪 Тестирование rate limiting для ${endpoint}`);
  console.log(`📊 Отправка ${numRequests} запросов с задержкой ${delay}ms между запросами\n`);
  
  const results = [];
  const startTime = Date.now();
  
  for (let i = 0; i < numRequests; i++) {
    try {
      const result = await makeRequest(endpoint);
      results.push(result);
      
      const status = result.statusCode === 200 ? '✅' : 
                    result.statusCode === 429 ? '🚫' : '❌';
      
      console.log(`${status} Запрос ${i + 1}: ${result.statusCode} (${result.duration}ms)`);
      
      if (result.rateLimitRemaining !== undefined) {
        console.log(`   Rate Limit: ${result.rateLimitRemaining}/${result.rateLimitLimit} (reset: ${new Date(result.rateLimitReset * 1000).toLocaleTimeString()})`);
      }
      
      if (result.statusCode === 429) {
        console.log(`   ⚠️  Rate limit exceeded! Response: ${result.data}`);
      }
      
    } catch (error) {
      console.log(`❌ Запрос ${i + 1}: Ошибка - ${error.message}`);
      results.push({ error: error.message, statusCode: 0 });
    }
    
    if (i < numRequests - 1) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  const totalTime = Date.now() - startTime;
  const successfulRequests = results.filter(r => r.statusCode === 200).length;
  const rateLimitedRequests = results.filter(r => r.statusCode === 429).length;
  const errorRequests = results.filter(r => r.statusCode === 0).length;
  
  console.log(`\n📈 Результаты тестирования:`);
  console.log(`   ✅ Успешных запросов: ${successfulRequests}`);
  console.log(`   🚫 Rate limited: ${rateLimitedRequests}`);
  console.log(`   ❌ Ошибок: ${errorRequests}`);
  console.log(`   ⏱️  Общее время: ${totalTime}ms`);
  console.log(`   📊 Среднее время запроса: ${Math.round(totalTime / numRequests)}ms`);
  
  if (rateLimitedRequests > 0) {
    console.log(`\n🎯 Rate limiting работает! Заблокировано ${rateLimitedRequests} запросов.`);
  } else {
    console.log(`\n⚠️  Rate limiting не сработал. Возможно, лимиты слишком высокие или сервер не запущен.`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const endpointName = args[0] || 'health';
  const numRequests = parseInt(args[1]) || DEFAULT_REQUESTS;
  const delay = parseInt(args[2]) || DEFAULT_DELAY;
  
  if (!ENDPOINTS[endpointName]) {
    console.log(`❌ Неизвестный эндпоинт: ${endpointName}`);
    console.log(`Доступные эндпоинты: ${Object.keys(ENDPOINTS).join(', ')}`);
    process.exit(1);
  }
  
  console.log('🚀 Запуск тестирования rate limiting...');
  console.log(`Сервер: ${ENDPOINTS[endpointName]}`);
  
  try {
    await testRateLimit(ENDPOINTS[endpointName], numRequests, delay);
  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { testRateLimit, makeRequest };

