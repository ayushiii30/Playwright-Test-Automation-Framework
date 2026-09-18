export interface Tag {
    id: string;
    name: string;
    description?: string;
    workspaceId: string;
    clientId: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    archiveAt?: string | null;
    __v?: number;
}

export interface TagPagination {
    totalDocs: number;
    offset: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

export interface GetTagsResponse {
    status: string;
    message: string;
    data: {
        docs: Tag[];
    } & TagPagination;
}
export interface CreateTagResponse {
    status: string;
    message: string;
    data: {
        id: string;
    };
}