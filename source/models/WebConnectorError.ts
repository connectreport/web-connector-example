export class WebConnectorError extends Error {
  /** Whether to disable downstream retries */
  disableRetry: boolean = false;
  constructor(message: string, disableRetry?: boolean) {
    super(message);
    this.disableRetry = disableRetry || false;
  }
}
