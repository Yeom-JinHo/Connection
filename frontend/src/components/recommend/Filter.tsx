import { Box, Flex } from "@chakra-ui/react";
import React from "react";

function Filter() {
  return (
    <Box>
      <Flex
        w={24}
        h={10}
        p={2}
        bg="dep_1"
        position="absolute"
        borderRadius="10px"
        shadow="2px 4px 4px rgba(0, 0, 0, 0.25)"
        top={10}
        right={12}
        cursor="pointer"
        justifyContent="center"
        alignItems="center"
      >
        추천 필터 V
        <Flex
          position="absolute"
          top="50px"
          right="0"
          w="300px"
          h="200px"
          bg="dep_2"
          p={6}
          borderRadius="20px"
          zIndex="1"
          cursor="default"
        >
          asd
        </Flex>
      </Flex>
    </Box>
  );
}

export default Filter;
