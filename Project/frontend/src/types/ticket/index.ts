export type Ticket = {
  id: number;
  seat: number;
  row: string;
  price: number;
  is_sold: boolean;
  is_vip: boolean;
  is_imax: boolean;
  last_reserved?: string;
};
