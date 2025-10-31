export async function withRetry<T>(
  task: () => Promise<T>,
  retries = 3,
  delayMs = 250,
): Promise<T> {
  let attempt = 0;
  while (attempt <= retries) {
    try {
      return await task();
    } catch (error) {
      attempt += 1;
      if (attempt > retries) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
    }
  }
  throw new Error('withRetry exhausted without executing task'); // unreachable
}
