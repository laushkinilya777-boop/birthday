import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { formatCategory } from '../lib/categories';

const prisma = new PrismaClient();

async function main() {
  await prisma.notification.deleteMany();
  await prisma.message.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.application.deleteMany();
  await prisma.orderImage.deleteMany();
  await prisma.review.deleteMany();
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('password', 10);

  const users = await Promise.all([
    prisma.user.create({ data: { name: 'Алексей', email: 'alex@example.com', passwordHash, city: 'Караганда' } }),
    prisma.user.create({ data: { name: 'Ольга', email: 'olga@example.com', passwordHash, city: 'Караганда' } }),
    prisma.user.create({ data: { name: 'Сергей', email: 'sergey@example.com', passwordHash, city: 'Караганда' } }),
    prisma.user.create({ data: { name: 'Мария', email: 'maria@example.com', passwordHash, city: 'Караганда' } }),
    prisma.user.create({ data: { name: 'Ирина', email: 'irina@example.com', passwordHash, city: 'Караганда' } }),
  ]);

  const orders = await Promise.all([
    prisma.order.create({ data: { title: 'Вынести 5 шкафов', description: 'Нужно вынести 5 шкафов из квартиры. 4 этаж, лифта нет.', category: formatCategory('movers', 'moving'), price: 25000, workersNeeded: 2, city: 'Караганда', authorId: users[0].id } }),
    prisma.order.create({ data: { title: 'Разгрузить газель', description: 'Разгрузка газели на складе', category: formatCategory('movers', 'unloading'), price: 12000, workersNeeded: 2, city: 'Караганда', authorId: users[1].id } }),
    prisma.order.create({ data: { title: 'Собрать шкаф', description: 'Собрать мебель из комплекта', category: formatCategory('home-help', 'assembly'), price: 8000, workersNeeded: 1, city: 'Караганда', authorId: users[2].id } }),
    prisma.order.create({ data: { title: 'Покосить траву', description: 'Покосить газон на участке', category: formatCategory('garden', 'lawn'), price: 12000, workersNeeded: 1, city: 'Караганда', authorId: users[3].id } }),
    prisma.order.create({ data: { title: 'Маникюр на дому', description: 'Нужен маникюр с покрытием гель-лак', category: formatCategory('beauty', 'home-manicure'), price: 8000, workersNeeded: 1, city: 'Караганда', authorId: users[4].id } }),
  ]);

  // applications
  await prisma.application.create({ data: { message: 'Могу помочь, есть машина', orderId: orders[0].id, userId: users[1].id } });
  await prisma.application.create({ data: { message: 'Готов приехать сегодня', orderId: orders[1].id, userId: users[2].id } });

  console.log('Seed finished');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
