import { supabaseAdmin } from './_supabase.js';
import { requireAdminAuth } from './_adminAuth.js';

export async function POST(request) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const form = await request.formData();
    const file = form.get('cv');
    if (!file || !file.size) return new Response(JSON.stringify({ success: false, message: 'No file' }), { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `cv_${Date.now()}_${file.name}`;
    const { error } = await supabaseAdmin.storage.from('portfolio-assets').upload(fileName, buffer, { contentType: file.type });
    if (error) return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });

    const { data: publicUrlData, error: publicUrlError } = await supabaseAdmin.storage.from('portfolio-assets').getPublicUrl(fileName);
    if (publicUrlError) return new Response(JSON.stringify({ success: false, error: publicUrlError.message }), { status: 500 });

    return new Response(JSON.stringify({ success: true, cvUrl: publicUrlData.publicUrl }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: String(err) }), { status: 500 });
  }
}
