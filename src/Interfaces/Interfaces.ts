export interface TypoProps {
  xs: "none" | "flex";
  md: "none" | "flex";
  flex: { flexGrow: number };
}

export interface ContextTypes {
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PartProps<T> {
  part: {
    _id: T;
    name: T;
    img: T;
    description: T;
    minimumOrderQuantity: number;
    availableQuantity: number;
    price: number;
  };
}

export interface PartTypes<T> {
  _id: T;
  name: T;
  img: T;
  description: T;
  minimumOrderQuantity: number;
  availableQuantity: number;
  price: number;
  email?: T;
  role?: T;
}

export interface OrderTypes<T> {
  _id: T;
  name: T;
  email: T;
  address: T;
  phone: T;
  toolName: T;
  quantity: number;
  paid?: boolean;
  status?: T;
}

export interface RowTypes<T> {
  row: {
    _id: T;
    name: T;
    email?: T;
    address?: T;
    phone?: T;
    toolName?: T;
    quantity?: number;
    paid?: boolean;
    status?: T;
    img?: T;
    description?: T;
    minimumOrderQuantity?: number;
    availableQuantity?: number;
    price?: number;
  };
  tableData: OrderTypes<T>[];
  setTableData: any;
}

export interface LocationState {
  from: {
    pathname: string;
  };
}
