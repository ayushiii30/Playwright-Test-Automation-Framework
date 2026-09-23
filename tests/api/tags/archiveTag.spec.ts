import { test, expect } from '@playwright/test';
import { createApiClient } from '../../../api/clients/apiClient';
import { TagEndpoints } from '../../../api/endpoints/tagEndpoints';
import { getAuthData } from '../../../api/utils/auth';
import {
    GetTagsResponse,
    CreateTagResponse
} from '../../../api/types/tag.types';
import { Logger } from '../../../utils/logger';

test.describe('Tags API', () => {

    test('DELETE /api/tag/:id should archive a tag', async () => {

        const api = await createApiClient();
        const tagApi = new TagEndpoints(api);

        const { workspaceId } = getAuthData();

        const tagName = `API Archive ${Date.now()}`;
        const tagDescription = 'Created for archive API automation';

        // CREATE TAG

        Logger.info(`Tag Name: ${tagName}`);
        Logger.info(`Description: ${tagDescription}`);

        const createResponse = await tagApi.createTag(
            workspaceId,
            tagName,
            tagDescription
        );

        expect(createResponse.status()).toBe(200);

        const createBody: CreateTagResponse =
            await createResponse.json();

        expect(createBody.status).toBe('success');
        expect(createBody.message).toBe('Successfully done');
        expect(createBody.data.id).toBeTruthy();

        const tagId = createBody.data.id;

        Logger.info(`Created Tag ID: ${tagId}`);

        // ARCHIVE TAG

        Logger.info('ARCHIVE TAG REQUEST');

        const archiveResponse = await tagApi.archiveTag(
            tagId,
            workspaceId
        );

        Logger.info(`Status Code: ${archiveResponse.status()}`);

        expect(archiveResponse.status()).toBe(200);

        const archiveBody = await archiveResponse.json();

        expect(archiveBody.status).toBe('success');
        expect(archiveBody.message).toBe('Successfully done');

        // VERIFY TAG IS NO LONGER ACTIVE

        const activeResponse = await tagApi.getTags(
            workspaceId,
            false,
            1,
            10
        );

        expect(activeResponse.status()).toBe(200);

        const activeBody: GetTagsResponse =
            await activeResponse.json();

        const activeTag = activeBody.data.docs.find(
            tag => tag.id === tagId
        );

        Logger.info('--- ACTIVE TAG VERIFICATION ---');
        Logger.info(
            `Tag found in active tags: ${activeTag !== undefined}`
        );

        expect(activeTag).toBeUndefined();

        // VERIFY TAG APPEARS IN ARCHIVED TAGS

        const archivedResponse = await tagApi.getTags(
            workspaceId,
            true,
            1,
            10
        );

        expect(archivedResponse.status()).toBe(200);

        const archivedBody: GetTagsResponse =
            await archivedResponse.json();

        const archivedTag = archivedBody.data.docs.find(
            tag => tag.id === tagId
        );

        Logger.info('--- ARCHIVED TAG VERIFICATION ---');

        expect(archivedTag).toBeDefined();

        Logger.info(`Archived Tag ID: ${archivedTag?.id}`);
        Logger.info(`Archived Tag Name: ${archivedTag?.name}`);

        expect(archivedTag?.id).toBe(tagId);
        expect(archivedTag?.name).toBe(tagName);
        expect(archivedTag?.description).toBe(tagDescription);

        Logger.info(
            'Tag archive and verification successful.'
        );

        await api.dispose();
    });
});