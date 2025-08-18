#!/usr/bin/env python3
"""
Local Development Setup Script
This script helps you set up your local development environment.
"""

import os
import subprocess
import sys
from pathlib import Path

def generate_secret_key():
    """Generate a new Django secret key."""
    try:
        result = subprocess.run([
            sys.executable, '-c', 
            'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
        ], capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError:
        return '$y5ib+k(a@4_dvb)u!fq&$xf9^9b%=42(&klab!hn6t2hc+65x'

def create_env_file():
    """Create .env file with local development settings."""
    env_content = f"""# Django Settings
DJANGO_SECRET_KEY={generate_secret_key()}
DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost

# PostgreSQL Database Configuration (Local Development)
# Option A: Individual variables
POSTGRES_DB=ajbmrdb
POSTGRES_USER=journal_admin
POSTGRES_PASSWORD=Journal!2025
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432

# Option B: DATABASE_URL (alternative)
# DATABASE_URL=postgres://journal_admin:Journal!2025@127.0.0.1:5432/ajbmrdb

# CORS Settings (Local Development)
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
CSRF_TRUSTED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
"""
    
    env_path = Path('.env')
    if env_path.exists():
        print("⚠️  .env file already exists. Skipping creation.")
        return
    
    with open(env_path, 'w') as f:
        f.write(env_content)
    print("✅ Created .env file with local development settings")

def check_postgres_connection():
    """Check if PostgreSQL is accessible."""
    try:
        import psycopg
        from dotenv import load_dotenv
        
        load_dotenv()
        
        conn = psycopg.connect(
            dbname=os.getenv('POSTGRES_DB'),
            user=os.getenv('POSTGRES_USER'),
            password=os.getenv('POSTGRES_PASSWORD'),
            host=os.getenv('POSTGRES_HOST'),
            port=os.getenv('POSTGRES_PORT')
        )
        conn.close()
        print("✅ PostgreSQL connection successful")
        return True
    except Exception as e:
        print(f"❌ PostgreSQL connection failed: {e}")
        return False

def run_migrations():
    """Run Django migrations."""
    try:
        subprocess.run([sys.executable, 'manage.py', 'migrate'], check=True)
        print("✅ Database migrations completed")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Migration failed: {e}")
        return False

def create_superuser():
    """Create a superuser account."""
    try:
        subprocess.run([sys.executable, 'manage.py', 'createsuperuser'], check=True)
        print("✅ Superuser created successfully")
        return True
    except subprocess.CalledProcessError:
        print("⚠️  Superuser creation skipped or failed")
        return False

def main():
    """Main setup function."""
    print("🚀 Setting up local development environment...")
    print()
    
    # Create .env file
    create_env_file()
    print()
    
    # Check PostgreSQL connection
    print("🔍 Checking PostgreSQL connection...")
    if not check_postgres_connection():
        print()
        print("📋 To set up PostgreSQL:")
        print("1. Install PostgreSQL on your system, OR")
        print("2. Use Docker: docker-compose up -d postgres")
        print("3. Create database and user:")
        print("   CREATE DATABASE ajbmrdb;")
        print("   CREATE USER journal_admin WITH PASSWORD 'Journal!2025';")
        print("   GRANT ALL PRIVILEGES ON DATABASE ajbmrdb TO journal_admin;")
        print()
        return
    
    # Run migrations
    print("🔄 Running database migrations...")
    if not run_migrations():
        return
    
    # Create superuser
    print("👤 Creating superuser account...")
    create_superuser()
    
    print()
    print("🎉 Setup complete!")
    print()
    print("📝 Next steps:")
    print("1. Start the development server: python manage.py runserver")
    print("2. Access Django admin: http://127.0.0.1:8000/admin/")
    print("3. Start the frontend: cd ../frontend && npm run dev")
    print()
    print("📚 For more information, see docs/ConfigurationGuide.md")

if __name__ == '__main__':
    main()
