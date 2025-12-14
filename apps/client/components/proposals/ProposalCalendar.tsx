'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export type ProposalEvent = {
  date: string // ISO format: '2025-04-22'
  label: string
  type?: 'start' | 'end' | 'live' | 'voting'
}

interface ProposalCalendarProps {
  events: ProposalEvent[]
  className?: string
}

export function ProposalCalendar({
  events = [],
  className,
}: ProposalCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  )

  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  )

  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyCellsBefore = Array.from(
    { length: firstDayOfWeek },
    () => null,
  )

  const getEventsForDay = (day: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1,
    ).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    return events.filter((event) =>
      event.date.startsWith(dateString),
    )
  }

  const goToPreviousMonth = () =>
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1,
      ),
    )

  const goToNextMonth = () =>
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1,
      ),
    )

  const goToCurrentMonth = () => setCurrentDate(new Date())

  const monthYearString = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const isCurrentMonth =
    new Date().getMonth() === currentDate.getMonth() &&
    new Date().getFullYear() === currentDate.getFullYear()

  const today = isCurrentMonth ? new Date().getDate() : null

  const hasEventsThisMonth = events.some((event) => {
    const d = new Date(event.date)
    return (
      d.getMonth() === currentDate.getMonth() &&
      d.getFullYear() === currentDate.getFullYear()
    )
  })

  const getEventTypeColor = (type?: string) => {
    switch (type) {
      case 'start':
        return 'bg-blue-500'
      case 'live':
        return 'bg-emerald-500'
      case 'voting':
        return 'bg-violet-500'
      case 'end':
        return 'bg-rose-500'
      default:
        return 'bg-slate-400'
    }
  }

  return (
    <Card
      className={`border border-slate-200/60 dark:border-slate-800/60 ${className}`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold tracking-tight">
              Calendar
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Key proposal milestones and voting windows
            </p>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPreviousMonth}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {!isCurrentMonth && (
              <Button
                variant="outline"
                size="sm"
                onClick={goToCurrentMonth}
                className="text-xs"
              >
                Today
              </Button>
            )}

            <Button
              variant="outline"
              size="icon"
              onClick={goToNextMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          {monthYearString}
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
            (day) => (
              <div
                key={day}
                className="py-1 font-medium text-slate-500"
              >
                {day}
              </div>
            ),
          )}

          {emptyCellsBefore.map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="h-9 rounded-md"
            />
          ))}

          <TooltipProvider>
            {days.map((day) => {
              const dayEvents = getEventsForDay(day)
              const isToday = day === today

              return (
                <Tooltip key={day} delayDuration={250}>
                  <TooltipTrigger asChild>
                    <div
                      className={`
                        relative h-9 rounded-md flex flex-col items-center justify-center cursor-default
                        transition-colors
                        ${
                          isToday
                            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold'
                            : dayEvents.length > 0
                            ? 'hover:bg-slate-100 dark:hover:bg-slate-800'
                            : 'text-slate-600 dark:text-slate-400'
                        }
                      `}
                    >
                      <span>{day}</span>

                      {dayEvents.length > 0 && (
                        <div className="absolute bottom-1 flex gap-0.5">
                          {dayEvents.map((event) => (
                            <span
                              key={`${day}-${event.label}`}
                              className={`h-1.5 w-1.5 rounded-full ${getEventTypeColor(
                                event.type,
                              )}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </TooltipTrigger>

                  {dayEvents.length > 0 && (
                    <TooltipContent
                      side="bottom"
                      className="max-w-[220px]"
                    >
                      <p className="text-xs font-medium mb-1">
                        {day} {monthYearString}
                      </p>
                      <ul className="space-y-1">
                        {dayEvents.map((event) => (
                          <li
                            key={event.label}
                            className="flex items-center gap-2 text-xs"
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${getEventTypeColor(
                                event.type,
                              )}`}
                            />
                            <span>{event.label}</span>
                          </li>
                        ))}
                      </ul>
                    </TooltipContent>
                  )}
                </Tooltip>
              )
            })}
          </TooltipProvider>
        </div>

        {!hasEventsThisMonth && (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            No governance milestones scheduled this month
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <Legend color="bg-blue-500" label="Proposal Start" />
          <Legend color="bg-emerald-500" label="Live" />
          <Legend color="bg-violet-500" label="Voting" />
          <Legend color="bg-rose-500" label="Proposal End" />
        </div>
      </CardContent>
    </Card>
  )
}

function Legend({
  color,
  label,
}: {
  color: string
  label: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  )
}
