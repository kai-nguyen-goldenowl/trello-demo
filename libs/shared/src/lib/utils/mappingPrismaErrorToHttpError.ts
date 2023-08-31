import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { Prisma } from "@prisma/client";

export const MappingPrismaErrorToHttpError = (err: Prisma.PrismaClientKnownRequestError) => {
  switch(err.code){
    case 'P2002':
      // handling duplicate key errors
      return new BadRequestException(`Duplicate field value: ${err.message}`);
    case 'P2014':
        // handling invalid id errors
        return new BadRequestException(`Invalid ID: ${err.message}`);
    case 'P2003':
        // handling invalid data errors
        return new BadRequestException(`Invalid input data: ${err.message}`);
    default:
      // handling all other errors
      return new InternalServerErrorException(`Something went wrong: ${err.message}`);
  }
}
