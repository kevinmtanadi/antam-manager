import { createMultiStyleConfigHelpers, extendTheme } from "@chakra-ui/react";
import { cardAnatomy } from '@chakra-ui/anatomy'


const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
    container: {
        borderRadius: "7px",
        dropShadow: "none",
    }
})
export const cardTheme = defineMultiStyleConfig({ baseStyle })


const theme = extendTheme({
    components: {
        Card: cardTheme,
    },
    breakpoints: {
        base: "0px",
        sm: "480px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
        xxl: "1600px", // Add your custom breakpoint size
      },
});

export default theme;