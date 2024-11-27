export const routeVariants = {
  initial: {
    opacity: 0,
    y: -50
  },
  final: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.3 }
  },
};

export const pageVariants = {
  initial: {
    opacity: 0,
  },
  final: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};