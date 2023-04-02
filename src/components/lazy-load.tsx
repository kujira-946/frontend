import { motion } from "framer-motion";

import { useDetectInView } from "@/utils/functions/hooks";

type Animation = { [key: string]: string | number };

type Props = {
  children: React.ReactNode;
  threshold?: number;
  onlyOnce?: boolean;
  initial?: Animation;
  animate?: Animation;
  transition?: Animation;
};

export const LazyLoad = (props: Props) => {
  const { ref, inView } = useDetectInView(props.threshold, props.onlyOnce);

  return (
    <div ref={ref}>
      {inView ? (
        <motion.div
          initial={props.initial}
          animate={props.animate}
          transition={props.transition}
        >
          {props.children}
        </motion.div>
      ) : null}
    </div>
  );
};
