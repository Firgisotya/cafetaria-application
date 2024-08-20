import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    findAll() {
        return this.prisma.user.findMany();
    }

    findOne(id: number) {
        // tampilkan tanpa password
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                fullname: true,
                role: true,
            },
        });
    }

    create(data: any) {
        return this.prisma.user.create({
            data,
        });
    }

    update(id: number, data: any) {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    destroy (id: number) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}
