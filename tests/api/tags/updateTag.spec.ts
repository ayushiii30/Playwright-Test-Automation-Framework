import { test, expect } from '@playwright/test';
import { createApiClient } from '../../../api/clients/apiClient';
import { TagEndpoints } from '../../../api/endpoints/tagEndpoints';
import { getAuthData } from '../../../api/utils/auth';
import { GetTagsResponse } from '../../../api/types/tag.types';
import { Logger } from '../../../utils/logger';

test.describe('Tags API', () => {

    test('PUT /api/tag/:id should update an existing tag', async () => {

        const api = await createApiClient();
        const tagApi = new TagEndpoints(api);
        const { workspaceId } = getAuthData();
        // Get an existing tag
        const getResponse = await tagApi.getTags(
            workspaceId,
            false,
            1,
            10
        );
        expect(getResponse.status()).toBe(200);

        const getBody: GetTagsResponse =
            await getResponse.json();

        expect(getBody.data.docs.length).toBeGreaterThan(0);

        const existingTag = getBody.data.docs[0];

        const tagId = existingTag.id;

        const updatedName = `API Updated ${Date.now()}`;
        const updatedDescription =
            'Edited through API automation';

        Logger.info('--- UPDATE TAG REQUEST ---');
        Logger.info(`Tag ID: ${tagId}`);
        Logger.info(`Updated Name: ${updatedName}`);
        Logger.info(`Updated Description: ${updatedDescription}`);

        // Update tag
        const updateResponse = await tagApi.updateTag(
            tagId,
            workspaceId,
            updatedName,
            updatedDescription
        );

        Logger.info(
            `Status Code: ${updateResponse.status()}`
        );

        expect(updateResponse.status()).toBe(200);

        const updateBody = await updateResponse.json();

        Logger.info('--- UPDATE TAG RESPONSE ---');
        Logger.info(
            JSON.stringify(updateBody, null, 2)
        );

        expect(updateBody.status).toBe('success');
        expect(updateBody.message).toBe('Successfully done');

        // Verify update through GET
        const verifyResponse = await tagApi.getTags(
            workspaceId,
            false,
            1,
            10
        );
        expect(verifyResponse.status()).toBe(200);

        const verifyBody: GetTagsResponse =
            await verifyResponse.json();

        const updatedTag = verifyBody.data.docs.find(
            tag => tag.id === tagId
        );
        Logger.info('--- UPDATED TAG VERIFICATION ---');
        expect(updatedTag).toBeDefined();
        Logger.info(`Tag Name: ${updatedTag?.name}`);
        Logger.info(
            `Tag Description: ${updatedTag?.description}`
        );
        expect(updatedTag?.name).toBe(updatedName);
        expect(updatedTag?.description)
            .toBe(updatedDescription);

        Logger.info(
            'Tag update and verification successful.'
        );
        await api.dispose();
    });
});