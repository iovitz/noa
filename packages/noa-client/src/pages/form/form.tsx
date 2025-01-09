import { ioClient } from '@/shared/io/io'
import { FormEditor } from 'noa-form-editor'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function Form() {
  const fileId = useParams().fileId as string
  return (
    <FormEditor fileId={fileId} io={ioClient} needWatch />
  )
}
