
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
    <div className="progress-container">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div className="progress-step">
            <div
              className={cn("progress-circle", {
                active: index + 1 === currentStep,
                complete: index + 1 < currentStep,
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
              className={cn("progress-line", {
                active: index + 1 < currentStep,
                inactive: index + 1 >= currentStep,
              })}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressIndicator;
