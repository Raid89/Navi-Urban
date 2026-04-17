import crypto from 'node:crypto';
import './env';

type CloudinaryConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  uploadFolder: string;
};

function getCloudinaryConfig(): CloudinaryConfig {
  let cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  let apiKey = process.env.CLOUDINARY_API_KEY;
  let apiSecret = process.env.CLOUDINARY_API_SECRET;
  const uploadFolder = process.env.CLOUDINARY_UPLOAD_FOLDER || 'navi-urban';

  if ((!cloudName || !apiKey || !apiSecret) && process.env.CLOUDINARY_URL) {
    try {
      const parsedUrl = new URL(process.env.CLOUDINARY_URL);

      if (parsedUrl.protocol === 'cloudinary:') {
        cloudName = cloudName || parsedUrl.hostname;
        apiKey = apiKey || decodeURIComponent(parsedUrl.username);
        apiSecret = apiSecret || decodeURIComponent(parsedUrl.password);
      }
    } catch {
      throw new Error('Invalid CLOUDINARY_URL format. Expected: cloudinary://<api_key>:<api_secret>@<cloud_name>');
    }
  }

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Missing Cloudinary env vars. Define CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET or set CLOUDINARY_URL.');
  }

  return {
    cloudName,
    apiKey,
    apiSecret,
    uploadFolder
  };
}

export async function uploadImageToCloudinary(file: File) {
  const { cloudName, apiKey, apiSecret, uploadFolder } = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const paramsToSign = `folder=${uploadFolder}&timestamp=${timestamp}`;
  const signature = crypto.createHash('sha1').update(`${paramsToSign}${apiSecret}`).digest('hex');

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('folder', uploadFolder);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    console.error(`Cloudinary upload failed: ${response.status} ${response.statusText}`);
    throw new Error(`Cloudinary upload failed with status ${response.status}`);
  }

  const data = await response.json() as { secure_url: string; public_id: string };
  return {
    url: data.secure_url,
    publicId: data.public_id
  };
}
