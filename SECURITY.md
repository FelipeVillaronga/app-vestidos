# Security Configuration

## Environment Variables

This application uses environment variables to store sensitive configuration securely.

### Setup Instructions

1. **Create your local environment file:**

   ```bash
   cp .env.example .env.local
   ```

2. **Update `.env.local` with your credentials:**

   ```env
   ADMIN_USERNAME=your-admin-username
   ADMIN_PASSWORD=your-secure-password
   ```

3. **Restart your development server:**
   ```bash
   npm run dev
   ```

### Important Security Notes

⚠️ **NEVER commit `.env.local` to version control!**

- The `.env.local` file contains sensitive credentials
- It is already included in `.gitignore`
- Always verify it's not staged before committing

⚠️ **Change default credentials in production!**

- The example credentials are NOT secure
- Use strong, unique passwords
- Consider using a password manager to generate secure passwords

⚠️ **Environment Variables Required:**

- `ADMIN_USERNAME` - The admin username for accessing the admin panel
- `ADMIN_PASSWORD` - The admin password for authentication

### Password Requirements (Recommended)

For production environments, use passwords that:

- Are at least 12 characters long
- Include uppercase and lowercase letters
- Include numbers and special characters
- Are unique and not reused from other services

### Troubleshooting

**Error: "Server configuration error"**

- Ensure `.env.local` exists in the project root
- Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set
- Restart your development server after creating/modifying `.env.local`

**Cannot login with credentials:**

- Check that `.env.local` has the correct values
- Ensure there are no extra spaces or quotes around values
- Restart the server after changing environment variables
