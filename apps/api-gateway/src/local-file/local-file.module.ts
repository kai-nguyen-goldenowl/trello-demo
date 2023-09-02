import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LocalFileController } from './local-file.controller';
import { LocalFileService } from './local-file.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOCAL_FILE_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway-local-file',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'local-file-consumer-group'
          }
        }
      }
    ])
  ],
  controllers: [LocalFileController],
  providers: [LocalFileService],
})
export class LocalFileModule {}
