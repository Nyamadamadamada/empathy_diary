const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8004/api';

export async function deleteAccount(accountId: string): Promise<void> {
  const res = await fetch(`${apiBase}/accounts/${accountId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`削除に失敗しました。時間をおいて試してください。: ${res.status}`);
  }
}

export async function putAccountIcon(accountId: string, icon: string): Promise<void> {
  const res = await fetch(`${apiBase}/accounts/${accountId}/icon`, {
    method: 'PUT',
    body: JSON.stringify({ icon }),
  });

  if (!res.ok) {
    throw new Error(`削除に失敗しました。時間をおいて試してください。: ${res.status}`);
  }
}
