import { MonitorSmartphone } from 'lucide-react'
import React from 'react'

const OrgSeatInactiveTabSplash = () => {
  return (
     <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
          <MonitorSmartphone className="h-10 w-10 text-primary" />
        </div>

        <h1 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
          Already open in another tab
        </h1>

        <p className="mb-8 text-muted-foreground leading-relaxed">
          Seat generation is currently active in a different browser tab. 
          Switch to that tab to continue where you left off.
        </p>

        <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Session active elsewhere
        </div>
      </div>
    </div>
  )
}

export default OrgSeatInactiveTabSplash