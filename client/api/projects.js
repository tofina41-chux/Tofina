import { supabaseAdmin } from './_supabase.js';
import { requireAdminAuth } from './_adminAuth.js';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.from('projects').select('*').order('id', { ascending: false });
    if (error) return new Response(JSON.stringify([]), { status: 200 });
    return new Response(JSON.stringify(data || []), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify([]), { status: 500 });
  }
}

export async function POST(request) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const form = await request.formData();
    const title = form.get('title');
    const description = form.get('description');
    const technologies = form.get('technologies');
    const liveLink = form.get('liveLink') || form.get('launchLiveApp') || '';
    const githubLink = form.get('githubLink') || form.get('viewCodeBase') || '';
    const file = form.get('image');

    let imageUrl = null;
    if (file && file.size) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `project_${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from('portfolio-assets')
        .upload(fileName, buffer, { contentType: file.type, upsert: false });

      if (uploadError) {
        console.error('Supabase upload error', uploadError);
      } else {
        const { data: publicUrlData, error: publicUrlError } = await supabaseAdmin.storage.from('portfolio-assets').getPublicUrl(fileName);
        if (publicUrlError) {
          console.error('Supabase public URL error', publicUrlError);
        } else {
          imageUrl = publicUrlData.publicUrl;
        }
      }
    }

    const insertObj = { title, description, tags: technologies ? technologies.split(',').map(t=>t.trim()) : [], imageUrl, liveLink, githubLink };
    const { data, error } = await supabaseAdmin.from('projects').insert([insertObj]);
    if (error) return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    return new Response(JSON.stringify({ success: true, project: data[0] }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: String(err) }), { status: 500 });
  }
}
