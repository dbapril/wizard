export interface IConnectingStep {
  title: String,
  variants: Array<IVariant>
}

export interface IVariant {
  color: String,
  description: String,
  options: Array<IOption>,
  price_default: Number,
  select: Array<any>,
  title: String
}

interface IOption {
  title: String,
  price: Number
}