
import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  title: string;
  description?: string;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, currentStep, className, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn("w-full flex justify-between", className)} 
        {...props}
      >
        {steps.map((step, index) => {
          const isActive = currentStep === index;
          const isCompleted = currentStep > index;
          const isLast = index === steps.length - 1;
          
          return (
            <React.Fragment key={index}>
              <div className={cn(
                "flex flex-col items-center relative",
                isLast ? "flex-grow-0" : "flex-grow"
              )}>
                {/* Step circle */}
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                  isCompleted ? "bg-green-500 text-white" : 
                  isActive ? "bg-nova text-white" : 
                  "bg-white/20 text-white/50"
                )}>
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                
                {/* Step title and description */}
                <div className="mt-2 text-center">
                  <div className={cn(
                    "font-medium transition-colors duration-300",
                    isActive || isCompleted ? "text-white" : "text-white/50"
                  )}>
                    {step.title}
                  </div>
                  {step.description && (
                    <div className={cn(
                      "text-xs transition-colors duration-300",
                      isActive || isCompleted ? "text-white/70" : "text-white/30"
                    )}>
                      {step.description}
                    </div>
                  )}
                </div>
                
                {/* Connector line */}
                {!isLast && (
                  <div className="absolute top-4 left-[calc(50%+16px)] w-[calc(100%-32px)] h-0.5">
                    <div className="relative w-full h-full bg-white/20">
                      <div className={cn(
                        "absolute top-0 left-0 h-full bg-green-500 transition-all duration-300",
                        isCompleted ? "w-full" : "w-0"
                      )}></div>
                    </div>
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

Stepper.displayName = "Stepper";
