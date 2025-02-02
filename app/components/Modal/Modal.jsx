import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const Modal = ({ type, message, isOpen, onClose }) => {
  if (!isOpen) return null;

  const iconProps = {
    success: {
      icon: <CheckCircle className="text-green-500 w-16 h-16" />,
      title: "Success!",
      bgColor: "bg-white",
      textColor: "text-green-700",
    },
    error: {
      icon: <XCircle className="text-red-500 w-16 h-16" />,
      title: "Failed!",
      bgColor: "bg-white",
      textColor: "text-red-700",
    },
  };

  const { icon, title, bgColor, textColor } = iconProps[type];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`p-6 rounded-2xl shadow-xl ${bgColor} max-w-sm w-full text-center`}
      >
        <div className="flex justify-center mb-4">{icon}</div>
        <h2 className={`text-2xl font-semibold mb-2 ${textColor}`}>{title}</h2>
        <p className="text-gray-700 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
