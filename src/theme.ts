import { createMultiStyleConfigHelpers, extendTheme } from "@chakra-ui/react";
import { cardAnatomy } from '@chakra-ui/anatomy'


const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
    container: {
        borderRadius: "3px",
    }
})
export const cardTheme = defineMultiStyleConfig({ baseStyle })


const theme = extendTheme({
    components: {
        Card: cardTheme,
    },
});

export default theme;