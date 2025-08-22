# API Testing Suite

This directory contains automated testing scripts for the Django REST API.

## Files

- `test_api.py` - Comprehensive API testing script with detailed output interpretation

## Usage

### Running the API Test Suite

```bash
# From the backend directory
python tests/test_api.py
```

### What the Script Does

The test script performs the following tests in sequence:

1. **Health Check** - Verifies the server is running
2. **User Registration** - Creates a test user account
3. **User Authentication** - Logs in and obtains JWT token
4. **User Profile** - Retrieves user profile information
5. **Journals API** - Tests journals endpoint
6. **Sections API** - Tests sections endpoint
7. **Manuscripts API** - Tests manuscripts endpoint

### Features

- ✅ **Interactive**: Asks for confirmation before running tests
- ✅ **Detailed Output**: Shows success/failure for each test with explanations
- ✅ **Response Data**: Displays actual API responses
- ✅ **Summary Report**: Provides overall success rate and failed tests
- ✅ **Next Steps**: Gives actionable recommendations after testing
- ✅ **Error Handling**: Graceful handling of connection issues and timeouts

### Example Output

```
🚀 Django REST API Testing Suite
==================================================
Enter the base URL for your API (default: https://ajbmr-paj1.onrender.com):
> 

📋 Tests to be performed:
   1. Health Check - Server Status
   2. User Registration
   3. User Authentication (Login)
   4. User Profile Retrieval
   5. Journals API
   6. Sections API
   7. Manuscripts API

⚠️  This will create a test user in your database.
Continue? (y/N): y

============================================================
🧪 Django REST API Testing Suite
============================================================
🌐 Testing API at: https://ajbmr-paj1.onrender.com
⏰ Started at: 2025-08-19 00:20:02

📋 Health Check - Server Status
----------------------------------------
✅ PASS | Server Health Check
   Server is running! (Status: 302, Redirect to admin login)

📋 User Registration
----------------------------------------
✅ PASS | User Registration
   User created successfully! (ID: 2)
   Response: {
     "id": 2,
     "email": "test1734567890@example.com"
   }

📋 User Authentication
----------------------------------------
✅ PASS | User Login
   Login successful! JWT token obtained (expires in 5 minutes)
   Response: {
     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   }

...

============================================================
🧪 Test Summary
============================================================
📊 Total Tests: 7
✅ Passed: 7
❌ Failed: 0
📈 Success Rate: 100.0%

🎉 All tests passed! Your API is working perfectly!

============================================================
🧪 Next Steps
============================================================
🚀 Your API is ready! Here's what you can do next:

1. 📝 Add Test Data:
   • Go to https://ajbmr-paj1.onrender.com/admin/
   • Login with your superuser credentials
   • Add some journals and sections

2. 🔗 Update Frontend:
   • Set NEXT_PUBLIC_API_BASE_URL=https://ajbmr-paj1.onrender.com
   • Test the frontend connection

3. 🔧 Environment Variables (if needed):
   • CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
   • CSRF_TRUSTED_ORIGINS=https://your-frontend-domain.com

4. 📚 Documentation:
   • Check docs/APITesting.md for more test commands
   • Check docs/ConfigurationGuide.md for deployment details

5. 🧪 Manual Testing:
   • Use the curl commands in docs/APITesting.md
   • Test with Postman or similar tools
```

### Testing Different Environments

#### Local Development
```bash
# When prompted for URL, enter:
http://127.0.0.1:8000
```

#### Production (Render)
```bash
# When prompted for URL, enter:
https://ajbmr-paj1.onrender.com
```

#### Custom Domain
```bash
# When prompted for URL, enter your custom domain:
https://your-domain.com
```

### Troubleshooting

#### Connection Timeout
If you get timeout errors:
- Check if the server is running
- Verify the URL is correct
- Check network connectivity
- Try increasing timeout in the script (edit `timeout=10` to `timeout=30`)

#### Authentication Errors
If authentication fails:
- Check if the server is properly configured
- Verify JWT settings in Django
- Check database connection

#### CORS Errors
If you get CORS errors:
- Update `CORS_ALLOWED_ORIGINS` in production settings
- Ensure the frontend domain is included

### Requirements

The script requires the `requests` library:
```bash
pip install requests
```

### Notes

- The script creates a test user with a unique email (timestamp-based)
- JWT tokens expire after 5 minutes
- Test users are created in your actual database
- You can safely run the script multiple times (new users will be created each time)

### Integration with CI/CD

You can run this script in automated testing:
```bash
# Non-interactive mode (for CI/CD)
echo "y" | python tests/test_api.py
```

### Customization

You can modify the script to:
- Add more endpoints to test
- Change timeout values
- Add custom assertions
- Generate test reports
- Send notifications on failures
