interface AuthLayoutProps {
    title: string
    description?: string
    children: React.ReactNode
  }
  
  export default function AuthLayout({
    title,
    description,
    children,
  }: AuthLayoutProps) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted px-4">
        <div className="w-full max-w-md rounded-xl bg-background p-6 shadow">
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          )}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    )
  }
  