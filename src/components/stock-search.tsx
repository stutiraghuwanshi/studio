"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const stocks = [
  { value: "AAPL", label: "AAPL - Apple Inc." },
  { value: "GOOGL", label: "GOOGL - Alphabet Inc." },
  { value: "MSFT", label: "MSFT - Microsoft Corp." },
  { value: "TSLA", label: "TSLA - Tesla, Inc." },
  { value: "AMZN", label: "AMZN - Amazon.com, Inc." },
]

type StockSearchProps = {
  onStockSelect: (value: string | null) => void;
}

export function StockSearch({ onStockSelect }: StockSearchProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {value
            ? stocks.find((stock) => stock.value.toLowerCase() === value)?.label
            : "Select a stock..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search stock..." />
          <CommandList>
            <CommandEmpty>No stock found.</CommandEmpty>
            <CommandGroup>
              {stocks.map((stock) => (
                <CommandItem
                  key={stock.value}
                  value={stock.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue)
                    onStockSelect(newValue ? newValue.toUpperCase() : null);
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === stock.value.toLowerCase() ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {stock.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
