'use client'

interface QuickAction {
  label: string
  icon: React.ReactNode
  href: string
  color: string
}

interface QuickActionsProps {
  actions: QuickAction[]
}

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <a
          key={index}
          href={action.href}
          className={`${action.color} rounded-2xl p-6 text-white text-center hover:scale-105 transition-transform duration-300 shadow-lg animate-slide-up`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="text-3xl">{action.icon}</div>
            <span className="font-semibold text-sm">{action.label}</span>
          </div>
        </a>
      ))}
    </div>
  )
}