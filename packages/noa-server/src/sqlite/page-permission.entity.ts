import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('page-permission')
export class PageAccessPermission {
  @PrimaryColumn({
    type: 'varchar',
    length: 26,
    comment: 'ulid主键',
  })
  id: string

  @Column({
    type: 'varchar',
    length: 26,
    comment: '用户ID 或 文档ID，当为文档ID时，为所有人的权限',
  })
  userId: string

  @Column({
    type: 'varchar',
    length: 26,
    comment: '页面ID',
  })
  pageId: string

  @Column({
    type: 'integer',
    comment: '权限名称',
  })
  permission: number

  @Column({
    type: 'varchar',
    length: 100,
    comment: '权限名称',
    nullable: true,
  })
  description: string

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
