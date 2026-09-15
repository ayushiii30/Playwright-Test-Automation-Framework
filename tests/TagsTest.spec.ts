import { test, expect } from '../fixtures/test.fixture';
import { generateUniqueTagName } from '../utils/testData';
import { allure } from 'allure-playwright';

test.describe('Tags Management', () => {

    test('TC_001: User should be able to open Tags page', async ({ tagsPage }) => {

        await allure.feature('Tags Management');
        await allure.story('Tags Page');
        await allure.severity('normal');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Tags');

        await test.step('Navigate to Tags page', async () => {
            await tagsPage.navigateToTagsPage();
        });

        await test.step('Verify Tags page is displayed', async () => {
            await expect(tagsPage.createTagButton).toBeVisible();
            await expect(tagsPage.searchInput).toBeVisible();
        });

    });


    test('TC_002: User should be able to create Tag', async ({ tagsPage }) => {

        await allure.feature('Tags Management');
        await allure.story('Tag Creation');
        await allure.severity('critical');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Tags');

        const tagName = generateUniqueTagName();

        await test.step('Navigate to Tags page', async () => {
            await tagsPage.navigateToTagsPage();
        });

        await test.step('Create a new Tag', async () => {
            await tagsPage.clickCreateTag();

            await expect(tagsPage.tagNameInput).toBeVisible();

            await tagsPage.createTag(
                tagName,
                'Created for test'
            );
        });

        await test.step('Verify Tag was created successfully', async () => {
            await expect(
                tagsPage.page.getByText(/Tag Created/i)
            ).toBeVisible();
        });

    });


    test('TC_003: User should be able to search Tag by name', async ({
        tagsPage
    }) => {

        await allure.feature('Tags Management');
        await allure.story('Tag Search');
        await allure.severity('normal');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Tags');

        await test.step('Navigate to Tags page', async () => {
            await tagsPage.navigateToTagsPage();
        });

        const tagName = await tagsPage.getFirstTagName();

        await test.step('Search for Tag by name', async () => {
            await tagsPage.searchTag(tagName);
        });

        await test.step('Verify searched Tag is displayed', async () => {
            await expect(
                tagsPage.page.getByText(tagName, { exact: true })
            ).toBeVisible();
        });

    });


    test('TC_004: User should not find a non-existing Tag', async ({
        tagsPage
    }) => {

        await allure.feature('Tags Management');
        await allure.story('Tag Search');
        await allure.severity('normal');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Tags');

        await test.step('Navigate to Tags page', async () => {
            await tagsPage.navigateToTagsPage();
        });

        await test.step('Search for a non-existing Tag', async () => {
            await tagsPage.searchTag('NonExistingTag123');
        });

        await test.step('Verify no matching Tags are displayed', async () => {
            await expect(
                tagsPage.page.getByText('No tags found')
            ).toBeVisible();
        });

    });


    test('TC_005: User should be able to cancel tag creation', async ({
        tagsPage
    }) => {

        await allure.feature('Tags Management');
        await allure.story('Tag Creation');
        await allure.severity('minor');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Tags');

        await test.step('Navigate to Tags page', async () => {
            await tagsPage.navigateToTagsPage();
        });

        await test.step('Open and cancel Tag creation', async () => {
            await tagsPage.clickCreateTag();

            await expect(tagsPage.tagNameInput).toBeVisible();

            await tagsPage.cancelCreateTag();
        });

        await test.step('Verify Create Tag modal is closed', async () => {
            await expect(
                tagsPage.tagNameInput
            ).not.toBeVisible();
        });

    });


    test('TC_006: User should not be able to create Tag without name', async ({
        tagsPage
    }) => {

        await allure.feature('Tags Management');
        await allure.story('Tag Validation');
        await allure.severity('normal');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Tags');

        await test.step('Navigate to Tags page', async () => {
            await tagsPage.navigateToTagsPage();
        });

        await test.step('Open Create Tag modal', async () => {
            await tagsPage.clickCreateTag();

            await expect(
                tagsPage.tagNameInput
            ).toBeVisible();
        });

        await test.step('Enter Tag description without name', async () => {
            await tagsPage.tagDescriptionInput.fill(
                'Created without a name'
            );
        });

        await test.step('Verify Create button remains disabled', async () => {
            await expect(
                tagsPage.modalCreateTagButton
            ).toBeDisabled();
        });

    });


    test('TC_007: User should be able to create Tag without description', async ({
        tagsPage
    }) => {

        await allure.feature('Tags Management');
        await allure.story('Tag Creation');
        await allure.severity('normal');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Tags');

        await test.step('Navigate to Tags page', async () => {
            await tagsPage.navigateToTagsPage();
        });

        await test.step('Create Tag without description', async () => {
            await tagsPage.clickCreateTag();

            await expect(
                tagsPage.tagNameInput
            ).toBeVisible();

            await tagsPage.tagNameInput.fill(
                'Tag Without Description'
            );

            await expect(
                tagsPage.modalCreateTagButton
            ).toBeEnabled();

            await tagsPage.modalCreateTagButton.click();
        });

    });


    test('TC_008: User should not be able to create duplicate Tag', async ({
        tagsPage
    }) => {

        await allure.feature('Tags Management');
        await allure.story('Tag Validation');
        await allure.severity('critical');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Tags');

        const tagName = generateUniqueTagName();

        await test.step('Navigate to Tags page', async () => {
            await tagsPage.navigateToTagsPage();
        });

        await test.step('Create the original Tag', async () => {
            await tagsPage.clickCreateTag();

            await tagsPage.tagNameInput.fill(tagName);
            await tagsPage.tagDescriptionInput.fill('Original tag');

            await tagsPage.modalCreateTagButton.click();

            await expect(
                tagsPage.page.getByText(/Tag Created/i)
            ).toBeVisible();
        });

        await test.step('Attempt to create duplicate Tag', async () => {
            await tagsPage.clickCreateTag();

            await tagsPage.tagNameInput.fill(tagName);
            await tagsPage.tagDescriptionInput.fill(
                'Duplicate tag test'
            );

            await tagsPage.modalCreateTagButton.click();
        });

        await test.step('Verify duplicate Tag is rejected', async () => {
            await expect(
                tagsPage.page.getByText(/already exist/i)
            ).toBeVisible();
        });

    });


    test('TC_009: User should be able to edit Tag', async ({
        tagsPage
    }) => {

        await allure.feature('Tags Management');
        await allure.story('Tag Editing');
        await allure.severity('critical');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Tags');

        await test.step('Navigate to Tags page', async () => {
            await tagsPage.navigateToTagsPage();
        });

        await test.step('Edit an existing Tag', async () => {
            await tagsPage.editTag();

            await expect(
                tagsPage.tagNameInput
            ).toBeVisible();

            await tagsPage.tagNameInput.fill(
                'Updated Automation Tag'
            );

            await tagsPage.updateTagButton.click();
        });

        await test.step('Verify Tag was updated successfully', async () => {
            await expect(
                tagsPage.page.getByText('Updated Automation Tag')
            ).toBeVisible();
        });

    });


    test('TC_010: User should be able to cancel editing a Tag', async ({
        tagsPage
    }) => {

        await allure.feature('Tags Management');
        await allure.story('Tag Editing');
        await allure.severity('minor');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Tags');

        const tagName = generateUniqueTagName();

        await test.step('Navigate to Tags page', async () => {
            await tagsPage.navigateToTagsPage();
        });

        await test.step('Create a Tag for edit cancellation test', async () => {
            await tagsPage.clickCreateTag();

            await tagsPage.createTag(
                tagName,
                'Tag for edit cancellation'
            );

            await expect(
                tagsPage.page.getByText(/Tag Created/i)
            ).toBeVisible();
        });

        await test.step('Open Tag for editing', async () => {
            await tagsPage.editTagByName(tagName);

            await expect(
                tagsPage.tagNameInput
            ).toBeVisible();
        });

        await test.step('Modify Tag and cancel editing', async () => {
            await tagsPage.tagNameInput.fill(
                'Temporary Updated Tag'
            );

            await tagsPage.cancelButton.click();
        });

        await test.step('Verify Edit modal is closed', async () => {
            await expect(
                tagsPage.tagNameInput
            ).not.toBeVisible();
        });

    });


    test('TC_011: User should be able to archive Tag', async ({
        tagsPage
    }) => {

        await allure.feature('Tags Management');
        await allure.story('Tag Lifecycle');
        await allure.severity('critical');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Tags');

        await test.step('Navigate to Tags page', async () => {
            await tagsPage.navigateToTagsPage();
        });

        const archivedTagName =
            await tagsPage.getFirstTagName();

        await test.step('Archive the selected Tag', async () => {
            await tagsPage.clickArchiveTag();
            await tagsPage.clickArchiveButton();
        });

        await test.step('Verify Tag was archived successfully', async () => {
            await expect(
                tagsPage.page.getByText(/Tag Archived/i)
            ).toBeVisible();
        });

        await test.step('Verify archived Tag is available in Archived view', async () => {
            await tagsPage.archivedButton.click();

            await expect(
                tagsPage.page.getByText(
                    archivedTagName
                )
            ).toBeVisible();
        });

    });


    test('TC_012: User should be able to restore archived Tag', async ({
        tagsPage
    }) => {

        await allure.feature('Tags Management');
        await allure.story('Tag Lifecycle');
        await allure.severity('critical');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Tags');

        await test.step('Navigate to Tags page', async () => {
            await tagsPage.navigateToTagsPage();
        });

        await test.step('Open Archived Tags', async () => {
            await tagsPage.archivedButton.click();
        });

        const tagName =
            await tagsPage.getFirstTagName();

        await test.step('Restore the selected archived Tag', async () => {
            await tagsPage.restoreTagByName(tagName);
            await tagsPage.restoreButton.click();
        });

        await test.step('Verify Tag was restored successfully', async () => {
            await expect(
                tagsPage.page.getByText(/Tag Restored/i)
            ).toBeVisible();
        });

    });

});