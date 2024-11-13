```html
<motion.div>  // Root container with animation
  <div>  // Inner container (padding)
    <h2>  // Heading for the page-- Signup Page

    <form>  // Form container
      <Input />  // Full Name input
      <Input />  // Email Address input
      <Input />  // Password input
      {error && <p>}  // Error message if any
      <PasswordStrengthMeter />  // Password strength indicator

      <motion.button>  // Submit button with animation
        {isLoading ? <Loader /> : "Sign Up"}  // Loader or text inside button
      </motion.button>
    </form>
  </div>

  <div>  // Footer container
    <p>  // Message for existing users
      <Link />  // Login link
    </p>
  </div>
</motion.div>
```


Login Page

```html
<motion.div>  // Main container with Framer Motion animation
├── <div>  // Inner container with padding
│   ├── <h2>  // Title: "Welcome Back"
│   ├── <form>  // Login form
│   │   ├── <Input>  // Email input component
│   │   ├── <Input>  // Password input component
│   │   ├── <div>  // Forgot password link
│   │   │   └── <Link>  // Link to "Forgot Password" page
│   │   ├── {error && <p>}  // Error message, conditional on `error` presence
│   │   └── <motion.button>  // Submit button, with conditional loading spinner
├── <div>  // Bottom container for signup link
│   └── <p>  // Signup prompt text
│       └── <Link>  // Link to "Sign up" page
</motion.div>
```
