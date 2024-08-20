import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prismaClient = new PrismaClient();

const main = async () => {
    const users: Prisma.UserCreateManyArgs = {
        data: [
            {
                username: 'superadmin',
                fullname: 'Super Admin',
                password: await bcrypt.hash('password', 10),
                role: 'SUPERADMIN'
            },
            {
                username: 'manager',
                fullname: 'Manager',
                password: await bcrypt.hash('password', 10),
                role: 'MANAGER'
            },
            {
                username: 'owner',
                fullname: 'Owner',
                password: await bcrypt.hash('password', 10),
                role: 'OWNER'
            },
            {
                username: 'firgi',
                fullname: 'Firgi',
                password: await bcrypt.hash('password', 10),
                role: 'OWNER'
            },
            {
                username: 'sotya',
                fullname: 'Sotya',
                password: await bcrypt.hash('password', 10),
                role: 'OWNER'
            },
            {
                username: 'izzuddin',
                fullname: 'Izzuddin',
                password: await bcrypt.hash('password', 10),
                role: 'OWNER'
            },
            {
                username: 'arcelio',
                fullname: 'Arcelio',
                password: await bcrypt.hash('password', 10),
                role: 'MANAGER'
            },
            {
                username: 'raskha',
                fullname: 'Raskha',
                password: await bcrypt.hash('password', 10),
                role: 'MANAGER'
            },
            {
                username: 'aldrich',
                fullname: 'aldrich',
                password: await bcrypt.hash('password', 10),
                role: 'MANAGER'
            },
            // {
            //     username: 'kenzie',
            //     fullname: 'kenzie',
            //     password: await bcrypt.hash('password', 10),
            //     role: 'USER'
            // },

        ],
        skipDuplicates: true,
    }
    
    const cafes: Prisma.CafeCreateManyArgs = {
        data: [
            {
                name: 'Cafe 1',
                address: 'Address 1',
                phoneNumber: '1234567890',
                ownerId: 1,
                managerId: 1
            },
            {
                name: 'Cafe 2',
                address: 'Address 2',
                phoneNumber: '1234567890',
                ownerId: 2,
                managerId: 2
            },
            {
                name: 'Cafe 3',
                address: 'Address 3',
                phoneNumber: '1234567890',
                ownerId: 1,
                managerId: 1
            },
        ]
    }

    const menus: Prisma.MenuCreateManyArgs = {
        data: [
            {
                name: 'Menu 1',
                price: 10000,
                cafeId: 1,
                isRecommendation: true
            },
            {
                name: 'Menu 2',
                price: 20000,
                cafeId: 1,
                isRecommendation: false
            },
            {
                name: 'Menu 3',
                price: 30000,
                cafeId: 2,
                isRecommendation: true
            },
            {
                name: 'Menu 4',
                price: 40000,
                cafeId: 2,
                isRecommendation: false
            },
            {
                name: 'Menu 5',
                price: 50000,
                cafeId: 3,
                isRecommendation: true
            },
            {
                name: 'Menu 6',
                price: 60000,
                cafeId: 3,
                isRecommendation: false
            },
        ]
    }

    await prismaClient.user.createMany(users);
    await prismaClient.cafe.createMany(cafes);
    await prismaClient.menu.createMany(menus);

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });