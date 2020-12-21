export interface IConnectingStep {
  title: string,
  variants: Array<IVariant>
}

export interface IConnectingStepForChoose extends IConnectingStep {
  stepId: number
}

export interface IVariant {
  color: string,
  description: string,
  options: Array<IOption>,
  price_default: number,
  select: Array<ISelectItem>,
  title: string
}

export interface IVariantForChoose extends IVariant {
  id: number,
  isChosen: boolean,
  totalPrice: number,
  stepId: number
}

export interface IOption {
  title: string,
  price: number
}

interface ISelectItem {
  title: string,
  items: Array<IOption>
}