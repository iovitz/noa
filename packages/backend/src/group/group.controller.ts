import { Body, Controller, Post } from '@nestjs/common';
import { CreateGroupDTO } from './group.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post('/create')
  async createGroup(@Body() body: CreateGroupDTO) {
    const { name } = body;
    const res = await this.groupService.createGroup(name);
    return res;
  }
}
