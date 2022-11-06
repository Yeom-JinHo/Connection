import { Button, Center, Flex } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";

function ProblemBar() {
  type problemState = "waiting" | "success" | "fail";
  const [state, setState] = useState<problemState>("fail");
  const stateBg = useMemo(() => {
    if (state === "waiting") {
      return "dep_1";
    }
    if (state === "success") {
      return "gra";
    }
    return "red_lin";
  }, [state]);
  return (
    <Center
      w="700px"
      h="64px"
      bg="dep_1"
      borderRadius="12px"
      shadow="2px 4px 4px rgba(0, 0, 0, 0.25)"
      fontSize="20px"
      mb="20px"
      _hover={{ background: "gra" }}
    >
      <Center borderRight="1px solid #b8b8b8" h="48px" p="0 16px">
        123
      </Center>
      <Flex
        borderRight="1px solid #b8b8b8"
        w="480px"
        h="48px"
        p="0 16px"
        justify="space-between"
      >
        <Center>123</Center>
        <Center>
          <Button bg="transparent" _hover={{ background: "transparent" }}>
            문제풀기
          </Button>
        </Center>
      </Flex>
      <Center borderRight="1px solid #b8b8b8">
        <Button
          bg="transparent"
          _hover={{ background: "transparent" }}
          m="0 8px"
        >
          제출 확인
        </Button>
      </Center>

      <Center p="0 16px">
        <Center borderRadius={50} w="20px" h="20px" bg={stateBg} />
      </Center>
    </Center>
  );
}

export default ProblemBar;
