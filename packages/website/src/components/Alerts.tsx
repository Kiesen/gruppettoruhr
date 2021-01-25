import { FC } from 'react';

import {
  FiAlertTriangle,
  FiCheckCircle,
  FiXCircle,
} from 'react-icons/fi';

type AlertProps = {
  message: string;
};

export const ErrorAlert: FC<AlertProps> = ({ message }) => (
  <div
    className="
    w-full
    alert 
    flex 
    flex-row 
    items-center 
    bg-red-200 
    px-5
    py-2 
    rounded-md  
    border-red-300"
  >
    <div className="text-red-500 justify-center">
      <FiXCircle className="h-6 w-6" />
    </div>
    <div className="alert-content ml-4">
      <div className="alert-title font-semibold text-lg text-red-800">
        Error
      </div>
      <div className="alert-description text-sm text-red-600">
        {message}
      </div>
    </div>
  </div>
);

export const SuccessAlert: FC<AlertProps> = ({ message }) => (
  <div
    className="
    w-full
    alert 
    flex 
    flex-row 
    items-center 
    bg-green-200 
    px-5
    py-2 
    rounded-md  
    border-green-300"
  >
    <div className="text-green-500 justify-center">
      <FiCheckCircle className="h-6 w-6" />
    </div>
    <div className="alert-content ml-4">
      <div className="alert-title font-semibold text-lg text-green-800">
        Success
      </div>
      <div className="alert-description text-sm text-green-600">
        {message}
      </div>
    </div>
  </div>
);

export const WarningAlert: FC<AlertProps> = ({ message }) => (
  <div
    className="
    w-full
    alert 
    flex 
    flex-row 
    items-center 
    bg-yellow-200 
    px-5
    py-2 
    rounded-md  
    border-yellow-300"
  >
    <div className="text-yellow-500 justify-center">
      <FiAlertTriangle className="h-6 w-6" />
    </div>
    <div className="alert-content ml-4">
      <div className="alert-title font-semibold text-lg text-yellow-800">
        Warning
      </div>
      <div className="alert-description text-sm text-yellow-600">
        {message}
      </div>
    </div>
  </div>
);
