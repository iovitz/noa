import { WidgetTypes } from '@/widgets'
import { FormTextWidget } from './form-text-widget/form-text-widget'
import { FormTitleWidget } from './form-title-widget/form-title-widget'

export const WidgetUIMap: Record<WidgetTypes, typeof FormTitleWidget> = {
  [WidgetTypes.Title]: FormTitleWidget,
  [WidgetTypes.Text]: FormTextWidget,
  [WidgetTypes.RichText]: FormTitleWidget,
  [WidgetTypes.Image]: FormTitleWidget,
  [WidgetTypes.Video]: FormTitleWidget,
  [WidgetTypes.Notice]: FormTitleWidget,
  [WidgetTypes.List]: FormTitleWidget,
  [WidgetTypes.Chart]: FormTitleWidget,
  [WidgetTypes.Line]: FormTitleWidget,
  [WidgetTypes.Input]: FormTitleWidget,
  [WidgetTypes.Number]: FormTitleWidget,
  [WidgetTypes.Date]: FormTitleWidget,
  [WidgetTypes.SingleSelect]: FormTitleWidget,
  [WidgetTypes.MultiSelect]: FormTitleWidget,
  [WidgetTypes.Checkbox]: FormTitleWidget,
  [WidgetTypes.Star]: FormTitleWidget,
  [WidgetTypes.Phone]: FormTitleWidget,
  [WidgetTypes.Position]: FormTitleWidget,
  [WidgetTypes.Progress]: FormTitleWidget,
  [WidgetTypes.Money]: FormTitleWidget,
  [WidgetTypes.File]: FormTitleWidget,
} as const
