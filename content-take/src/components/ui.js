export const Card = ({ children, className, ...props }) => (
    <div className={`bg-white dark:bg-purple-900 shadow-lg rounded-lg ${className}`} {...props}>
      {children}
    </div>
  )
  
  export const CardHeader = ({ children, ...props }) => (
    <div className="px-6 py-5 border-b border-purple-200 dark:border-purple-700" {...props}>
      {children}
    </div>
  )
  
  export const CardContent = ({ children, ...props }) => (
    <div className="px-6 py-5" {...props}>
      {children}
    </div>
  )
  
  export const CardFooter = ({ children, ...props }) => (
    <div className="px-6 py-4 bg-purple-50 dark:bg-purple-800 rounded-b-lg" {...props}>
      {children}
    </div>
  )
  
  export const CardTitle = ({ children, ...props }) => (
    <h3 className="text-xl leading-6 font-bold text-purple-700 dark:text-purple-300" {...props}>
      {children}
    </h3>
  )
  
  export const CardDescription = ({ children, ...props }) => (
    <p className="mt-1 max-w-2xl text-sm text-purple-500 dark:text-purple-400" {...props}>
      {children}
    </p>
  )
  
  export const Button = ({ children, className, ...props }) => (
    <button className={`px-4 py-2 rounded-md transition-all duration-200 shadow-md ${className}`} {...props}>
      {children}
    </button>
  )
  
  export const Input = ({ className, ...props }) => (
    <input
      className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${className}`}
      {...props}
    />
  )
  
  export const Label = ({ children, className, ...props }) => (
    <label className={`block text-sm font-medium text-purple-700 dark:text-purple-300 ${className}`} {...props}>
      {children}
    </label>
  )
  
  export const Textarea = ({ className, ...props }) => (
    <textarea
      className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${className}`}
      {...props}
    />
  )
  
  export const Tabs = ({ children, ...props }) => <div {...props}>{children}</div>
  
  export const TabsList = ({ children, ...props }) => (
    <div className="flex border-b border-purple-200 dark:border-purple-700 mb-4" {...props}>
      {children}
    </div>
  )
  
  export const TabsTrigger = ({ children, ...props }) => (
    <button
      className="px-4 py-2 border-b-2 border-transparent hover:text-purple-600 hover:border-purple-500 transition-all duration-200 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50"
      {...props}
    >
      {children}
    </button>
  )
  
  export const TabsContent = ({ children, ...props }) => <div {...props}>{children}</div>
  
  export const Badge = ({ children, className, ...props }) => (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-pink-400 to-purple-500 text-white ${className}`}
      {...props}
    >
      {children}
    </span>
  )
  
  export const Separator = ({ className, ...props }) => (
    <hr className={`border-t border-purple-200 dark:border-purple-700 ${className}`} {...props} />
  )
  
  export const Alert = ({ variant = "default", className, ...props }) => {
    const variantStyles = {
      default: "bg-gray-100 text-gray-900",
      destructive: "bg-red-50 text-red-900 dark:bg-red-900 dark:text-red-100",
      warning: "bg-yellow-50 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100",
      error: "bg-red-50 text-red-900 dark:bg-red-900 dark:text-red-100",
    }
  
    return <div className={`rounded-lg p-4 ${variantStyles[variant]} ${className}`} role="alert" {...props} />
  }
  
  export const AlertDescription = ({ className, ...props }) => (
    <div className={`text-sm flex items-center ${className}`} {...props} />
  )
  
  export const Switch = ({ checked, onCheckedChange, ...props }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className="sr-only peer"
        {...props}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
    </label>
  )
  
  
