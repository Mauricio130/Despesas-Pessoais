"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react"
import type { Expense } from "@/types/expense"

interface DashboardSummaryProps {
  expenses: Expense[]
}

export function DashboardSummary({ expenses }: DashboardSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  const totalPaid = expenses
    .filter((expense) => expense.status === "paga")
    .reduce((sum, expense) => sum + expense.amount, 0)

  const totalToPay = expenses
    .filter((expense) => expense.status === "a-pagar")
    .reduce((sum, expense) => sum + expense.amount, 0)

  const fixedExpenses = expenses
    .filter((expense) => expense.type === "fixa")
    .reduce((sum, expense) => sum + expense.amount, 0)

  const variableExpenses = expenses
    .filter((expense) => expense.type === "nao-fixa")
    .reduce((sum, expense) => sum + expense.amount, 0)

  const overdueBills = expenses.filter((expense) => {
    if (expense.status === "paga") return false
    const today = new Date()
    const dueDate = new Date(expense.dueDate)
    return dueDate < today
  }).length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
          <TrendingDown className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</div>
          <p className="text-xs text-muted-foreground">Despesas já quitadas</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">A Pagar</CardTitle>
          <TrendingUp className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{formatCurrency(totalToPay)}</div>
          <p className="text-xs text-muted-foreground">Despesas pendentes</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Despesas Fixas</CardTitle>
          <DollarSign className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{formatCurrency(fixedExpenses)}</div>
          <p className="text-xs text-muted-foreground">Total em despesas fixas</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contas Vencidas</CardTitle>
          <Calendar className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{overdueBills}</div>
          <p className="text-xs text-muted-foreground">Contas em atraso</p>
        </CardContent>
      </Card>
    </div>
  )
}
