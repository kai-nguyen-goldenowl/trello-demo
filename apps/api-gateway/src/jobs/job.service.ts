import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class JobService {
  constructor(@Inject('TODO_MICROSERVICE') private readonly clientKafka: ClientKafka){ }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  autoCheckDoneTodoJobs(){
    const currentDate = new Date().toISOString().slice(0,10);
    console.log(currentDate)
    this.clientKafka.emit('todos.auto_check_done', { date: currentDate })
  }
}
