#!/usr/bin/env python3
"""
Comprehensive API Testing Script for Django REST Backend
This script tests all major endpoints with detailed output interpretation.
"""

import requests
import json
import sys
import time
from datetime import datetime
import os

class APITester:
    def __init__(self, base_url):
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        self.token = None
        self.test_user = None
        self.results = []
        
    def print_header(self, title):
        """Print a formatted header."""
        print(f"\n{'='*60}")
        print(f"🧪 {title}")
        print(f"{'='*60}")
        
    def print_section(self, title):
        """Print a formatted section header."""
        print(f"\n📋 {title}")
        print(f"{'-'*40}")
        
    def print_result(self, test_name, success, message, response_data=None):
        """Print formatted test result."""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} | {test_name}")
        print(f"   {message}")
        if response_data:
            print(f"   Response: {json.dumps(response_data, indent=2)}")
        
        self.results.append({
            'test': test_name,
            'success': success,
            'message': message,
            'data': response_data
        })
        
    def test_health_check(self):
        """Test if the server is running."""
        self.print_section("Health Check - Server Status")
        
        try:
            response = self.session.get(f"{self.base_url}/admin/", timeout=10)
            
            if response.status_code == 302:
                self.print_result(
                    "Server Health Check",
                    True,
                    f"Server is running! (Status: {response.status_code}, Redirect to admin login)"
                )
            elif response.status_code == 200:
                self.print_result(
                    "Server Health Check",
                    True,
                    f"Server is running! (Status: {response.status_code})"
                )
            else:
                self.print_result(
                    "Server Health Check",
                    False,
                    f"Unexpected status code: {response.status_code}"
                )
                
        except requests.exceptions.RequestException as e:
            self.print_result(
                "Server Health Check",
                False,
                f"Connection failed: {str(e)}"
            )
            
    def test_registration(self):
        """Test user registration."""
        self.print_section("User Registration")
        
        # Generate unique email
        timestamp = int(time.time())
        email = f"test{timestamp}@example.com"
        self.test_user = {
            'email': email,
            'password': 'TestPass123!',
            'first_name': 'Test',
            'last_name': 'User',
            'organization': 'Test University'
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/api/users/register/",
                json=self.test_user,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 201:
                data = response.json()
                self.print_result(
                    "User Registration",
                    True,
                    f"User created successfully! (ID: {data.get('id', 'N/A')})",
                    data
                )
            else:
                self.print_result(
                    "User Registration",
                    False,
                    f"Registration failed! (Status: {response.status_code})",
                    response.json() if response.content else None
                )
                
        except requests.exceptions.RequestException as e:
            self.print_result(
                "User Registration",
                False,
                f"Request failed: {str(e)}"
            )
            
    def test_login(self):
        """Test user login and get JWT token."""
        self.print_section("User Authentication")
        
        if not self.test_user:
            self.print_result(
                "User Login",
                False,
                "No test user available for login"
            )
            return
            
        try:
            response = self.session.post(
                f"{self.base_url}/api/users/token/",
                json={
                    'username': self.test_user['email'],
                    'password': self.test_user['password']
                },
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                self.token = data.get('access')
                
                if self.token:
                    self.print_result(
                        "User Login",
                        True,
                        f"Login successful! JWT token obtained (expires in 5 minutes)",
                        {'access_token': self.token[:50] + '...', 'refresh_token': data.get('refresh', 'N/A')[:50] + '...'}
                    )
                else:
                    self.print_result(
                        "User Login",
                        False,
                        "Login successful but no access token received"
                    )
            else:
                self.print_result(
                    "User Login",
                    False,
                    f"Login failed! (Status: {response.status_code})",
                    response.json() if response.content else None
                )
                
        except requests.exceptions.RequestException as e:
            self.print_result(
                "User Login",
                False,
                f"Request failed: {str(e)}"
            )
            
    def test_profile(self):
        """Test user profile endpoint."""
        self.print_section("User Profile")
        
        if not self.token:
            self.print_result(
                "User Profile",
                False,
                "No authentication token available"
            )
            return
            
        try:
            response = self.session.get(
                f"{self.base_url}/api/users/profile/",
                headers={
                    'Authorization': f'Bearer {self.token}',
                    'Content-Type': 'application/json'
                },
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                self.print_result(
                    "User Profile",
                    True,
                    f"Profile retrieved successfully!",
                    data
                )
            else:
                self.print_result(
                    "User Profile",
                    False,
                    f"Profile retrieval failed! (Status: {response.status_code})",
                    response.json() if response.content else None
                )
                
        except requests.exceptions.RequestException as e:
            self.print_result(
                "User Profile",
                False,
                f"Request failed: {str(e)}"
            )
            
    def test_journals(self):
        """Test journals endpoint."""
        self.print_section("Journals API")
        
        if not self.token:
            self.print_result(
                "Journals List",
                False,
                "No authentication token available"
            )
            return
            
        try:
            response = self.session.get(
                f"{self.base_url}/api/journals/journals/",
                headers={
                    'Authorization': f'Bearer {self.token}',
                    'Content-Type': 'application/json'
                },
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                count = len(data) if isinstance(data, list) else 0
                self.print_result(
                    "Journals List",
                    True,
                    f"Journals retrieved successfully! ({count} journals found)",
                    data
                )
            else:
                self.print_result(
                    "Journals List",
                    False,
                    f"Journals retrieval failed! (Status: {response.status_code})",
                    response.json() if response.content else None
                )
                
        except requests.exceptions.RequestException as e:
            self.print_result(
                "Journals List",
                False,
                f"Request failed: {str(e)}"
            )
            
    def test_sections(self):
        """Test sections endpoint."""
        self.print_section("Sections API")
        
        if not self.token:
            self.print_result(
                "Sections List",
                False,
                "No authentication token available"
            )
            return
            
        try:
            response = self.session.get(
                f"{self.base_url}/api/journals/sections/",
                headers={
                    'Authorization': f'Bearer {self.token}',
                    'Content-Type': 'application/json'
                },
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                count = len(data) if isinstance(data, list) else 0
                self.print_result(
                    "Sections List",
                    True,
                    f"Sections retrieved successfully! ({count} sections found)",
                    data
                )
            else:
                self.print_result(
                    "Sections List",
                    False,
                    f"Sections retrieval failed! (Status: {response.status_code})",
                    response.json() if response.content else None
                )
                
        except requests.exceptions.RequestException as e:
            self.print_result(
                "Sections List",
                False,
                f"Request failed: {str(e)}"
            )
            
    def test_manuscripts(self):
        """Test manuscripts endpoint."""
        self.print_section("Manuscripts API")
        
        if not self.token:
            self.print_result(
                "Manuscripts List",
                False,
                "No authentication token available"
            )
            return
            
        try:
            response = self.session.get(
                f"{self.base_url}/api/manuscripts/manuscripts/",
                headers={
                    'Authorization': f'Bearer {self.token}',
                    'Content-Type': 'application/json'
                },
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                count = len(data) if isinstance(data, list) else 0
                self.print_result(
                    "Manuscripts List",
                    True,
                    f"Manuscripts retrieved successfully! ({count} manuscripts found)",
                    data
                )
            else:
                self.print_result(
                    "Manuscripts List",
                    False,
                    f"Manuscripts retrieval failed! (Status: {response.status_code})",
                    response.json() if response.content else None
                )
                
        except requests.exceptions.RequestException as e:
            self.print_result(
                "Manuscripts List",
                False,
                f"Request failed: {str(e)}"
            )
            
    def print_summary(self):
        """Print test summary."""
        self.print_header("Test Summary")
        
        total_tests = len(self.results)
        passed_tests = sum(1 for result in self.results if result['success'])
        failed_tests = total_tests - passed_tests
        
        print(f"📊 Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"📈 Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print(f"\n❌ Failed Tests:")
            for result in self.results:
                if not result['success']:
                    print(f"   • {result['test']}: {result['message']}")
                    
        if passed_tests == total_tests:
            print(f"\n🎉 All tests passed! Your API is working perfectly!")
        else:
            print(f"\n⚠️  Some tests failed. Check the details above.")
            
    def print_next_steps(self):
        """Print next steps for the user."""
        self.print_header("Next Steps")
        
        print("🚀 Your API is ready! Here's what you can do next:")
        print()
        print("1. 📝 Add Test Data:")
        print("   • Go to https://ajbmr-paj1.onrender.com/admin/")
        print("   • Login with your superuser credentials")
        print("   • Add some journals and sections")
        print()
        print("2. 🔗 Update Frontend:")
        print("   • Set NEXT_PUBLIC_API_BASE_URL=https://ajbmr-paj1.onrender.com")
        print("   • Test the frontend connection")
        print()
        print("3. 🔧 Environment Variables (if needed):")
        print("   • CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com")
        print("   • CSRF_TRUSTED_ORIGINS=https://your-frontend-domain.com")
        print()
        print("4. 📚 Documentation:")
        print("   • Check docs/APITesting.md for more test commands")
        print("   • Check docs/ConfigurationGuide.md for deployment details")
        print()
        print("5. 🧪 Manual Testing:")
        print("   • Use the curl commands in docs/APITesting.md")
        print("   • Test with Postman or similar tools")
        
    def run_all_tests(self):
        """Run all tests in sequence."""
        self.print_header("Django REST API Testing Suite")
        print(f"🌐 Testing API at: {self.base_url}")
        print(f"⏰ Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        # Run tests in order
        self.test_health_check()
        self.test_registration()
        self.test_login()
        self.test_profile()
        self.test_journals()
        self.test_sections()
        self.test_manuscripts()
        
        # Print results
        self.print_summary()
        self.print_next_steps()

def main():
    """Main function with user interaction."""
    print("🚀 Django REST API Testing Suite")
    print("=" * 50)
    
    # Get base URL from user
    default_url = "https://ajbmr-paj1.onrender.com"
    print(f"Enter the base URL for your API (default: {default_url}):")
    user_input = input("> ").strip()
    
    base_url = user_input if user_input else default_url
    
    print(f"\n📋 Tests to be performed:")
    print("   1. Health Check - Server Status")
    print("   2. User Registration")
    print("   3. User Authentication (Login)")
    print("   4. User Profile Retrieval")
    print("   5. Journals API")
    print("   6. Sections API")
    print("   7. Manuscripts API")
    
    print(f"\n⚠️  This will create a test user in your database.")
    confirm = input("Continue? (y/N): ").strip().lower()
    
    if confirm not in ['y', 'yes']:
        print("❌ Testing cancelled.")
        return
        
    try:
        # Create tester and run tests
        tester = APITester(base_url)
        tester.run_all_tests()
        
    except KeyboardInterrupt:
        print("\n\n❌ Testing interrupted by user.")
    except Exception as e:
        print(f"\n❌ Unexpected error: {str(e)}")
        print("Please check your API URL and try again.")

if __name__ == "__main__":
    main()
