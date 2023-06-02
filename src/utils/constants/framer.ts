export const landingMotion = {
  threshold: 0.5,
  initial: { opacity: 0, transform: "translateY(-8px)" },
  animate: { opacity: 1, transform: "translateY(0px)" },
  transition: { duration: 0.3, delay: 0.4 },
};

export const staticFadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.1, delay: 0 },
};

export const mobileMenuMotion = {
  initial: { transform: "translateX(100%)" },
  animate: { transform: "translateX(0%)" },
};
