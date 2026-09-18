import fs from 'fs';

const authFile = 'playwright/.auth/user.json';

interface AuthState {
    token: string;
    user: {
        defaultWorkspaceId: string;
    };
}

interface NovaAidAuth {
    state: AuthState;
}

export function getAuthData() {
    const storageState = JSON.parse(
        fs.readFileSync(authFile, 'utf-8')
    );

    const origin = storageState.origins?.find(
        (item: any) =>
            item.origin === process.env.BASE_URL
    );

    if (!origin) {
        throw new Error(
            `Origin ${process.env.BASE_URL} not found in auth state`
        );
    }

    const authStorage = origin.localStorage?.find(
        (item: any) =>
            item.name === 'nova-aid-auth'
    );

    if (!authStorage) {
        throw new Error(
            'nova-aid-auth was not found in Playwright storage state'
        );
    }

    const authData: NovaAidAuth = JSON.parse(
        authStorage.value
    );

    return {
        token: authData.state.token,
        workspaceId: authData.state.user.defaultWorkspaceId,
    };
}