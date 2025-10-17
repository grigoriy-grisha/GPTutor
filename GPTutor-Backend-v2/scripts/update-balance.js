const readline = require('readline');

const API_BASE_URL = 'http://localhost:3001';
const ADMIN_SECRET_KEY = '123';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function updateBalance(userId, newBalance) {
  try {
    console.log(`\n🔄 Обновление баланса пользователя ${userId}...`);
    console.log(`   Новый баланс: ${newBalance}₽`);

    const response = await fetch(`${API_BASE_URL}/admin/update-balance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret-key': ADMIN_SECRET_KEY,
      },
      body: JSON.stringify({
        userId: userId,
        newBalance: newBalance,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    console.log('\n✅ Баланс успешно обновлен!');
    console.log('📊 Данные пользователя:');
    console.log(`   ID: ${data.user.id}`);
    console.log(`   Баланс: ${data.user.balance}₽`);
    console.log(`   Обновлено: ${new Date(data.user.updatedAt).toLocaleString('ru-RU')}`);
    console.log('');

    return data;
  } catch (error) {
    console.error('\n❌ Ошибка обновления баланса:', error.message);
    console.error('');
    throw error;
  }
}

async function main() {
  console.log('='.repeat(50));
  console.log('🔧 Скрипт изменения баланса пользователя');
  console.log('='.repeat(50));
  console.log('');

  try {
    const userIdInput = await question(`👤 Введите ID пользователя: `);
    const userId = userIdInput.trim();

    const newBalanceStr = await question('💰 Введите новый баланс (₽): ');
    const newBalance = parseFloat(newBalanceStr);

    if (isNaN(newBalance) || newBalance < 0) {
      console.error('❌ Ошибка: Баланс должен быть положительным числом');
      rl.close();
      process.exit(1);
    }

    console.log('\n📋 Проверьте данные:');
    console.log(`   User ID / VK ID: ${userId}`);
    console.log(`   Новый баланс: ${newBalance}₽`);
    console.log('');

    const confirm = await question('✅ Продолжить? (y/n): ');

    if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
      console.log('\n❌ Отменено пользователем');
      rl.close();
      process.exit(0);
    }

    await updateBalance(userId, newBalance);

  } catch (error) {
    console.error('❌ Произошла ошибка:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  main();
}

module.exports = { updateBalance };
