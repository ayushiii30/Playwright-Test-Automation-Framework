import { test, expect } from '../fixtures/test.fixture';
import { generateUniqueProfileName } from '../utils/testData';
import { allure } from 'allure-playwright';

test.describe('Chatbot Profile Management', () => {

    test.beforeEach(async ({ chatbotProfilePage }) => {

        await test.step('Open Create Chatbot Profile', async () => {
            await chatbotProfilePage.navigateToChatbotProfile();
            await chatbotProfilePage.openCreateProfile();
        });

    });


    test('TC_001: User should be able to open Create Chatbot Profile', async ({
        chatbotProfilePage
    }) => {

        await allure.feature('Chatbot Profile Management');
        await allure.story('Chatbot Profile Creation');
        await allure.severity('minor');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Chatbot Profile');

        await test.step('Verify Create Profile Basics options are displayed', async () => {
            await expect(chatbotProfilePage.profileNameInput).toBeVisible();
            await expect(chatbotProfilePage.activeButton).toBeVisible();
            await expect(chatbotProfilePage.webChannelButton).toBeVisible();
            await expect(chatbotProfilePage.customerAudienceButton).toBeVisible();
        });

    });


    test('TC_002: User should be able to configure chatbot Basics', async ({
        chatbotProfilePage
    }) => {

        await allure.feature('Chatbot Profile Management');
        await allure.story('Chatbot Profile Basics');
        await allure.severity('normal');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Chatbot Profile');

        await test.step('Configure chatbot Basics', async () => {
            await chatbotProfilePage.fillBasics('Automation Chatbot');
        });

        await test.step('Verify chatbot Basics are configured', async () => {
            await expect(
                chatbotProfilePage.profileNameInput
            ).toHaveValue('Automation Chatbot');
        });

    });


    test('TC_003: User should be able to view Behavior options', async ({
        chatbotProfilePage
    }) => {

        await allure.feature('Chatbot Profile Management');
        await allure.story('Chatbot Behavior');
        await allure.severity('normal');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Chatbot Profile');

        await test.step('Navigate to Behavior configuration', async () => {
            await chatbotProfilePage.goToBehavior();
        });

        await test.step('Verify Behavior options are displayed', async () => {
            await expect(
                chatbotProfilePage.onceAnswerModeButton
            ).toBeVisible();

            await expect(
                chatbotProfilePage.loopAnswerModeButton
            ).toBeVisible();

            await expect(
                chatbotProfilePage.routeAfterAnswerButton
            ).toBeVisible();

            await expect(
                chatbotProfilePage.webSearchToggle
            ).toBeVisible();
        });

    });


    test('TC_004: User should be able to configure Behavior', async ({
        chatbotProfilePage
    }) => {

        await allure.feature('Chatbot Profile Management');
        await allure.story('Chatbot Behavior');
        await allure.severity('normal');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Chatbot Profile');

        await test.step('Navigate to Behavior configuration', async () => {
            await chatbotProfilePage.goToBehavior();
        });

        await test.step('Configure chatbot Behavior', async () => {
            await chatbotProfilePage.configureBehavior();
        });

        await test.step('Verify Behavior configuration is available', async () => {
            await expect(
                chatbotProfilePage.onceAnswerModeButton
            ).toBeVisible();
        });

    });


    test('TC_005: User should be able to view Messages options', async ({
        chatbotProfilePage
    }) => {

        await allure.feature('Chatbot Profile Management');
        await allure.story('Chatbot Messages');
        await allure.severity('normal');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Chatbot Profile');

        await test.step('Navigate to Messages configuration', async () => {
            await chatbotProfilePage.goToMessages();
        });

        await test.step('Verify Messages options are displayed', async () => {
            await expect(
                chatbotProfilePage.introMessageInput
            ).toBeVisible();

            await expect(
                chatbotProfilePage.handoverMessageInput
            ).toBeVisible();

            await expect(
                chatbotProfilePage.customPromptToggle
            ).toBeVisible();

            await expect(
                chatbotProfilePage.responseFooterToggle
            ).toBeVisible();
        });

    });


    test('TC_006: User should be able to configure Intro and Handover messages', async ({
        chatbotProfilePage
    }) => {

        const introMessage = 'Welcome! How can I help you?';

        const handoverMessage =
            'Please wait while I connect you to our support team.';

        await allure.feature('Chatbot Profile Management');
        await allure.story('Chatbot Messages');
        await allure.severity('normal');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Chatbot Profile');

        await test.step('Navigate to Messages configuration', async () => {
            await chatbotProfilePage.goToMessages();
        });

        await test.step('Configure Intro and Handover messages', async () => {
            await chatbotProfilePage.fillMessages(
                introMessage,
                handoverMessage
            );
        });

        await test.step('Verify configured messages', async () => {
            await expect(
                chatbotProfilePage.page.getByText(
                    introMessage,
                    { exact: true }
                )
            ).toBeVisible();

            await expect(
                chatbotProfilePage.handoverMessageInput
            ).toHaveValue(handoverMessage);
        });

    });


    test('TC_007: User should be able to review configured Chatbot Profile', async ({
        chatbotProfilePage
    }) => {

        await allure.feature('Chatbot Profile Management');
        await allure.story('Chatbot Profile Review');
        await allure.severity('normal');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Chatbot Profile');

        await test.step('Navigate to Profile Review', async () => {
            await chatbotProfilePage.goToReview();
        });

        await test.step('Verify Profile Review details', async () => {
            await expect(
                chatbotProfilePage.createProfileSubmitButton
            ).toBeVisible();

            await expect(
                chatbotProfilePage.modal
                    .getByText('Automation Chatbot', { exact: true })
                    .first()
            ).toBeVisible();
        });

    });


    test('TC_008: User should be able to create Chatbot Profile successfully', async ({
        chatbotProfilePage
    }) => {

        const profileName = generateUniqueProfileName();

        await allure.feature('Chatbot Profile Management');
        await allure.story('Chatbot Profile Creation');
        await allure.severity('critical');

        await allure.label('testType', 'UI');
        await allure.label('testLevel', 'Functional');
        await allure.label('execution', 'Regression');
        await allure.label('module', 'Chatbot Profile');

        await test.step('Configure and submit Chatbot Profile', async () => {
            await chatbotProfilePage.createChatbotProfile(profileName);
        });

        await test.step('Verify Chatbot Profile was created successfully', async () => {
            await expect(
                chatbotProfilePage.page.getByText(
                    /Chatbot profile created/i
                )
            ).toBeVisible();
        });

    });

});