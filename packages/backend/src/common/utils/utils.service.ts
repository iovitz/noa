import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  genNumberString(digit: number) {
    const str = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let res = '';
    for (let i = 0, len = str.length; i < digit; i++) {
      const id = Math.floor(Math.random() * len);
      Date.now();
      res += str[id];
    }
    return res;
  }
}
