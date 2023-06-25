import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
      EventsModule,
       ServeStaticModule.forRoot({
           rootPath: join(__dirname, '..', 'public'),
       }),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
