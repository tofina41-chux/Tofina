import { supabaseAdmin } from './_supabase.js';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.from('profile').select('imageUrl').limit(1).single();
    if (error || !data) {
      return new Response(JSON.stringify({ success: true, imageUrl: `${process.env.PUBLIC_URL || ''}/uploads/avatar.jpg` }), { status: 200 });
    }
    return new Response(JSON.stringify({ success: true, imageUrl: data.imageUrl }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
