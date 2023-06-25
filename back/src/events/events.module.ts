import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { PrismaService } from '../prisma.service';
import { EventsController } from './events.controller';

@Module({
  controllers: [EventsController],
  providers: [EventsService, PrismaService],
})
export class EventsModule {}
