import { useDetectInView } from "@/utils/hooks";

type Props = {
  children: React.ReactNode;
  threshold?: number;
  onlyOnce?: boolean;
};

export const LazyLoad = (props: Props) => {
  const { ref, inView } = useDetectInView(props.threshold, props.onlyOnce);

  return <div ref={ref}>{inView ? props.children : null}</div>;
};
