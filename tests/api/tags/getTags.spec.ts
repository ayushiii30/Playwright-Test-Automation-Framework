import { test, expect } from '@playwright/test';
import { createApiClient } from '../../../api/clients/apiClient';
import { TagEndpoints } from '../../../api/endpoints/tagEndpoints';
import { getAuthData } from '../../../api/utils/auth';
import { GetTagsResponse } from '../../../api/types/tag.types';

test.describe('Tags API', () => {

    test('GET /api/tag should return active tags', async () => {

        const api = await createApiClient();
        const tagApi = new TagEndpoints(api);
        const { workspaceId } = getAuthData();
        const response = await tagApi.getTags(
            workspaceId,
            false,
            1,
            10
        );
         expect(response.status()).toBe(200);

        const body: GetTagsResponse = await response.json();
        expect(body.status).toBe('success');
        expect(body.message).toBe('Successfully done');
        expect(body.data.docs).toBeDefined();
        expect(body.data.docs.length).toBeLessThanOrEqual(10);
        expect(body.data.limit).toBe(10);
        expect(body.data.page).toBe(1);
        expect(body.data.totalDocs).toBeGreaterThan(0);
        for (const tag of body.data.docs) {
    expect(tag.id).toBeTruthy();
    expect(tag.name).toBeTruthy();
    expect(tag.workspaceId).toBe(workspaceId);
    expect(tag.clientId).toBeTruthy();
    expect(tag.createdBy).toBeTruthy();
    expect(tag.createdAt).toBeTruthy();
    expect(tag.updatedAt).toBeTruthy();
}
        await api.dispose();
    });
});