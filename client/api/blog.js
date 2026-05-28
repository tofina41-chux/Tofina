import { supabaseAdmin } from './_supabase.js';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.from('blog').select('*').order('date', { ascending: false });
    if (error) return new Response(JSON.stringify([]), { status: 200 });
    return new Response(JSON.stringify(data || []), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify([]), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, excerpt, content, category } = body;
    const { data, error } = await supabaseAdmin.from('blog').insert([{ title, excerpt, content, category, date: new Date().toISOString() }]);
    if (error) return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    return new Response(JSON.stringify({ success: true, post: data[0] }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: String(err) }), { status: 500 });
  }
}
