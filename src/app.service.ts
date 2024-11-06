import { Injectable } from '@nestjs/common';

const data = [{id:101,softwareName:"Schoollog"},{id:102,softwareName:"hostellog"},{id:103,softwareName:"coachinglog"},{id:101,softwareName:"charitism"}]

@Injectable()
export class AppService {
  getHello(){
    return 'Hello World!';
  }
  getSoftware(){
    return data
  }
}
