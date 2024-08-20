import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuService {
    constructor(private prisma: PrismaService) {}
    
    findAll() {
        return this.prisma.menu.findMany({
            include: {
                cafe: {
                    select: { name: true },
                },
              },
        });
    }

    findOne(id: number) {
        return this.prisma.menu.findUnique({
            where: { id },
            include: {
                cafe: {
                    select: { name: true },
                },
              },
        });
    }

    create(data: any) {
        return this.prisma.menu.create({
            data,
        });
    }

    update(id: number, data: any) {
        return this.prisma.menu.update({
            where: { id },
            data,
        });
    }

    destroy(id: number) {
        return this.prisma.menu.delete({
            where: { id },
        });
    }
}
