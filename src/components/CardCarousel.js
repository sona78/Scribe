import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Text } from "@chakra-ui/layout";

// If you want to use your own Selectors look up the Advancaed Story book examples
const CardCarousel = ({ cards }) => {
  return (
    <Carousel infiniteLoop>
      {cards.map((card) => {
        return <Box height={32} bg="gray.200">
            <Text>card.text</Text>
          </Box>
          
      })}
    </Carousel>
  );
};

export default CardCarousel;