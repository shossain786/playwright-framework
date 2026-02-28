import { APIRequestContext, request } from "@playwright/test";
import { config } from "@utils/config";
import { logger } from "@utils/logger";

export class APIHelper {
  private context: APIRequestContext;

  constructor(context: APIRequestContext) {
    this.context = context;
  }

  static async create(): Promise<APIHelper> {
    const context = await request.newContext({
      baseURL: config.apiURL,
      timeout: config.timeouts.api,
      extraHTTPHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return new APIHelper(context);
  }

  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    logger.info(`Making GET request to ${endpoint}`);
    const response = await this.context.get(endpoint, { headers });
    await this.assertStatus(response, endpoint);
    return response.json() as Promise<T>;
  }

  async post<T>(
    endpoint: string,
    body: unknown,
    headers?: Record<string, string>,
  ): Promise<T> {
    logger.info(`POST ${endpoint}`);
    const response = await this.context.post(endpoint, { data: body, headers });
    await this.assertStatus(response, endpoint);
    return response.json() as Promise<T>;
  }

  async put<T>(
    endpoint: string,
    body: unknown,
    headers?: Record<string, string>,
  ): Promise<T> {
    logger.info(`PUT ${endpoint}`);
    const response = await this.context.put(endpoint, { data: body, headers });
    await this.assertStatus(response, endpoint);
    return response.json() as Promise<T>;
  }

  async delete<T>(
    endpoint: string,
    headers?: Record<string, string>,
  ): Promise<T> {
    logger.info(`DELETE ${endpoint}`);
    const response = await this.context.delete(endpoint, { headers });
    await this.assertStatus(response, endpoint);
    return response.json() as Promise<T>;
  }

  async setAuthToken(token: string): Promise<void> {
    const context = await request.newContext({
        baseURL: config.apiURL,
        extraHTTPHeaders: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
    });
    this.context = context;
  }

  private async assertStatus(
    response: Awaited<ReturnType<APIRequestContext["get"]>>,
    endpoint: string,
  ): Promise<void> {
    if (!response.ok()) {
      const body = await response.text();
      logger.error(
        `Request failed: ${endpoint} — Status: ${response.status()} — Body: ${body}`,
      );
      throw new Error(`API request failed [${response.status()}]: ${endpoint}`);
    }
  }

  async dispose(): Promise<void> {
    await this.context.dispose();
  }
}
