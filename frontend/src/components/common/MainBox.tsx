import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { v4 } from "uuid";
import TMP from "../../asset/img/tmp.png";
import { BoxDataProp } from "../../asset/data/main";

interface MainBoxProps {
  dir: string;
  data: BoxDataProp;
}

function MainBox({ dir, data }: MainBoxProps) {
  return (
    <Flex my="60px" w="100%" flexDir={dir === "right" ? "row" : "row-reverse"}>
      <Box w="50%">
        <Image src={TMP} alt="info_img" w="380px" />
      </Box>
      <Box
        w="50%"
        display="flex"
        flexDir="column"
        justifyContent="space-evenly"
      >
        <Text color="main" fontSize="16px" fontWeight="bold">
          {data.category}
        </Text>
        {data.title.map(line => {
          return (
            <Text fontSize="24px" fontWeight="bold" key={v4()}>
              {line}
            </Text>
          );
        })}
        <Box>
          {data.content.map(line => {
            return (
              <Text fontSize="14px" key={v4()}>
                {line}
              </Text>
            );
          })}
        </Box>
      </Box>
    </Flex>
  );
}

export default MainBox;