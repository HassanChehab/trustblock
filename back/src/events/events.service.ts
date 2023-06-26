import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateEventDto) {
    await this.prisma.event.create({
      data,
    });
  }

  async findAll() {
    const events = await this.prisma.event.findMany();

    // format Events to match mocked data

    return events.map((event) => {
      return {
        id: event.id,
        title: event.title,
        image: event.image,
        category: event.category,
        location: event.location,
        description: event.description,
        date:
          dayjs(event.date, 'DD/MM/YYYY').toDate() ||
          dayjs(event.date, 'DD-MM-YYYY').toDate(),
        author: {
          name: 'John Doe',
          email: event.authorId,
        },
      };
    });
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
