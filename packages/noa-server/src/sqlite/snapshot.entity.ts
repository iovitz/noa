import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('snapshot')
export class Snapshot {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    comment: '自增主键',
  })
  id: number

  @Column({
    type: 'int',
    unsigned: true,
    comment: '页面ID',
  })
  pageId: number

  @Column({
    type: 'int',
    unsigned: true,
    comment: '快照版本',
  })
  rev: number

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
