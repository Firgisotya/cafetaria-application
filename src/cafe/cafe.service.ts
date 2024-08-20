import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CafeService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.cafe.findMany({
      include: {
        owner: {
          select: { fullname: true },
        },
        manager: {
          select: { fullname: true },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.cafe.findUnique({
      where: { id },
      include: {
        owner: {
          select: { fullname: true },
        },
        manager: {
          select: { fullname: true },
        },
      },
    });
  }

  create(data: any) {
    return this.prisma.cafe.create({
      data,
    });
  }

  update(id: number, data: any) {
    return this.prisma.cafe.update({
      where: { id },
      data,
    });
  }

  destroy(id: number) {
    return this.prisma.cafe.delete({
      where: { id },
    });
  }
}
