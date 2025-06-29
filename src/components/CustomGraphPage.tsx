import React from 'react';
import { Download, FileBarChart2 } from 'lucide-react';

const CustomGraphPage = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Customizable Graph (Placeholder)</h2>
      <div className="flex gap-2 mb-4">
        <button
          title="Generate PPT"
          className="p-2 rounded hover:bg-orange-100 dark:hover:bg-orange-900 border border-gray-300 dark:border-gray-600"
          onClick={() => alert('PPT will be generated based on the graphical analysis.')}
        >
          <FileBarChart2 className="h-5 w-5 text-orange-500" />
        </button>
        <button
          title="Download CSV"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
          onClick={() => alert('CSV will be downloaded.')}
        >
          <Download className="h-5 w-5" />
        </button>
      </div>
      <p>This is a placeholder page. The customizable graph feature has been reverted. Please restore your previous implementation here if needed.</p>
    </div>
  );
};

export default CustomGraphPage;
