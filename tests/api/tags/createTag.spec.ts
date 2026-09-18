import { test, expect } from '@playwright/test';
import { createApiClient } from '../../../api/clients/apiClient';
import { TagEndpoints } from '../../../api/endpoints/tagEndpoints';
import { getAuthData } from '../../../api/utils/auth';
import {
    GetTagsResponse,
    CreateTagResponse
} from '../../../api/types/tag.types';
import { Logger } from '../../../utils/logger';

const logger = new Logger();

test.describe('Tags API', () => {

    test('POST /api/tag should create and return the created tag', async () => {

        const api = await createApiClient();
        const tagApi = new TagEndpoints(api);

        const { workspaceId } = getAuthData();

        const tagName = `API Automation ${Date.now()}`;
        const tagDescription = 'Created through API automation';

        Logger.info('--- CREATE TAG REQUEST ---');
        Logger.info(`Tag Name: ${tagName}`);
        Logger.info(`Description: ${tagDescription}`);

        // Create tag
        const createResponse = await tagApi.createTag(
            workspaceId,
            tagName,
            tagDescription
        );

        Logger.info(`Status Code: ${createResponse.status()}`);

        expect(createResponse.status()).toBe(200);

       const createBody: CreateTagResponse = await createResponse.json();

        Logger.info('--- CREATE TAG RESPONSE ---');
        Logger.info(JSON.stringify(createBody, null, 2));

        expect(createBody.status).toBe('success');
        expect(createBody.message).toBe('Successfully done');
        expect(createBody.data.id).toBeTruthy();

        const createdTagId = createBody.data.id;

        Logger.info(`Created Tag ID: ${createdTagId}`);

        // Get tags
        const getResponse = await tagApi.getTags(
            workspaceId,
            false,
            1,
            10
        );

        expect(getResponse.status()).toBe(200);

        const getBody: GetTagsResponse = await getResponse.json();

        // Find created tag
        const createdTag = getBody.data.docs.find(
            tag => tag.id === createdTagId
        );

        Logger.info('--- CREATED TAG VERIFICATION ---');

        expect(createdTag).toBeDefined();

        Logger.info(`Tag Found: ${createdTag?.name}`);
        Logger.info(`Tag Description: ${createdTag?.description}`);
        Logger.info(`Workspace ID: ${createdTag?.workspaceId}`);

        expect(createdTag?.name).toBe(tagName);
        expect(createdTag?.description).toBe(tagDescription);
        expect(createdTag?.workspaceId).toBe(workspaceId);

        Logger.info('Tag creation and verification successful.');

        await api.dispose();
    });
});