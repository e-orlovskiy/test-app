export async function apiFetch(
  path,
  { method = "GET", body, headers = {} } = {},
) {
  const opts = {
    method,
    headers: { ...headers, "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`https://test-app-server.up.railway.app/api${path}`, opts);
  const newAccess = res.headers.get("access-token");
  const newRefresh = res.headers.get("refresh-token");
  return {
    status: res.status,
    data: await res.json(),
    tokens: { access: newAccess, refresh: newRefresh },
  };
}
