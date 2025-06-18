
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, TrendingUp, TrendingDown, Package, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StockManagement = () => {
  const { toast } = useToast();
  const [isStockDialogOpen, setIsStockDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [movementType, setMovementType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");

  const [stockMovements, setStockMovements] = useState([
    {
      id: 1,
      productName: "iPhone 15 Pro",
      type: "IN",
      quantity: 20,
      reason: "New shipment received",
      date: "2024-06-18T10:00:00Z",
      user: "Admin"
    },
    {
      id: 2,
      productName: "MacBook Pro",
      type: "OUT",
      quantity: 5,
      reason: "Sale to customer",
      date: "2024-06-17T14:30:00Z",
      user: "Sales Team"
    },
    {
      id: 3,
      productName: "Wireless Headphones",
      type: "IN",
      quantity: 15,
      reason: "Restocking",
      date: "2024-06-16T09:15:00Z",
      user: "Warehouse"
    },
    {
      id: 4,
      productName: "Smart Watch",
      type: "OUT",
      quantity: 3,
      reason: "Damaged items removal",
      date: "2024-06-15T16:45:00Z",
      user: "Quality Control"
    }
  ]);

  const products = [
    { name: "iPhone 15 Pro", currentStock: 25 },
    { name: "MacBook Pro", currentStock: 12 },
    { name: "Wireless Headphones", currentStock: 45 },
    { name: "Smart Watch", currentStock: 30 }
  ];

  const lowStockProducts = products.filter(p => p.currentStock <= 15);
  const wellStockedProducts = products.filter(p => p.currentStock > 15);

  const handleStockMovement = () => {
    if (!selectedProduct || !movementType || !quantity || !reason) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const movement = {
      id: stockMovements.length + 1,
      productName: selectedProduct,
      type: movementType,
      quantity: parseInt(quantity),
      reason: reason,
      date: new Date().toISOString(),
      user: "Current User"
    };

    setStockMovements([movement, ...stockMovements]);
    setSelectedProduct("");
    setMovementType("");
    setQuantity("");
    setReason("");
    setIsStockDialogOpen(false);

    toast({
      title: "Success",
      description: `Stock ${movementType === 'IN' ? 'added' : 'removed'} successfully`
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMovementIcon = (type: string) => {
    return type === "IN" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  const getMovementColor = (type: string) => {
    return type === "IN" ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Stock Management</h2>
          <p className="text-muted-foreground">Track and manage inventory movements</p>
        </div>
        
        <Dialog open={isStockDialogOpen} onOpenChange={setIsStockDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Record Movement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Record Stock Movement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="product">Product *</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map(product => (
                      <SelectItem key={product.name} value={product.name}>
                        {product.name} (Current: {product.currentStock})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="type">Movement Type *</Label>
                <Select value={movementType} onValueChange={setMovementType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IN">Stock In (+)</SelectItem>
                    <SelectItem value="OUT">Stock Out (-)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                />
              </div>

              <div>
                <Label htmlFor="reason">Reason *</Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New shipment received">New shipment received</SelectItem>
                    <SelectItem value="Sale to customer">Sale to customer</SelectItem>
                    <SelectItem value="Restocking">Restocking</SelectItem>
                    <SelectItem value="Damaged items removal">Damaged items removal</SelectItem>
                    <SelectItem value="Return from customer">Return from customer</SelectItem>
                    <SelectItem value="Transfer between locations">Transfer between locations</SelectItem>
                    <SelectItem value="Inventory adjustment">Inventory adjustment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleStockMovement} className="w-full">
                Record Movement
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="movements">Movements</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stock Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Products</p>
                    <p className="text-2xl font-bold">{products.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Well Stocked</p>
                    <p className="text-2xl font-bold">{wellStockedProducts.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Low Stock</p>
                    <p className="text-2xl font-bold">{lowStockProducts.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Stock Levels */}
          <Card>
            <CardHeader>
              <CardTitle>Current Stock Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">Current Stock</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{product.currentStock}</p>
                      {product.currentStock <= 15 ? (
                        <Badge variant="destructive">Low Stock</Badge>
                      ) : (
                        <Badge variant="default">In Stock</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Stock Movements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockMovements.map((movement) => (
                  <div key={movement.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${movement.type === 'IN' ? 'bg-green-100' : 'bg-red-100'}`}>
                        <div className={getMovementColor(movement.type)}>
                          {getMovementIcon(movement.type)}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">{movement.productName}</h4>
                        <p className="text-sm text-muted-foreground">{movement.reason}</p>
                        <p className="text-xs text-muted-foreground">by {movement.user}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getMovementColor(movement.type)}`}>
                        {movement.type === 'IN' ? '+' : '-'}{movement.quantity}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(movement.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Stock Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {lowStockProducts.length > 0 ? (
                <div className="space-y-4">
                  {lowStockProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">Stock level is below recommended threshold</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive" className="animate-pulse">
                          {product.currentStock} left
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          Reorder recommended
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">All products well stocked</h3>
                  <p className="text-muted-foreground">No stock alerts at this time</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockManagement;
