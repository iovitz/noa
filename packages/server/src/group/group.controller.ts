import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateGroupDTO, SearchGroupDTO } from './group.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post('/create')
  async createGroup(
    @Body() body: CreateGroupDTO,
    @Request() req: ExpressRequest,
  ) {
    const { name } = body;
    const res = await this.groupService.createGroup(name, req.userid);
    return res[0];
  }

  @Post('/search')
  async searchGroup(@Body() { contains, page = 1, take = 10 }: SearchGroupDTO) {
    if (!contains) return [];
    return this.groupService.findGroup(
      {
        OR: [
          {
            groupid: {
              contains,
            },
          },
          {
            name: {
              contains,
            },
          },
        ],
      },
      page,
      take,
    );
  }
}
