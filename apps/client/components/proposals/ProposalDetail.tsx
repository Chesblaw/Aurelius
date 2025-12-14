'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { Proposal } from '@/lib/contracts/proposal-contract'
import type { VoteOption } from '@/lib/types/proposals.types'
import { cn } from '@/lib/utils'
import {
  categoryVariants,
  formatTimestamp,
  formatWalletAddress,
  getTimeRemaining,
  renderStatus,
} from '@/lib/utils/proposal'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Minus,
  Target,
  ThumbsDown,
  ThumbsUp,
  User,
  Users,
  XCircle,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ProposalDetailProps {
  proposal: Proposal
  onVote: (vote: VoteOption) => Promise<void>
  userVote: VoteOption | null
}

export function ProposalDetail({
  proposal,
  onVote,
  userVote,
}: ProposalDetailProps) {
  const router = useRouter()
  const [isVoting, setIsVoting] = useState(false)

  const totalVotes =
    proposal.for_votes +
    proposal.against_votes +
    proposal.abstain_votes

  const forPercentage =
    totalVotes > 0
      ? Math.round((proposal.for_votes / totalVotes) * 100)
      : 0

  const againstPercentage =
    totalVotes > 0
      ? Math.round(
          (proposal.against_votes / totalVotes) * 100,
        )
      : 0

  const abstainPercentage =
    totalVotes > 0
      ? Math.round(
          (proposal.abstain_votes / totalVotes) * 100,
        )
      : 0

  const timeRemaining = getTimeRemaining(proposal.deadline)
  const isOpen =
    proposal.status.tag === 'Open' &&
    !timeRemaining.isExpired

  const handleVote = async (vote: VoteOption) => {
    if (!isOpen || isVoting) return
    try {
      setIsVoting(true)
      await onVote(vote)
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Back */}
      <Button
        variant="ghost"
        onClick={() => router.push('/proposals')}
        className="px-0 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        All Proposals
      </Button>

      {/* Proposal Overview */}
      <Card className="border-border/50">
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="gap-1 text-xs"
            >
              {renderStatus(proposal.status.tag).icon}
              {renderStatus(proposal.status.tag).label}
            </Badge>

            <Badge
              className={categoryVariants({
                category: proposal.proposal_type.tag,
              })}
            >
              {proposal.proposal_type.tag}
            </Badge>
          </div>

          <CardTitle className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {proposal.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <Meta
              icon={<User className="h-4 w-4" />}
              label="Proposed by"
              value={
                <span className="font-mono text-xs">
                  {formatWalletAddress(
                    proposal.created_by,
                  )}
                </span>
              }
            />

            <Meta
              icon={<Calendar className="h-4 w-4" />}
              label="Created"
              value={formatTimestamp(proposal.created_at)}
            />

            <Meta
              icon={<Clock className="h-4 w-4" />}
              label="Voting Deadline"
              value={
                <span
                  className={cn(
                    timeRemaining.isExpired &&
                      'text-red-500',
                  )}
                >
                  {timeRemaining.text}
                </span>
              }
            />

            <Meta
              icon={<Target className="h-4 w-4" />}
              label="Quorum"
              value={
                proposal.quorum !== undefined
                  ? proposal.quorum.toLocaleString()
                  : 'Not specified'
              }
            />
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              Proposal Rationale
            </h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {proposal.description}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Voting */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Results */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Voting Outcome
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <VoteStat
                icon={<ThumbsUp className="h-4 w-4" />}
                label="For"
                value={proposal.for_votes}
                percent={forPercentage}
                color="text-emerald-500"
              />
              <VoteStat
                icon={<ThumbsDown className="h-4 w-4" />}
                label="Against"
                value={proposal.against_votes}
                percent={againstPercentage}
                color="text-rose-500"
              />
              <VoteStat
                icon={<Minus className="h-4 w-4" />}
                label="Abstain"
                value={proposal.abstain_votes}
                percent={abstainPercentage}
                color="text-slate-500"
              />
            </div>

            {/* Distribution */}
            <div className="space-y-2">
              <div className="text-sm font-medium">
                Vote Distribution
              </div>
              <div className="h-2 w-full rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500"
                  style={{ width: `${forPercentage}%` }}
                />
                <div
                  className="bg-rose-500"
                  style={{
                    width: `${againstPercentage}%`,
                  }}
                />
                <div
                  className="bg-slate-400"
                  style={{
                    width: `${abstainPercentage}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>For {forPercentage}%</span>
                <span>Against {againstPercentage}%</span>
                <span>Abstain {abstainPercentage}%</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between text-sm">
              <span className="font-medium">
                Total Votes Cast
              </span>
              <span>{totalVotes.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Record Your Vote</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {isOpen ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Your vote is immutable and recorded on-chain.
                </p>

                <div className="space-y-2">
                  <VoteButton
                    label="Vote Against"
                    onClick={() => handleVote('Against')}
                    selected={userVote === 'Against'}
                    disabled={isVoting}
                  />
                  <VoteButton
                    label="Vote For"
                    onClick={() => handleVote('For')}
                    selected={userVote === 'For'}
                    disabled={isVoting}
                    primary
                  />
                  <VoteButton
                    label="Abstain"
                    onClick={() => handleVote('Abstain')}
                    selected={userVote === 'Abstain'}
                    disabled={isVoting}
                  />
                </div>

                {userVote && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                  >
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      ✓ Your vote has been recorded
                    </p>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="py-8 text-center space-y-3">
                {timeRemaining.isExpired ? (
                  <Clock className="h-8 w-8 mx-auto text-muted-foreground" />
                ) : (
                  <XCircle className="h-8 w-8 mx-auto text-muted-foreground" />
                )}
                <p className="font-medium">
                  Voting Closed
                </p>
                <p className="text-sm text-muted-foreground">
                  This proposal is no longer accepting
                  votes.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

/* ---------- Subcomponents ---------- */

function Meta({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">
        {icon}
      </span>
      <div>
        <p className="text-xs text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-medium">
          {value}
        </p>
      </div>
    </div>
  )
}

function VoteStat({
  icon,
  label,
  value,
  percent,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: number
  percent: number
  color: string
}) {
  return (
    <div className="space-y-1">
      <div
        className={cn(
          'flex items-center justify-center gap-2 text-sm font-medium',
          color,
        )}
      >
        {icon}
        {label}
      </div>
      <div className="text-2xl font-semibold">
        {value.toLocaleString()}
      </div>
      <div className="text-xs text-muted-foreground">
        {percent}%
      </div>
    </div>
  )
}

function VoteButton({
  label,
  onClick,
  selected,
  disabled,
  primary,
}: {
  label: string
  onClick: () => void
  selected: boolean
  disabled: boolean
  primary?: boolean
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={primary ? 'default' : 'outline'}
      className={cn(
        'w-full font-semibold justify-center gap-2',
        selected && 'ring-2 ring-primary',
      )}
    >
      {label}
      {selected && <Check className="h-4 w-4" />}
    </Button>
  )
}
