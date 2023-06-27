import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma.service';
import { DataFormatter } from '../utils/data-formatter';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dataFormatter: DataFormatter,
  ) {}
  async create(data: CreateEventDto) {
    this.dataFormatter.formatBeforeCreationOrUpdate(data);

    await this.prisma.event.create({
      data,
    });
  }

  async findAll() {
    const events = await this.prisma.event.findMany();

    // format Events to match mocked data
    return this.dataFormatter.formatForClient(events);
  }

  async findBySearch(search: string) {
    const events = await this.prisma.event.findMany({
      where: {
        OR: [
          { title: { contains: search.toLowerCase() } },
          { category: { contains: search.toLowerCase() } },
          { location: { contains: search.toLowerCase() } },
          { authorId: { contains: search.toLowerCase() } },
          { description: { contains: search.toLowerCase() } },
        ],
      },
    });

    // format Events to match mocked data
    return this.dataFormatter.formatForClient(events);
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
