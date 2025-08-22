# API Testing Guide

This guide provides curl commands to test your Django REST API endpoints on the cloud deployment.

## Base URL

Replace `YOUR_RENDER_DOMAIN` with your actual Render domain (e.g., `ajbmr-paj1.onrender.com`):

```bash
BASE_URL="https://YOUR_RENDER_DOMAIN"
```

## 1. Test Journals Endpoint (Public)

### List all journals
```bash
curl -X GET "${BASE_URL}/api/journals/journals/" \
  -H "Content-Type: application/json" \
  -v
```

### Get a specific journal (replace {id} with actual journal ID)
```bash
curl -X GET "${BASE_URL}/api/journals/journals/1/" \
  -H "Content-Type: application/json" \
  -v
```

### List all sections
```bash
curl -X GET "${BASE_URL}/api/journals/sections/" \
  -H "Content-Type: application/json" \
  -v
```

## 2. Test Authentication Endpoints

### Register a new user
```bash
curl -X POST "${BASE_URL}/api/users/register/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!",
    "first_name": "Test",
    "last_name": "User",
    "organization": "Test University",
    "biography": "Test bio"
  }' \
  -v
```

### Login to get JWT token
```bash
curl -X POST "${BASE_URL}/api/users/token/" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test@example.com",
    "password": "TestPass123!"
  }' \
  -v
```

## 3. Test Protected Endpoints (Requires JWT)

### Get user profile (requires authentication)
```bash
# First, get the token from login response, then use it:
TOKEN="YOUR_JWT_TOKEN_HERE"

curl -X GET "${BASE_URL}/api/users/profile/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${TOKEN}" \
  -v
```

### Update user profile
```bash
curl -X PUT "${BASE_URL}/api/users/profile/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{
    "first_name": "Updated",
    "last_name": "Name",
    "affiliation": "Updated University",
    "bio": "Updated biography",
    "mobile_phone": "+1234567890",
    "title": "Professor"
  }' \
  -v
```

## 4. Test Manuscripts Endpoints (Protected)

### List manuscripts (requires authentication)
```bash
curl -X GET "${BASE_URL}/api/manuscripts/manuscripts/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${TOKEN}" \
  -v
```

### Create a new manuscript
```bash
curl -X POST "${BASE_URL}/api/manuscripts/manuscripts/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{
    "title": "Test Manuscript",
    "abstract": "This is a test manuscript abstract",
    "keywords": "test, research, academic",
    "manuscript_type": "research_article"
  }' \
  -v
```

## 5. Automated Test Script

We've created a comprehensive automated test script that you can use:

```bash
# From the backend directory
python tests/test_api.py
```

This script will:
- Ask for your API URL (defaults to production)
- Run all tests automatically
- Show detailed results for each test
- Provide a summary report
- Give you next steps

For more details, see `backend/tests/README.md`.

## 6. Manual Test Script

If you prefer manual testing, here's a bash script:

```bash
#!/bin/bash

# Set your Render domain
BASE_URL="https://ajbmr-paj1.onrender.com"

echo "🧪 Testing Journals API..."
echo "=========================="

# Test journals endpoint
echo "📚 Testing journals list..."
curl -s -X GET "${BASE_URL}/api/journals/journals/" \
  -H "Content-Type: application/json" | jq '.'

echo -e "\n📖 Testing sections list..."
curl -s -X GET "${BASE_URL}/api/journals/sections/" \
  -H "Content-Type: application/json" | jq '.'

echo -e "\n🔐 Testing authentication..."
echo "=========================="

# Test registration
echo "📝 Testing user registration..."
REGISTER_RESPONSE=$(curl -s -X POST "${BASE_URL}/api/users/register/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test'$(date +%s)'@example.com",
    "password": "TestPass123!",
    "first_name": "Test",
    "last_name": "User",
    "organization": "Test University"
  }')

echo $REGISTER_RESPONSE | jq '.'

# Test login
echo -e "\n🔑 Testing login..."
LOGIN_RESPONSE=$(curl -s -X POST "${BASE_URL}/api/users/token/" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test@example.com",
    "password": "TestPass123!"
  }')

echo $LOGIN_RESPONSE | jq '.'

# Extract token
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.access')

if [ "$TOKEN" != "null" ] && [ "$TOKEN" != "" ]; then
    echo -e "\n👤 Testing authenticated endpoints..."
    echo "=========================="
    
    # Test profile
    echo "📋 Testing user profile..."
    curl -s -X GET "${BASE_URL}/api/users/profile/" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer ${TOKEN}" | jq '.'
    
    echo -e "\n✅ All tests completed!"
else
    echo -e "\n❌ Failed to get authentication token"
fi
```

## 6. Windows PowerShell Commands

For Windows users, here are PowerShell equivalents:

### Test journals endpoint
```powershell
$baseUrl = "https://ajbmr-paj1.onrender.com"

# Test journals
Invoke-RestMethod -Uri "$baseUrl/api/journals/journals/" -Method GET -ContentType "application/json"

# Test sections
Invoke-RestMethod -Uri "$baseUrl/api/journals/sections/" -Method GET -ContentType "application/json"
```

### Test authentication
```powershell
# Register user
$registerBody = @{
    email = "test@example.com"
    password = "TestPass123!"
    first_name = "Test"
    last_name = "User"
    organization = "Test University"
} | ConvertTo-Json

$registerResponse = Invoke-RestMethod -Uri "$baseUrl/api/users/register/" -Method POST -Body $registerBody -ContentType "application/json"

# Login
$loginBody = @{
    username = "test@example.com"
    password = "TestPass123!"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "$baseUrl/api/users/token/" -Method POST -Body $loginBody -ContentType "application/json"

# Use token for authenticated requests
$headers = @{
    "Authorization" = "Bearer $($loginResponse.access)"
    "Content-Type" = "application/json"
}

$profileResponse = Invoke-RestMethod -Uri "$baseUrl/api/users/profile/" -Method GET -Headers $headers
```

## 7. Common Issues and Solutions

### CORS Issues
If you get CORS errors, ensure your production settings include the correct origins:
```bash
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Authentication Issues
- Check if the JWT token is valid and not expired
- Ensure the Authorization header format is correct: `Bearer <token>`
- Verify the user has the required permissions

### Database Issues
- Ensure your Render PostgreSQL database is running
- Check that migrations have been applied
- Verify database connection settings

## 8. Health Check

Test if your backend is running:
```bash
curl -X GET "${BASE_URL}/admin/" -v
```

This should return a 302 redirect to the login page, indicating the server is running.

## 9. Environment-Specific Testing

### Local Development
```bash
BASE_URL="http://127.0.0.1:8000"
```

### Production (Render)
```bash
BASE_URL="https://ajbmr-paj1.onrender.com"
```

Remember to replace `ajbmr-paj1.onrender.com` with your actual Render domain!
