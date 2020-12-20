export interface IConnectingStep {
  title: string,
  variants: Array<IVariant>
}

export interface IVariant {
  color: string,
  description: string,
  options: Array<IOption>,
  price_default: number,
  select: Array<ISelectItem>,
  title: string
}

export interface IOption {
  title: string,
  price: number
}

interface ISelectItem {
  title: string,
  items: Array<IOption>
}