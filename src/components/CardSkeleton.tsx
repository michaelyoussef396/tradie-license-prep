import { motion } from "framer-motion";

interface CardSkeletonProps {
  count?: number;
  variant?: "default" | "horizontal" | "course";
}

const CardSkeleton = ({ count = 1, variant = "default" }: CardSkeletonProps) => {
  const cards = [...Array(count)];

  if (variant === "horizontal") {
    return (
      <div className="space-y-4">
        {cards.map((_, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm flex gap-6"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          >
            <div className="w-24 h-24 bg-slate-200 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="w-1/3 h-6 bg-slate-200 rounded" />
              <div className="w-full h-4 bg-slate-100 rounded" />
              <div className="w-2/3 h-4 bg-slate-100 rounded" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === "course") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((_, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          >
            <div className="h-1.5 bg-slate-200" />
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="w-24 h-6 bg-slate-200 rounded-full" />
                <div className="flex gap-1">
                  <div className="w-4 h-4 bg-slate-200 rounded" />
                  <div className="w-4 h-4 bg-slate-200 rounded" />
                  <div className="w-4 h-4 bg-slate-200 rounded" />
                </div>
              </div>
              <div className="w-3/4 h-7 bg-slate-200 rounded" />
              <div className="w-1/2 h-4 bg-slate-100 rounded" />
              <div className="flex gap-2">
                <div className="w-20 h-8 bg-slate-100 rounded-full" />
                <div className="w-28 h-8 bg-slate-100 rounded-full" />
              </div>
              <div className="py-4 border-t border-slate-100">
                <div className="w-24 h-10 bg-slate-200 rounded" />
              </div>
              <div className="space-y-3">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-slate-200 rounded-full" />
                    <div className="w-3/4 h-4 bg-slate-100 rounded" />
                  </div>
                ))}
              </div>
              <div className="w-full h-12 bg-slate-200 rounded-lg mt-4" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((_, i) => (
        <motion.div
          key={i}
          className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
        >
          <div className="w-14 h-14 bg-slate-200 rounded-xl mb-4" />
          <div className="w-3/4 h-6 bg-slate-200 rounded mb-3" />
          <div className="space-y-2">
            <div className="w-full h-4 bg-slate-100 rounded" />
            <div className="w-5/6 h-4 bg-slate-100 rounded" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CardSkeleton;
