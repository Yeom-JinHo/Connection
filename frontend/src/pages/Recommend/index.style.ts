import { RepeatIcon } from "@chakra-ui/icons";
import {
  ComponentWithAs,
  IconProps,
  keyframes,
  styled
} from "@chakra-ui/react";
import { transform } from "typescript";

const StyledIcon = styled(RepeatIcon, {
  baseStyle: {
    w: 10,
    h: 10,
    position: "absolute",
    top: 120,
    right: 12,
    cursor: "pointer",
    transition: "transform .6s"
  }
});

export default {
  StyledIcon
};
