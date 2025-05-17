
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="progress-container flex items-center justify-center w-full mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div className="progress-step flex flex-col items-center">
            <div
              className={cn("progress-circle w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium", {
                "bg-primary text-white": index + 1 === currentStep,
                "bg-primary/20 text-primary": index + 1 < currentStep,
                "bg-gray-200 text-gray-500": index + 1 > currentStep,
              })}
            >
              {index + 1 < currentStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                index + 1
              )}
            </div>
          </div>
          {index < totalSteps - 1 && (
            <div
              className={cn("progress-line h-0.5 w-10 mx-4", {
                "bg-primary": index + 1 < currentStep,
                "bg-gray-200": index + 1 >= currentStep,
              })}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressIndicator;
