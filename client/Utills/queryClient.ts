import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Build URL with query parameters properly
    let url = '';
    const params = new URLSearchParams();
    
    for (let i = 0; i < queryKey.length; i++) {
      const key = queryKey[i];
      if (typeof key === 'string') {
        if (i === 0) {
          url = key;
        } else {
          url += '/' + key;
        }
      } else if (typeof key === 'object' && key !== null) {
        // Handle query parameters
        for (const [paramKey, paramValue] of Object.entries(key)) {
          if (paramValue !== undefined && paramValue !== null) {
            params.append(paramKey, String(paramValue));
          }
        }
      }
    }
    
    // Add query string if params exist
    const queryString = params.toString();
    if (queryString) {
      url += '?' + queryString;
    }
    
    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 0, // Changed from Infinity to ensure fresh data
      retry: 1, // Allow one retry
    },
    mutations: {
      retry: false,
    },
  },
});
