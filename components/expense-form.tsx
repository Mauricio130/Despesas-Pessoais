"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { ExpenseFormData } from "@/types/expense"

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void
}

const categories = ["Moradia", "Alimentação", "Transporte", "Saúde", "Educação", "Lazer", "Utilidades", "Outros"]

export function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    description: "",
    amount: "",
    category: "",
    type: "nao-fixa",
    status: "a-pagar",
    dueDate: "",
    paidDate: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.description || !formData.amount || !formData.category || !formData.dueDate) {
      alert("Por favor, preencha todos os campos obrigatórios")
      return
    }

    onSubmit(formData)
    setFormData({
      description: "",
      amount: "",
      category: "",
      type: "nao-fixa",
      status: "a-pagar",
      dueDate: "",
      paidDate: "",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Despesa</CardTitle>
        <CardDescription>Adicione uma nova despesa ao seu controle financeiro</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Descrição *</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Ex: Conta de luz"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Valor (R$) *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                placeholder="0,00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Categoria *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Data de Vencimento *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Despesa</Label>
              <RadioGroup
                value={formData.type}
                onValueChange={(value: "fixa" | "nao-fixa") => setFormData((prev) => ({ ...prev, type: value }))}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fixa" id="fixa" />
                  <Label htmlFor="fixa">Fixa</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao-fixa" id="nao-fixa" />
                  <Label htmlFor="nao-fixa">Não Fixa</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <RadioGroup
                value={formData.status}
                onValueChange={(value: "paga" | "a-pagar") => setFormData((prev) => ({ ...prev, status: value }))}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="a-pagar" id="a-pagar" />
                  <Label htmlFor="a-pagar">A Pagar</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paga" id="paga" />
                  <Label htmlFor="paga">Paga</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.status === "paga" && (
              <div className="space-y-2">
                <Label htmlFor="paidDate">Data do Pagamento</Label>
                <Input
                  id="paidDate"
                  type="date"
                  value={formData.paidDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, paidDate: e.target.value }))}
                />
              </div>
            )}
          </div>

          <Button type="submit" className="w-full">
            Adicionar Despesa
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
