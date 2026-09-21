export type ContactRequest = {
  name: string;
  email: string;
  neighborhood: string;
  message: string;
};

export type ContactResponse = {
  ok: boolean;
  id: string;
};

export async function submitContact(payload: ContactRequest): Promise<ContactResponse> {
  await new Promise((resolve) => setTimeout(resolve, 450));

  if (!payload.name.trim() || !payload.email.includes('@')) {
    throw new Error('Please add a name and a valid email.');
  }

  return {
    ok: true,
    id: `ns-${Date.now()}`,
  };
}
