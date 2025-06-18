
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/Dashboard";
import ProductManagement from "@/components/ProductManagement";
import CategoryManagement from "@/components/CategoryManagement";
import StockManagement from "@/components/StockManagement";
import UserProfile from "@/components/UserProfile";
import { Package, BarChart3, Tags, Archive } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              Stock Vista System
            </h1>
            <p className="text-slate-600">
              Complete inventory management solution for your business
            </p>
          </div>
          <UserProfile />
        </header>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Tags className="w-4 h-4" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="stock" className="flex items-center gap-2">
              <Archive className="w-4 h-4" />
              Stock
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard />
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <ProductManagement />
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <CategoryManagement />
          </TabsContent>

          <TabsContent value="stock" className="space-y-6">
            <StockManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
