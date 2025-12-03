import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center px-4">
          <div className="text-8xl font-bold text-slate-200 mb-4">404</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Page Not Found</h1>
          <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Return to Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
