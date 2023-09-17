export default function CustomInputField() {
    return (
      <Input
        borderRadius="full" // Rounded corners
        bg="gray.200" // Background color
        size="lg" // Size of the input field (large in this case)
        placeholder="Search..." // Placeholder text
        _focus={{
          // Styling on focus
          borderColor: 'purple.400', // Border color on focus
          boxShadow: 'outline', // Box shadow on focus
        }}
      />
    );
  }