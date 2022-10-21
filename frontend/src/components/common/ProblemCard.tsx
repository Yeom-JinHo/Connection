import React from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";

// props: problem:{title,tags:[tag],spendTime,difficulty}, button
function ProblemCard() {
  return (
    <Box
      bg="dep_1"
      borderRadius="20px"
      p="20px"
      boxShadow="0 4px 4px rgba(0,0,0,0.25)"
    >
      <Box borderBottom="1px" borderColor="border_gray" pb="20px" mb="20px">
        <Flex justifyContent="space-between" mt="10px" mb="10px">
          <Flex>
            <Text fontSize="24px" fontWeight="bold">
              징검다리 달리기
            </Text>
            <Icon as={FiExternalLink} w="7" h="7">
              아이콘
            </Icon>
          </Flex>
          {/* 컴포넌트 props로 받아서 구현 */}
          <Icon as={AiOutlinePlus} w="7" h="7" />
        </Flex>
        <Flex gap="8px">
          <Box bg="gra" w="fit-content" p="4px 16px" borderRadius="15px">
            #DFS
          </Box>
          <Box bg="gra" w="fit-content" p="4px 16px" borderRadius="15px">
            #그리디
          </Box>
        </Flex>
      </Box>
      <Box>
        <Text mb="10px">소요시간 : 1:10:20</Text>
        <Text>체감 난이도 : 골드3</Text>
      </Box>
    </Box>
  );
}
export default ProblemCard;
