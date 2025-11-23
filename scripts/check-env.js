#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envLocalPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envLocalPath)) {
    const envContent = fs.readFileSync(envLocalPath, 'utf8');
    envContent.split('\n').forEach(line => {
        line = line.trim();
        if (!line || line.startsWith('#')) return;
        
        const [key, ...valueParts] = line.split('=');
        const value = valueParts.join('=').trim();
        
        if (key && value) {
            process.env[key.trim()] = value;
        }
    });
    console.log('📄 Loaded .env.local file\n');
}

const requiredEnvVars = [
    'ADMIN_USERNAME',
    'ADMIN_PASSWORD'
];

const missingVars = [];
const warnings = [];

console.log('🔍 Checking environment variables...\n');

requiredEnvVars.forEach(varName => {
    const value = process.env[varName];

    if (!value) {
        missingVars.push(varName);
    } else {
        console.log(`✅ ${varName} is set`);

        if (varName === 'ADMIN_PASSWORD') {
            if (value.length < 8) {
                warnings.push('⚠️  Password is less than 8 characters');
            }
            if (value === 'admin123' || value === 'password' || value === '123456') {
                warnings.push('⚠️  Using a common/weak password');
            }
        }

        if (varName === 'ADMIN_USERNAME' && value === 'admin') {
            warnings.push('⚠️  Using default username "admin" - consider changing it');
        }
    }
});

console.log('');

if (warnings.length > 0) {
    console.log('⚠️  WARNINGS:');
    warnings.forEach(warning => console.log(warning));
    console.log('');
}

if (missingVars.length > 0) {
    console.error('❌ ERROR: Missing required environment variables:\n');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.error('\n📝 To fix this:');
    console.error('   1. Copy .env.example to .env.local');
    console.error('   2. Edit .env.local and set all required values');
    console.error('   3. Restart your server\n');
    console.error('See SECURITY.md for detailed instructions.\n');
    process.exit(1);
}

console.log('✅ All required environment variables are set!\n');
console.log('🔒 Remember: Never commit .env.local to version control\n');
