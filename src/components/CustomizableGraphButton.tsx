import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomizableGraphButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="w-full p-2 my-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      onClick={() => navigate('/custom-graph')}
    >
      Customizable Graph
    </button>
  );
};

export default CustomizableGraphButton;
