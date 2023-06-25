import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateEventDto) {
    await this.prisma.event.create({
      data,
    });
  }

  findAll() {
    return this.prisma.event.findMany();
  }

  findOne(id: number) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateEventDto) {
    return this.prisma.event.update({ data, where: { id } });
  }

  remove(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }
}
