"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSummary } from "@/components/dashboard-summary"
import { ExpenseForm } from "@/components/expense-form"
import { ExpenseList } from "@/components/expense-list"
import { useExpenses } from "@/hooks/useExpenses"
import type { ExpenseFormData } from "@/types/expense"

export default function Home() {
  const { expenses, addExpense, markAsPaid, deleteExpense } = useExpenses()

  const handleAddExpense = (formData: ExpenseFormData) => {
    addExpense({
      description: formData.description,
      amount: Number.parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      status: formData.status,
      dueDate: formData.dueDate,
      paidDate: formData.paidDate || undefined,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Controle de Despesas Pessoais</h1>
          <p className="text-gray-600">Gerencie suas finanças de forma simples e organizada</p>
        </div>

        <div className="mb-8">
          <DashboardSummary expenses={expenses} />
        </div>

        <Tabs defaultValue="expenses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expenses">Minhas Despesas</TabsTrigger>
            <TabsTrigger value="add">Adicionar Despesa</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-6">
            <ExpenseList expenses={expenses} onMarkAsPaid={markAsPaid} onDelete={deleteExpense} />
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <ExpenseForm onSubmit={handleAddExpense} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
