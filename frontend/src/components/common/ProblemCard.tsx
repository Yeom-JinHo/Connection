import React from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";

export interface Tag {
  id: number;
  title: string;
}
export interface Problem {
  id: number;
  title: string;
  link: string;
  tags: Tag[];
  elapsedTime: string;
  difficulty: string;
}

interface CardButtonProps {
  btnType: "delete" | "add";
  onBtnClick: React.MouseEventHandler<HTMLDivElement>;
}
interface ProblemCardProps extends CardButtonProps {
  problem: Problem;
}

function Button({ btnType, onBtnClick }: CardButtonProps) {
  if (btnType === "delete") {
    return (
      <Box onClick={onBtnClick}>
        <DeleteIcon w="6" h="6" cursor="pointer" alignSelf="center" />
      </Box>
    );
  }
  return (
    <Box onClick={onBtnClick}>
      <AddIcon w="6" h="6" cursor="pointer" alignSelf="center" />
    </Box>
  );
}

function ProblemCard({ problem, btnType, onBtnClick }: ProblemCardProps) {
  const { id, title, link, tags, elapsedTime, difficulty } = problem;
  return (
    <Box
      bg="dep_1"
      borderRadius="20px"
      p="20px"
      boxShadow="0 4px 4px rgba(0,0,0,0.25)"
      _hover={{
        transform: "scale(1.03)",
        transition: "transform ease-out .5s"
      }}
    >
      <Box borderBottom="1px" borderColor="border_gray" pb="20px" mb="20px">
        <Flex justifyContent="space-between" mt="10px" mb="10px">
          <Flex>
            <Link href={link} isExternal fontSize="2xl" fontWeight="bold">
              {title}
              <ExternalLinkIcon mx="2" />
            </Link>
          </Flex>
          <Button btnType={btnType} onBtnClick={onBtnClick} />
        </Flex>
        <Flex gap="8px">
          {tags.map(tag => (
            <Box
              key={tag.id}
              bg="gra"
              w="fit-content"
              p="4px 16px"
              borderRadius="15px"
            >
              {tag.title}
            </Box>
          ))}
        </Flex>
      </Box>
      <Box>
        <Text mb="10px">소요시간 : {elapsedTime}</Text>
        <Text>체감 난이도 : {difficulty}</Text>
      </Box>
    </Box>
  );
}

export default ProblemCard;
