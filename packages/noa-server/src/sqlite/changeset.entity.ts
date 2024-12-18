import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('changeset')
export class Changeset {
  @PrimaryColumn({
    type: 'varchar',
    length: 26,
    comment: 'ulid主键',
  })
  id: string

  @Column({
    type: 'int',
    unsigned: true,
    comment: '快照版本',
  })
  rev: number

  @Column({
    type: 'int',
    unsigned: true,
    comment: '快照版本',
  })
  localRev: number

  @Column({
    type: 'int',
    unsigned: true,
    comment: '页面ID',
  })
  pageId: number

  @Column({
    type: 'int',
    unsigned: true,
    comment: '组件ID',
  })
  compId: number

  @Column({
    type: 'varchar',
    comment: '变更类型',
  })
  type: string

  @Column({
    type: 'blob',
    comment: '变更数据',
  })
  change: object

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
