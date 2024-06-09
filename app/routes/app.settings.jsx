// Import necessary libraries and components
import { json } from "@remix-run/node"; // Used for JSON responses in Remix
import { Form, useActionData, useLoaderData } from "@remix-run/react"; // Hooks for form handling and data loading in Remix
import {
  BlockStack,
  Box,
  Button,
  Card,
  InlineGrid,
  Page,
  Text,
  TextField,
} from "@shopify/polaris"; // Shopify Polaris components for UI
import { useState } from "react"; // React hook for managing state

// Loader function to provide initial settings data to the component
export async function loader() {
  // Mock settings data
  let settings = {
    appName: "Wishing List",
    description: "App description",
  };

  // Return the settings data as JSON
  return json({
    appName: settings.appName,
    description: settings.description,
  });
}

// Action function to handle form submission and update data
export async function action({ request }) {
  // Extract form data from the request
  let formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Log the submitted data (for debugging)
  console.log(data);

  // Return the submitted data as JSON
  return json(data);
}

// Main component for the settings page
export default function SettingsPage() {
  // Load initial settings from the loader
  const settings = useLoaderData();

  // Get action data from the form submission
  const actionData = useActionData();

  // Initialize form state with the loaded settings
  const [formState, setFormState] = useState(settings);

  // Render the settings page
  return (
    <Page>
      {/* Title Bar (Note: This should be corrected to TitleBar if using Shopify App Bridge) */}
      <ui-title-bar title="Settings for app" />

      {/* Main content layout */}
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          {/* Section with headings */}
          <Box
            as="section"
            paddingInlineStart={{ xs: "400", sm: "00" }}
            paddingInlineEnd={{ xs: "400", sm: "00" }}
          >
            <BlockStack>
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app settings and performance.
              </Text>
            </BlockStack>
          </Box>

          {/* Form Card */}
          <Card>
            {/* Display action response if available */}
            {actionData ? <p>Updated Name: {actionData.name}</p> : null}

            {/* Form for updating settings */}
            <Form method="post">
              <BlockStack gap={300}>
                {/* TextField for App Name */}
                <TextField
                  name="name"
                  label="App Name"
                  value={formState.appName}
                  onChange={(value) =>
                    setFormState({ ...formState, appName: value })
                  }
                />
                {/* TextField for Description */}
                <TextField
                  name="description"
                  label="Description"
                  value={formState.description}
                  onChange={(value) =>
                    setFormState({ ...formState, description: value })
                  }
                />
                {/* Submit button */}
                <Button submit={true}>Save</Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}
