import { Input } from "@chakra-ui/react";
export default function CustomInputField() {
    return (
      <Input
        borderRadius="full" // Rounded corners
        color='gray.600'
        bg="gray.300" // Background color
        size="md" // Size of the input field (large in this case)
        placeholder="Search..." // Placeholder text
        _focus={{
          // Styling on focus
          borderColor: 'purple.400', // Border color on focus
          boxShadow: 'outline', // Box shadow on focus
        }}
      />
    );
}