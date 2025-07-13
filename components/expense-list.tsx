"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Check, Calendar } from "lucide-react"
import type { Expense } from "@/types/expense"

interface ExpenseListProps {
  expenses: Expense[]
  onMarkAsPaid: (id: string) => void
  onDelete: (id: string) => void
}

export function ExpenseList({ expenses, onMarkAsPaid, onDelete }: ExpenseListProps) {
  const [filter, setFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("dueDate")

  const filteredExpenses = expenses.filter((expense) => {
    if (filter === "all") return true
    if (filter === "paga") return expense.status === "paga"
    if (filter === "a-pagar") return expense.status === "a-pagar"
    if (filter === "fixa") return expense.type === "fixa"
    if (filter === "nao-fixa") return expense.type === "nao-fixa"
    return true
  })

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === "dueDate") return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    if (sortBy === "amount") return b.amount - a.amount
    if (sortBy === "description") return a.description.localeCompare(b.description)
    return 0
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Minhas Despesas</CardTitle>
        <CardDescription>Gerencie todas as suas despesas</CardDescription>

        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrar por..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="paga">Pagas</SelectItem>
              <SelectItem value="a-pagar">A Pagar</SelectItem>
              <SelectItem value="fixa">Fixas</SelectItem>
              <SelectItem value="nao-fixa">Não Fixas</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Ordenar por..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDate">Data de Vencimento</SelectItem>
              <SelectItem value="amount">Valor</SelectItem>
              <SelectItem value="description">Descrição</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {sortedExpenses.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">Nenhuma despesa encontrada</p>
        ) : (
          <div className="space-y-4">
            {sortedExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-2 sm:space-y-0"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{expense.description}</h3>
                    <Badge variant={expense.type === "fixa" ? "default" : "secondary"}>
                      {expense.type === "fixa" ? "Fixa" : "Não Fixa"}
                    </Badge>
                    <Badge variant={expense.status === "paga" ? "default" : "destructive"}>
                      {expense.status === "paga" ? "Paga" : "A Pagar"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{expense.category}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Vence: {formatDate(expense.dueDate)}
                    </span>
                    {expense.paidDate && <span>Pago em: {formatDate(expense.paidDate)}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">{formatCurrency(expense.amount)}</span>

                  <div className="flex gap-2">
                    {expense.status === "a-pagar" && (
                      <Button size="sm" onClick={() => onMarkAsPaid(expense.id)} className="flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Marcar como Paga
                      </Button>
                    )}

                    <Button size="sm" variant="destructive" onClick={() => onDelete(expense.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
