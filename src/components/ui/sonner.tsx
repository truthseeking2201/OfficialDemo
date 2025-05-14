import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import { CustomToast } from "./CustomToast"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      closeButton={false}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      render={(toast) => (
        <CustomToast 
          id={toast.id} 
          title={toast.title as string} 
          description={toast.description as string} 
          variant={toast.data?.variant} 
        />
      )}
      {...props}
    />
  )
}

export { Toaster }
export { toast } from "sonner"