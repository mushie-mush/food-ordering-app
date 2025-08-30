import { LoaderCircle } from 'lucide-react';
import React from 'react';

function loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoaderCircle size={24} className="animate-spin mr-2" /> Loading...
    </div>
  );
}

export default loading;
