import { request, APIRequestContext } from '@playwright/test';
import { getAuthData } from '../utils/auth';

export async function createApiClient(): Promise<APIRequestContext> {
    const { token } = getAuthData();

    return await request.newContext({
        baseURL: process.env.API_BASE_URL,
        extraHTTPHeaders: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
}