import styled from "styled-components";
import { motion } from "framer-motion";

import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

const Loader = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: ${Styles.pxAsRem.four};
  background-color: ${(props: ThemeProps) => props.theme.primaryMain};
  transform-origin: left;
`;

export const PurchaseCellsUpdateLoader = () => {
  return (
    <Loader
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      exit={{ width: "0%" }}
      transition={{ duration: 0.2 }}
    />
  );
};
