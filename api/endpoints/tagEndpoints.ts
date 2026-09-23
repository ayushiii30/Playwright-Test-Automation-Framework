import { APIRequestContext } from '@playwright/test';

export class TagEndpoints {
    constructor(private api: APIRequestContext) {}

    async getTags(
        workspaceId: string,
        archived = false,
        page = 1,
        limit = 10
    ) {
        return await this.api.get('/api/tag', {
            params: {
                workspace_id: workspaceId,
                archived,
                page,
                limit,
            },
        });
    }

    async createTag(
        workspaceId: string,
        name: string,
        description: string
    ) {
        return await this.api.post('/api/tag', {
            params: {
                workspace_id: workspaceId,
            },
            data: {
                name,
                description,
            },
        });
    }

    async updateTag(
    tagId: string,
    workspaceId: string,
    name: string,
    description: string
) {
    return await this.api.put(`/api/tag/${tagId}`, {
        params: {
            workspace_id: workspaceId,
        },
        data: {
            name,
            description,
        },
    });
}

async archiveTag(
    tagId: string,
    workspaceId: string
) {
    return await this.api.delete(`/api/tag/${tagId}`, {
        params: {
            workspace_id: workspaceId,
        },
        data: {},
    });
}
}
