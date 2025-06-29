
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Download } from 'lucide-react';
import { toast } from 'sonner';

interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: string;
  status: string;
  type: string;
  category: string;
}

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

export const ExportModal = ({ isOpen, onClose, transactions }: ExportModalProps) => {
  const [selectedColumns, setSelectedColumns] = useState({
    name: true,
    date: true,
    amount: true,
    status: true,
    type: false,
    category: false
  });

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'date', label: 'Date' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'type', label: 'Type' },
    { key: 'category', label: 'Category' }
  ];

  const handleColumnToggle = (columnKey: string) => {
    setSelectedColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey as keyof typeof prev]
    }));
  };

  const generateCSV = () => {
    const selectedCols = Object.entries(selectedColumns)
      .filter(([_, selected]) => selected)
      .map(([key, _]) => key);

    if (selectedCols.length === 0) {
      toast.error('Please select at least one column to export');
      return;
    }

    // Create CSV header
    const headers = selectedCols.map(col => 
      columns.find(c => c.key === col)?.label || col
    );

    // Create CSV rows
    const rows = transactions.map(transaction => 
      selectedCols.map(col => transaction[col as keyof Transaction])
    );

    // Combine headers and rows
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('CSV file downloaded successfully!');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Export Transactions</DialogTitle>
          <DialogDescription className="text-gray-400">
            Select the columns you want to include in your CSV export.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {columns.map((column) => (
              <div key={column.key} className="flex items-center space-x-2">
                <Checkbox
                  id={column.key}
                  checked={selectedColumns[column.key as keyof typeof selectedColumns]}
                  onCheckedChange={() => handleColumnToggle(column.key)}
                  className="border-gray-600 data-[state=checked]:bg-green-600"
                />
                <Label htmlFor={column.key} className="text-white cursor-pointer">
                  {column.label}
                </Label>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={generateCSV}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
