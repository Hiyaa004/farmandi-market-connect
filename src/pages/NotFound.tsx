
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-farmandi-cream p-6">
      <div className="text-center max-w-md">
        <img src="/logo.svg" alt="Farmandi Logo" className="h-20 w-20 mx-auto mb-8" />
        <h1 className="text-4xl font-bold mb-4 text-farmandi-brown">404</h1>
        <p className="text-xl text-farmandi-brown mb-4">Oops! This page isn't growing here</p>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been moved, deleted, 
          or perhaps never existed in our farm.
        </p>
        <Button asChild variant="default">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
