export interface Expense {
  id: string
  description: string
  amount: number
  category: string
  type: "fixa" | "nao-fixa"
  status: "paga" | "a-pagar"
  dueDate: string
  paidDate?: string
  createdAt: string
}

export interface ExpenseFormData {
  description: string
  amount: string
  category: string
  type: "fixa" | "nao-fixa"
  status: "paga" | "a-pagar"
  dueDate: string
  paidDate?: string
}
