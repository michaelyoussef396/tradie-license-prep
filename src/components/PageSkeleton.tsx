import { motion } from "framer-motion";

const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="w-40 h-10 bg-slate-200 rounded-lg animate-pulse" />
            <div className="hidden lg:flex items-center gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-20 h-4 bg-slate-200 rounded animate-pulse" />
              ))}
            </div>
            <div className="w-32 h-10 bg-blue-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Hero Skeleton */}
      <div className="pt-20 bg-slate-900">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              className="w-32 h-8 bg-slate-700 rounded-full mx-auto mb-6"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="w-full max-w-xl h-12 bg-slate-700 rounded-lg mx-auto mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
            />
            <motion.div
              className="w-3/4 h-12 bg-slate-700 rounded-lg mx-auto mb-6"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-2/3 h-6 bg-slate-800 rounded mx-auto"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            className="w-24 h-6 bg-slate-200 rounded-full mx-auto mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="w-64 h-10 bg-slate-200 rounded-lg mx-auto mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
          />
          <motion.div
            className="w-96 h-5 bg-slate-100 rounded mx-auto"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
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
      </div>
    </div>
  );
};

export default PageSkeleton;
