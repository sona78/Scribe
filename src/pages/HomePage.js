import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import {
  Alert,
  Box,
  Button,
  Typography, 
} from "@chakra-ui/react";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(0)
  const handleChange = (newValue) => {
    setPhone(newValue);
    console.log(newValue);
  };

  const handlePhoneSubmit = async () => {
    matchIsValidTel(phone) ? setError(1) : setError(2)
    let Phone = phone.replace(/\s+/g, '');
    await axios.post(
      `https://sheet.best/api/sheets/070551f7-bd8d-4451-b974-06794e2cd951`,
      { Phone }
    );
    //do a thing
  }
  return (
    //potential Gradient style={{background: 'linear-gradient(to right bottom, #ffffff, #009dff)'}}
    <Box
      p={5}
      display="flex"
      flexDirection={"column"}
      height={"100vh"}
      alignItems={"center"}
      gap={2}
      backgroundColor={"#E8F1F2"}
    >
      <Box
        mt={"12%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={1}
      >
        <CurrencyExchangeIcon htmlColor="#3F88C5" fontSize={"large"} />
        <Typography variant="h2" fontWeight={500} color="#3F88C5">
          Zap
        </Typography>
      </Box>
      <Box textAlign={"center"}>
        <Typography variant="h5" sx={{ display: { xs: "none", sm: "block" } }}>
          Organize payouts and transfer money instantly
        </Typography>
        <Typography variant="h5">Payments made painless</Typography>
      </Box>
      <Box
        height={"50%"}
        width={300}
        display={"flex"}
        flexDirection="column"
        alignItems={"center"}
        gap={1}
      >
        <MuiTelInput
          fullWidth
          defaultCountry="US"
          preferredCountries={["US"]}
          value={phone}
          onChange={handleChange}
          placeholder="Enter phone number"
        />
        <Button variant="contained" onClick={handlePhoneSubmit} fullWidth>
          Get Early Access
        </Button>
        {error==1 &&  <Alert severity="success">
        Phone number submitted!
      </Alert>}
        {error==2 &&  <Alert severity="error">
        Invalid Phone Number!
      </Alert>}
      </Box>
    </Box>
  );
}

export default App;