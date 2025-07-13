"use client"

import { useState, useEffect } from "react"
import type { Expense } from "@/types/expense"

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([])

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses")
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses))
    } else {
      // Dados de exemplo
      const sampleExpenses: Expense[] = [
        {
          id: "1",
          description: "Aluguel",
          amount: 1200,
          category: "Moradia",
          type: "fixa",
          status: "paga",
          dueDate: "2024-01-05",
          paidDate: "2024-01-05",
          createdAt: "2024-01-01",
        },
        {
          id: "2",
          description: "Conta de Luz",
          amount: 150,
          category: "Utilidades",
          type: "fixa",
          status: "a-pagar",
          dueDate: "2024-01-15",
          createdAt: "2024-01-01",
        },
        {
          id: "3",
          description: "Supermercado",
          amount: 300,
          category: "Alimentação",
          type: "nao-fixa",
          status: "paga",
          dueDate: "2024-01-10",
          paidDate: "2024-01-10",
          createdAt: "2024-01-08",
        },
      ]
      setExpenses(sampleExpenses)
    }
  }, [])

  // Salvar no localStorage sempre que expenses mudar
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (expense: Omit<Expense, "id" | "createdAt">) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }
    setExpenses((prev) => [...prev, newExpense])
  }

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses((prev) => prev.map((expense) => (expense.id === id ? { ...expense, ...updates } : expense)))
  }

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
  }

  const markAsPaid = (id: string) => {
    updateExpense(id, {
      status: "paga",
      paidDate: new Date().toISOString().split("T")[0],
    })
  }

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    markAsPaid,
  }
}
