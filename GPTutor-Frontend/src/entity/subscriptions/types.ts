export type Subscription = {
  active: boolean;
  lastUpdated: string;
  subscriptionId: string;
  error: string;
  expire: string;
};

export interface OrderSubscriptionItem {
  create_time: number;
  id: number;
  item_id: string;
  period: number;
  period_start_time: number;
  price: number;
  status: string;
  update_time: number;
  next_bill_time: number;
  expire_time: number;
  title: string;
  app_id: number;
  application_name: string;
  photo_url: string;
  pending_cancel: boolean;
  test_mode: boolean;
  is_game: boolean;
  cancel_reason: string;
}

export interface OrderSubscriptionResponseData {
  response: {
    count: number;
    items: OrderSubscriptionItem[];
  };
}
