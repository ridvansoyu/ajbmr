# Notification System Documentation

## Overview

This project uses **notistack** for managing notifications throughout the application. The notification system is centralized and provides a consistent way to display success, error, warning, and info messages to users.

## Features

- ✅ **Centralized Messages**: All notification messages are stored in one file
- ✅ **Multi-language Support**: Messages in English and Turkish
- ✅ **Type Safety**: TypeScript support with predefined notification keys
- ✅ **Easy Integration**: Simple hook-based API
- ✅ **Consistent Styling**: Uniform notification appearance
- ✅ **Auto-dismiss**: Notifications automatically disappear after 4 seconds

## Installation

Notistack is already installed in the project:

```bash
npm install notistack
```

## Setup

The notification system is already configured in the app layout:

```typescript
// frontend/src/app/layout.tsx
import { NotificationProvider } from '@/context/NotificationContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <NotificationProvider>
            <AuthProvider>
              {/* Your app content */}
            </AuthProvider>
          </NotificationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
```

## Usage

### 1. Import the Hook

```typescript
import { useNotification } from '@/context/NotificationContext';
```

### 2. Use in Your Component

```typescript
const MyComponent = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();

  const handleSave = async () => {
    try {
      await saveData();
      showSuccess('PROFILE.SAVE_SUCCESS');
    } catch (error) {
      showError('PROFILE.SAVE_ERROR');
    }
  };

  return (
    <button onClick={handleSave}>
      Save Profile
    </button>
  );
};
```

## Available Notification Methods

| Method | Description | Example |
|--------|-------------|---------|
| `showSuccess(key)` | Shows a green success notification | `showSuccess('PROFILE.SAVE_SUCCESS')` |
| `showError(key)` | Shows a red error notification | `showError('AUTH.LOGIN_ERROR')` |
| `showWarning(key)` | Shows a yellow warning notification | `showWarning('FORM.REQUIRED_FIELDS')` |
| `showInfo(key)` | Shows a blue info notification | `showInfo('GENERAL.LOADING')` |
| `showNotification(key, variant)` | Shows notification with custom variant | `showNotification('CUSTOM.MESSAGE', 'warning')` |

## Available Notification Keys

### Authentication (AUTH)
- `AUTH.LOGIN_SUCCESS` - Successful login
- `AUTH.LOGIN_ERROR` - Login failed
- `AUTH.LOGOUT_SUCCESS` - Successful logout
- `AUTH.REGISTER_SUCCESS` - Successful registration
- `AUTH.REGISTER_ERROR` - Registration failed
- `AUTH.UNAUTHORIZED` - User not authenticated

### Profile (PROFILE)
- `PROFILE.UPDATE_SUCCESS` - Profile updated successfully
- `PROFILE.UPDATE_ERROR` - Profile update failed
- `PROFILE.FETCH_ERROR` - Failed to load profile
- `PROFILE.SAVE_SUCCESS` - Profile saved successfully
- `PROFILE.SAVE_ERROR` - Profile save failed

### Manuscript (MANUSCRIPT)
- `MANUSCRIPT.SUBMIT_SUCCESS` - Manuscript submitted successfully
- `MANUSCRIPT.SUBMIT_ERROR` - Manuscript submission failed
- `MANUSCRIPT.UPDATE_SUCCESS` - Manuscript updated successfully
- `MANUSCRIPT.DELETE_SUCCESS` - Manuscript deleted successfully

### General (GENERAL)
- `GENERAL.LOADING` - Loading message
- `GENERAL.SUCCESS` - General success message
- `GENERAL.ERROR` - General error message
- `GENERAL.NETWORK_ERROR` - Network error
- `GENERAL.VALIDATION_ERROR` - Validation error

### Form (FORM)
- `FORM.REQUIRED_FIELDS` - Required fields missing
- `FORM.INVALID_EMAIL` - Invalid email format
- `FORM.PASSWORD_MISMATCH` - Passwords don't match
- `FORM.WEAK_PASSWORD` - Password too weak

## Adding New Notifications

### 1. Add to Constants File

```typescript
// frontend/src/constants/notifications.ts
export const NOTIFICATIONS = {
  // ... existing notifications
  NEW_SECTION: {
    CREATE_SUCCESS: {
      en: 'New section created successfully!',
      tr: 'Yeni bölüm başarıyla oluşturuldu!'
    },
    CREATE_ERROR: {
      en: 'Failed to create new section.',
      tr: 'Yeni bölüm oluşturulamadı.'
    }
  }
};
```

### 2. Add to TypeScript Types

```typescript
// frontend/src/constants/notifications.ts
export type NotificationKey = 
  // ... existing keys
  | 'NEW_SECTION.CREATE_SUCCESS'
  | 'NEW_SECTION.CREATE_ERROR';
```

### 3. Use in Your Component

```typescript
const MyComponent = () => {
  const { showSuccess, showError } = useNotification();

  const createSection = async () => {
    try {
      await api.createSection(data);
      showSuccess('NEW_SECTION.CREATE_SUCCESS');
    } catch (error) {
      showError('NEW_SECTION.CREATE_ERROR');
    }
  };
};
```

## Configuration

The notification system is configured in `NotificationProvider`:

```typescript
<SnackbarProvider
  maxSnack={3}                    // Maximum 3 notifications at once
  anchorOrigin={{
    vertical: 'top',              // Position at top
    horizontal: 'right',          // Position at right
  }}
  autoHideDuration={4000}         // Auto-hide after 4 seconds
  preventDuplicate               // Prevent duplicate notifications
>
```

## Testing

You can test the notification system using the example component:

```typescript
import NotificationExample from '@/components/examples/NotificationExample';

// Add to any page for testing
<NotificationExample />
```

## Best Practices

1. **Use Predefined Keys**: Always use predefined notification keys instead of hardcoded messages
2. **Consistent Naming**: Follow the `SECTION.ACTION_RESULT` naming convention
3. **Multi-language**: Always provide both English and Turkish translations
4. **Appropriate Types**: Use the correct notification type (success, error, warning, info)
5. **Error Handling**: Always show notifications in try-catch blocks
6. **User Feedback**: Provide immediate feedback for user actions

## Examples

### Form Submission
```typescript
const handleSubmit = async (formData) => {
  try {
    await submitForm(formData);
    showSuccess('FORM.SUBMIT_SUCCESS');
  } catch (error) {
    showError('FORM.SUBMIT_ERROR');
  }
};
```

### Data Loading
```typescript
const loadData = async () => {
  try {
    showInfo('GENERAL.LOADING');
    const data = await fetchData();
    // Data loaded successfully
  } catch (error) {
    showError('GENERAL.NETWORK_ERROR');
  }
};
```

### Validation
```typescript
const validateForm = () => {
  if (!email) {
    showWarning('FORM.REQUIRED_FIELDS');
    return false;
  }
  if (!isValidEmail(email)) {
    showError('FORM.INVALID_EMAIL');
    return false;
  }
  return true;
};
```

## Troubleshooting

### Notifications Not Showing
1. Check if `NotificationProvider` is wrapped around your component
2. Verify the notification key exists in the constants file
3. Ensure the component is using the `useNotification` hook correctly

### TypeScript Errors
1. Make sure the notification key is added to the `NotificationKey` type
2. Check that the key follows the correct naming convention

### Language Issues
1. Verify both English and Turkish translations are provided
2. Check that the `useLanguage` hook is working correctly
