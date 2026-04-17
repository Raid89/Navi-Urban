import type { APIRoute } from 'astro';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '../../../lib/adminAuth';
import { getAdminSession } from '../../../lib/cms';
import { uploadImageToCloudinary } from '../../../lib/cloudinary';

const requireAdmin = async (cookies: { get: (name: string) => { value: string } | undefined }) => {
  const token = cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const sessionId = verifyAdminSession(token);

  if (!sessionId) {
    return null;
  }

  return getAdminSession(sessionId);
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const session = await requireAdmin(cookies);

  if (!session || session.expiresAt < new Date()) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return new Response(JSON.stringify({ error: 'missing_file' }), { status: 400 });
  }

  const image = await uploadImageToCloudinary(file);
  return new Response(JSON.stringify(image), {
    headers: { 'Content-Type': 'application/json' }
  });
};
