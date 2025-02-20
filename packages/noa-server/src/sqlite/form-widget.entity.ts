import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('form-widget')
export class FormWidgets {
  @PrimaryColumn({
    type: 'varchar',
    length: 30,
    comment: 'ulid主键',
  })
  id: string

  @Column({
    type: 'varchar',
    length: 30,
  })
  fileId: string

  @Column({
    type: 'boolean',
    comment: '组件是否被删除',
    default: false,
  })
  deleted: boolean

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
