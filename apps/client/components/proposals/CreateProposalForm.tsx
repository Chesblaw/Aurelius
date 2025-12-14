'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CreateProposalFormSchema } from '@/lib/schemas/proposals.schemas'
import type { CreateProposalFormValues } from '@/lib/types/proposals.types'
import { sanitizeString } from '@/lib/utils/sanitize'

interface CreateProposalFormProps {
  onSubmit: (values: CreateProposalFormValues) => void
  onCancel: () => void
}

export function CreateProposalForm({
  onSubmit,
  onCancel,
}: CreateProposalFormProps) {
  const form = useForm<CreateProposalFormValues>({
    resolver: zodResolver(CreateProposalFormSchema),
    defaultValues: {
      title: '',
      category: 'community',
      description: '',
      timeLeft: '7',
    },
  })

  const categoryValue = form.watch('category')

  const handleSubmit = (values: CreateProposalFormValues) => {
    // Sanitize inputs before submission
    const sanitizedValues = {
      ...values,
      title: sanitizeString(values.title),
      description: sanitizeString(values.description),
    }

    onSubmit(sanitizedValues)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        {/* Proposal Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Proposal Title
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  maxLength={100}
                  placeholder="e.g. Allocate treasury funds for ecosystem grants"
                  className="text-sm sm:text-base"
                />
              </FormControl>
              <FormDescription className="text-xs text-slate-500 dark:text-slate-400">
                A concise, descriptive title that clearly states the intent
                (maximum 100 characters).
              </FormDescription>
              <FormMessage className="text-sm font-medium text-red-500" />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Proposal Category
              </FormLabel>
              <Select
                value={categoryValue}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger className="text-sm sm:text-base">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="treasury">Treasury</SelectItem>
                  <SelectItem value="governance">Governance</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-xs text-slate-500 dark:text-slate-400">
                Categorization helps members quickly evaluate scope and impact.
              </FormDescription>
              <FormMessage className="text-sm font-medium text-red-500" />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Detailed Description
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  maxLength={1000}
                  placeholder="Provide context, motivation, and expected outcomes of this proposal..."
                  className="min-h-[120px] text-sm sm:text-base leading-relaxed"
                />
              </FormControl>
              <FormDescription className="text-xs text-slate-500 dark:text-slate-400">
                Include rationale, implementation details, and any risks or
                trade-offs (maximum 1,000 characters).
              </FormDescription>
              <FormMessage className="text-sm font-medium text-red-500" />
            </FormItem>
          )}
        />

        {/* Voting Duration */}
        <FormField
          control={form.control}
          name="timeLeft"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Voting Duration (days)
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  min="1"
                  max="90"
                  placeholder="7"
                  className="text-sm sm:text-base"
                />
              </FormControl>
              <FormDescription className="text-xs text-slate-500 dark:text-slate-400">
                Defines how long this proposal remains open for voting (1–90
                days).
              </FormDescription>
              <FormMessage className="text-sm font-medium text-red-500" />
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-auto"
          >
            Submit Proposal
          </Button>
        </div>
      </form>
    </Form>
  )
}
