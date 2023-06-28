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

  async findAll(skip: number, take: number) {
    const events =
      isNaN(skip) || isNaN(take)
        ? await this.prisma.event.findMany()
        : await this.prisma.event.findMany({
            skip,
            take,
          });

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

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    const formattedData = this.dataFormatter.formatForClient([event]);

    if (formattedData.length) return formattedData[0];
    return {};
  }

  async update(id: number, data: CreateEventDto) {
    const rest = await this.prisma.event.update({
      where: { id },
      data: { ...data },
    });
  }

  remove(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }
}
