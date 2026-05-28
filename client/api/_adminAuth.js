export function requireAdminAuth(request) {
  const adminHeader = request.headers.get('x-admin-auth');
  const secretKey = process.env.ADMIN_SECRET_KEY;

  if (!secretKey || !adminHeader || adminHeader !== secretKey) {
    return new Response(
      JSON.stringify({ success: false, message: 'Unauthorized Access Key Key Token Rejected.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return null;
}
