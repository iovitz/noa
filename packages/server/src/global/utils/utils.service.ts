import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  genId(prefix = '', digit = 10) {
    const str = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let id = prefix;
    for (let i = 0; i < digit - 1; i++) {
      const idx = Math.floor(Math.random() * 10);
      id += str[idx];
    }
    return id;
  }
}
