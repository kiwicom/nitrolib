export async function handleError(res: Response): Promise<Response> {
  if (!res.ok) {
    const data = await res.json();

    return Promise.reject(
      new Error(
        `Fetch: ${res.status} ${res.statusText}. Data: ${JSON.stringify(data, null, "  ")}`,
      ),
    );
  }

  return res;
}

export async function handleJSON<T>(res: Response): Promise<T> {
  const data = await handleError(res).then(r => r.json());

  // Our API convention
  if (data.error_code) {
    return Promise.reject(
      new Error(`Fetch: ${data.message}. Data: ${JSON.stringify(data, null, "  ")}`),
    );
  }

  return data;
}
