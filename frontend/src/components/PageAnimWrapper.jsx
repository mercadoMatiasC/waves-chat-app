import { motion } from "framer-motion";

export function PageAnimWrapper({ children, className, uniqueKey }) {
  return (
    <motion.div
      layout
      key={uniqueKey}
      className={className}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}