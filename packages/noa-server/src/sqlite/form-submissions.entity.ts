import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('form-submissions')
export class FormSubmissions {
  @PrimaryColumn({
    type: 'varchar',
    length: 30,
    comment: 'ulid主键',
  })
  id: string

  @PrimaryColumn({
    type: 'varchar',
    length: 30,
    comment: '对应的组件的ID',
  })
  widgetId: string

  @Column({
    type: 'varchar',
    length: 30,
    comment: '用户ID 或 文档ID，当为文档ID时，为所有人的权限',
  })
  data: string

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
