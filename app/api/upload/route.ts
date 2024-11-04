// app/api/upload/route.js
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req:any) {
  try {
    const body = await req.json();
    const fileStr = body.data; // Assuming the data is a base64 string

    const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr, {
      upload_preset: 'ml_default', // Change preset as needed
    });

    return new Response(JSON.stringify({ url: uploadedResponse.secure_url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: 'Upload failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
