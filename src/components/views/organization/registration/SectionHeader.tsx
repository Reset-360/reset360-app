import React from 'react'

const SectionHeader = ({ title, icon: Icon, subtitle }: { title: string; icon: React.ElementType, subtitle?: string}) => {
  return (
     <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  )
}

export default SectionHeader