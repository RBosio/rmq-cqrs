import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  handle(val: { message: string; status: number }) {
    if (val.status === HttpStatus.CONFLICT) {
      throw new ConflictException(val.message);
    }

    if (val.status === HttpStatus.UNAUTHORIZED) {
      throw new UnauthorizedException(val.message);
    }

    if (val.status === HttpStatus.NOT_FOUND) {
      throw new NotFoundException(val.message);
    }
  }
}
