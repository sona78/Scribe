import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Text } from "@chakra-ui/layout";

// If you want to use your own Selectors look up the Advancaed Story book examples
const CardCarousel = ({ cards }) => {
  return (
    <div className="carousel">
      <Carousel infiniteLoop>
        {cards.map((card) => {
          return <Box bg="gray.200" h='calc(40vh)'>
              <Text>card.text</Text>
            </Box>
            
        })}
      </Carousel>
    </div>
    
  );
};

export default CardCarousel;