import formidable from 'formidable';
import { supabaseAdmin } from './_supabase.js';

export const config = { api: { bodyParser: false } };

export async function POST(request) {
  try {
    const form = new formidable.IncomingForm();

    const parsed = await new Promise((resolve, reject) => {
      form.parse(request, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const file = parsed.files.cv;
    if (!file) return new Response(JSON.stringify({ success: false, message: 'No file' }), { status: 400 });

    const fs = await import('fs');
    const data = fs.readFileSync(file.filepath);
    const fileName = `cv_${Date.now()}_${file.originalFilename}`;
    const { error } = await supabaseAdmin.storage.from('portfolio-assets').upload(fileName, data, { contentType: file.mimetype });
    if (error) return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    const { publicURL } = supabaseAdmin.storage.from('portfolio-assets').getPublicUrl(fileName);

    return new Response(JSON.stringify({ success: true, cvUrl: publicURL }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: String(err) }), { status: 500 });
  }
}
