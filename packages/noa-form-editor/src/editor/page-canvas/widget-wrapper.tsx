import { useWidgetStore } from '@/store/widgets/widget.store'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const WidgetWrapper = observer((props: { id: string }) => {
  const widgetStore = useWidgetStore()
  const handleSelectWidget = () => {
    widgetStore.handleSelectWidget(props.id)
  }
  return (
    <div onClick={handleSelectWidget}>
      {props.id}
    </div>
  )
})
