export type OrderRequest = {
  planId: string;
  address: string;
  town: string;
  name: string;
  email: string;
  phone: string;
};

export type OrderResponse = {
  ok: boolean;
  id: string;
};

export async function submitOrder(payload: OrderRequest): Promise<OrderResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!payload.address.trim() || !payload.name.trim() || !payload.email.includes('@')) {
    throw new Error('Add an address, a name, and a valid email.');
  }

  return { ok: true, id: `ns-${Date.now()}` };
}
