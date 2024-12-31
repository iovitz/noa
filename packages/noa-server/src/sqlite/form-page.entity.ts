import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('form-page')
export class FormPage {
  @PrimaryColumn({
    type: 'varchar',
    length: 26,
    comment: 'ulid主键',
  })
  id: string

  @Column({
    type: 'int',
    unsigned: true,
    comment: '页面版本',
    default: 0,
  })
  rev: number

  @Column({
    type: 'varchar',
    comment: '所属用户的ID',
  })
  ownerId: string

  @Column({
    type: 'boolean',
    comment: '页面是否分享',
    default: false,
  })
  shared: boolean

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
