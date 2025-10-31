export class CircuitBreaker {
  private failures = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  private nextAttempt = Date.now();

  constructor(
    private readonly threshold = 5,
    private readonly resetMs = 30_000,
  ) {}

  async execute<T>(task: () => Promise<T>): Promise<T> {
    if (this.state === 'open' && Date.now() < this.nextAttempt) {
      throw new Error('CircuitBreaker: open');
    }

    try {
      const result = await task();
      this.reset();
      return result;
    } catch (error) {
      this.recordFailure();
      throw error;
    }
  }

  private recordFailure() {
    this.failures += 1;
    if (this.failures >= this.threshold) {
      this.state = 'open';
      this.nextAttempt = Date.now() + this.resetMs;
    } else if (this.state === 'open') {
      this.state = 'half-open';
    }
  }

  private reset() {
    this.failures = 0;
    this.state = 'closed';
    this.nextAttempt = Date.now();
  }
}
