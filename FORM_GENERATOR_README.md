# No-Code Form Generator

A powerful Angular-based no-code form builder that allows you to create, customize, and manage forms without writing code.

## Features

### 🛠️ Form Builder
- **Create Forms**: Easily create new forms with custom titles and descriptions
- **Add Fields**: Add various field types (text, email, password, number, checkbox, radio, select, textarea, date, file)
- **Field Configuration**:
  - Custom labels and placeholders
  - Help text for users
  - Validation patterns (regex)
  - Min/Max length constraints
  - Required field indicator
  - Options for select and radio buttons
- **Drag & Drop**: Reorder fields using up/down buttons
- **Import/Export**: Save forms as JSON and import them later

### 👁️ Form Viewer
- **Dynamic Forms**: View and fill out created forms
- **Real-time Validation**:
  - Required field validation
  - Email format validation
  - Length validation
  - Pattern validation (regex)
- **Form Submission**: Submit forms and see the collected data
- **Data Display**: View submitted data in JSON format

### 💾 Data Persistence
- Forms are automatically saved to browser localStorage
- Never lose your forms - they persist across sessions

## Getting Started

### Installation

1. Navigate to the project directory:
```bash
cd Nocode
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and go to `http://localhost:4200`

## Usage

### Creating a Form

1. Click **"+ New Form"** button
2. Enter form name, title, and optional description
3. Click **"Create"**
4. Click **"+ Add Field"** to add form fields
5. Configure each field:
   - Set field label (required)
   - Choose field type
   - Add placeholder and help text
   - Set validation rules
   - Mark as required if needed
6. Click **"Save Field"**
7. Reorder fields using ↑ ↓ buttons if needed
8. Click **"💾 Save Form"** to save

### Filling Out a Form

1. Go to the **Viewer** tab
2. Select a form from the list
3. Fill in the required fields
4. Click the **Submit** button
5. View the submitted data displayed below

### Exporting & Importing Forms

**Export a Form:**
- Click **"📥 Export as JSON"** button
- The form configuration will be downloaded as a JSON file

**Import a Form:**
- Click **"📤 Import from JSON"**
- Select a previously exported JSON file
- The form will be added to your forms list

## Form Configuration Example

```json
{
  "id": "form_abc123",
  "name": "Contact Form",
  "title": "Contact Us",
  "description": "Please fill out this form to contact us",
  "fields": [
    {
      "id": "field_1",
      "type": "text",
      "label": "Full Name",
      "placeholder": "Enter your full name",
      "required": true,
      "minLength": 2,
      "maxLength": 100
    },
    {
      "id": "field_2",
      "type": "email",
      "label": "Email Address",
      "placeholder": "your@email.com",
      "required": true,
      "helpText": "We'll never share your email"
    },
    {
      "id": "field_3",
      "type": "select",
      "label": "Subject",
      "required": true,
      "options": ["Sales", "Support", "Other"]
    },
    {
      "id": "field_4",
      "type": "textarea",
      "label": "Message",
      "placeholder": "Your message here...",
      "required": true,
      "minLength": 10
    }
  ],
  "submitButtonText": "Send Message"
}
```

## Field Types

| Type | Description | Options |
|------|-------------|---------|
| **text** | Single line text input | placeholder, minLength, maxLength |
| **email** | Email input with validation | placeholder |
| **password** | Hidden password input | placeholder, minLength, maxLength |
| **number** | Numeric input | minLength, maxLength |
| **checkbox** | Single checkbox | - |
| **radio** | Radio button group | options (required) |
| **select** | Dropdown select | options (required) |
| **textarea** | Multi-line text | placeholder, minLength, maxLength |
| **date** | Date picker | - |
| **file** | File upload | - |

## Validation Rules

All field types support:
- **Required**: Field must be filled
- **Min Length**: Minimum character count
- **Max Length**: Maximum character count
- **Pattern**: Regex pattern validation
- **Email**: Automatic email validation for email type

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Technologies Used

- **Angular 16**: Frontend framework
- **TypeScript**: Programming language
- **Bootstrap 5**: UI styling
- **RxJS**: Reactive programming
- **Angular CDK**: Component development kit
- **LocalStorage**: Client-side data persistence

## Project Structure

```
src/app/form-generator/
├── form-generator.component.ts       # Main component
├── form-generator.component.html     # Navigation template
├── form-generator.service.ts         # State management service
├── form-builder/                     # Form creation module
│   ├── form-builder.component.ts
│   ├── form-builder.component.html
│   └── form-builder.component.css
└── form-viewer/                      # Form viewing/submission module
    ├── form-viewer.component.ts
    ├── form-viewer.component.html
    └── form-viewer.component.css
```

## Tips & Tricks

✅ **Best Practices:**
- Use clear, descriptive field labels
- Add help text for complex fields
- Use placeholder text to guide users
- Mark truly required fields as required
- Test forms before sharing

✅ **Advanced Features:**
- Use regex patterns for custom validation (e.g., `^\d{10}$` for 10-digit phone)
- Set appropriate min/max lengths to prevent data entry errors
- Use select/radio buttons instead of text for predefined options
- Export forms as templates for reuse

## Known Limitations

- File uploads are stored in form data but not persisted to server
- Forms are stored locally in browser (localStorage limit ~5MB)
- Maximum 1000 forms per browser session

## Future Enhancements

- [ ] Backend integration for form storage
- [ ] File upload handling
- [ ] Form analytics and submissions tracking
- [ ] Email notifications on submission
- [ ] Custom CSS styling per form
- [ ] Conditional field visibility
- [ ] Multi-page forms
- [ ] Form collaboration/sharing

## License

This project is part of the Nocode platform.

## Support

For issues or feature requests, please contact the development team.

---

**Happy Form Building! 🚀**
