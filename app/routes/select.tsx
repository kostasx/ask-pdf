import type { ActionFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = formData.get('pdf') as string;
  const [name, url] = data.split(';');
  return json({ name, url });
}
