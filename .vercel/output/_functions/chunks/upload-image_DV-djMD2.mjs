import { A as ADMIN_COOKIE_NAME, v as verifyAdminSession, d as getAdminSession } from './cms_DALIUrFy.mjs';
import crypto from 'node:crypto';
import './mongo_BfYADjV2.mjs';

function getCloudinaryConfig() {
  let cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  let apiKey = process.env.CLOUDINARY_API_KEY;
  let apiSecret = process.env.CLOUDINARY_API_SECRET;
  const uploadFolder = process.env.CLOUDINARY_UPLOAD_FOLDER || "navi-urban";
  if ((!cloudName || !apiKey || !apiSecret) && process.env.CLOUDINARY_URL) {
    try {
      const parsedUrl = new URL(process.env.CLOUDINARY_URL);
      if (parsedUrl.protocol === "cloudinary:") {
        cloudName = cloudName || parsedUrl.hostname;
        apiKey = apiKey || decodeURIComponent(parsedUrl.username);
        apiSecret = apiSecret || decodeURIComponent(parsedUrl.password);
      }
    } catch {
      throw new Error("Invalid CLOUDINARY_URL format. Expected: cloudinary://<api_key>:<api_secret>@<cloud_name>");
    }
  }
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Missing Cloudinary env vars. Define CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET or set CLOUDINARY_URL.");
  }
  return {
    cloudName,
    apiKey,
    apiSecret,
    uploadFolder
  };
}
async function uploadImageToCloudinary(file) {
  const { cloudName, apiKey, apiSecret, uploadFolder } = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1e3).toString();
  const paramsToSign = `folder=${uploadFolder}&timestamp=${timestamp}`;
  const signature = crypto.createHash("sha1").update(`${paramsToSign}${apiSecret}`).digest("hex");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("folder", uploadFolder);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData
  });
  if (!response.ok) {
    console.error(`Cloudinary upload failed: ${response.status} ${response.statusText}`);
    throw new Error(`Cloudinary upload failed with status ${response.status}`);
  }
  const data = await response.json();
  return {
    url: data.secure_url,
    publicId: data.public_id
  };
}

const requireAdmin = async (cookies) => {
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
const POST = async ({ request, cookies }) => {
  const session = await requireAdmin(cookies);
  if (!session || session.expiresAt < /* @__PURE__ */ new Date()) {
    return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
  }
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return new Response(JSON.stringify({ error: "missing_file" }), { status: 400 });
  }
  const image = await uploadImageToCloudinary(file);
  return new Response(JSON.stringify(image), {
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
