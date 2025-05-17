
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Minus, ShoppingCart, Home, Pill, PillIcon, Eye, Thermometer, Droplets } from "lucide-react";
import { toast } from "sonner";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";

// Custom icons for items that don't have direct Lucide equivalents
const BottleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 2h6v3H9z" />
    <path d="M19 6H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2z" />
    <path d="M12 12v6" />
    <path d="M9 15h6" />
  </svg>
);

const SprayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 4h2v4H4z" />
    <path d="M8 3h4v6H8z" />
    <path d="M14 8v13a1 1 0 001 1h4a1 1 0 001-1V8h-6z" />
    <path d="M17 3v5" />
    <path d="M21 8l-2-2" />
    <path d="M21 3l-3 3" />
  </svg>
);

const TabletsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="8" width="6" height="12" rx="3" />
    <rect x="15" y="4" width="6" height="12" rx="3" />
  </svg>
);

const VitaminIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="7" />
    <path d="M12 9v6" />
    <path d="M15 12h-6" />
    <path d="M12 5V3" />
    <path d="M19 12h2" />
    <path d="M12 19v2" />
    <path d="M5 12H3" />
  </svg>
);

interface ProductSize {
  label: string;
  price: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  image?: string;
  icon: React.ReactNode;
  color: string;
  sizes: ProductSize[];
  selectedSize?: ProductSize;
  quantity: number;
}

const OtcCatalogScreen: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Paracetamol Tablets",
      description: "For headache, pain, and fever relief",
      image: "/lovable-uploads/af27ec8e-689f-4990-ab5d-4e884842e363.png",
      icon: <PillIcon className="h-12 w-12" />,
      color: "#E9F7FF",
      sizes: [
        { label: "10 tablets", price: 3.99 },
        { label: "20 tablets", price: 6.99 },
        { label: "30 tablets", price: 9.99 },
      ],
      quantity: 0
    },
    {
      id: 2,
      name: "Ibuprofen 400mg",
      description: "Anti-inflammatory pain relief",
      icon: <Pill className="h-12 w-12" />,
      color: "#FFE9E9",
      sizes: [
        { label: "10 tablets", price: 4.49 },
        { label: "20 tablets", price: 7.99 },
        { label: "30 tablets", price: 10.99 },
      ],
      quantity: 0
    },
    {
      id: 3,
      name: "Antihistamine (Cetirizine)",
      description: "For allergy relief and hay fever",
      icon: <Pill className="h-12 w-12" />,
      color: "#E6FFEA",
      sizes: [
        { label: "7 tablets", price: 4.99 },
        { label: "14 tablets", price: 8.99 },
      ],
      quantity: 0
    },
    {
      id: 4,
      name: "Nasal Spray",
      description: "For congestion and sinus relief",
      icon: <SprayIcon className="h-12 w-12" />,
      color: "#E0F0FF",
      sizes: [
        { label: "15ml", price: 5.49 },
        { label: "30ml", price: 9.49 },
      ],
      quantity: 0
    },
    {
      id: 5,
      name: "Cough Syrup",
      description: "For dry and tickly cough relief",
      icon: <BottleIcon className="h-12 w-12" />,
      color: "#F5E6FF",
      sizes: [
        { label: "100ml", price: 6.99 },
        { label: "200ml", price: 12.99 },
      ],
      quantity: 0
    },
    {
      id: 6,
      name: "Throat Lozenges",
      description: "Soothing relief for sore throats",
      icon: <TabletsIcon className="h-12 w-12" />,
      color: "#FFF4E0",
      sizes: [
        { label: "12 lozenges", price: 3.49 },
        { label: "24 lozenges", price: 5.99 },
      ],
      quantity: 0
    },
    {
      id: 7,
      name: "Pain Relief Gel",
      description: "Topical relief for muscle & joint pain",
      icon: <Droplets className="h-12 w-12" />,
      color: "#E0F5FF",
      sizes: [
        { label: "30g", price: 7.49 },
        { label: "50g", price: 11.99 },
      ],
      quantity: 0
    },
    {
      id: 8,
      name: "Digestive Enzyme Tablets",
      description: "Aids digestion and reduces bloating",
      icon: <TabletsIcon className="h-12 w-12" />,
      color: "#FFF0E0",
      sizes: [
        { label: "20 tablets", price: 8.99 },
        { label: "40 tablets", price: 15.99 },
      ],
      quantity: 0
    },
    {
      id: 9,
      name: "Vitamin C 1000mg",
      description: "Immune system support",
      icon: <VitaminIcon className="h-12 w-12" />,
      color: "#FFFFE0",
      sizes: [
        { label: "30 tablets", price: 6.49 },
        { label: "60 tablets", price: 11.49 },
      ],
      quantity: 0
    },
    {
      id: 10,
      name: "Eye Drops",
      description: "Relieves dry and irritated eyes",
      icon: <Eye className="h-12 w-12" />,
      color: "#E0F0FF",
      sizes: [
        { label: "10ml", price: 5.99 },
        { label: "20ml", price: 9.99 },
      ],
      quantity: 0
    },
    {
      id: 11,
      name: "Antacid Tablets",
      description: "Relieves heartburn and indigestion",
      icon: <TabletsIcon className="h-12 w-12" />,
      color: "#F0F0F0",
      sizes: [
        { label: "12 tablets", price: 4.29 },
        { label: "24 tablets", price: 7.49 },
      ],
      quantity: 0
    },
    {
      id: 12,
      name: "Electrolyte Powder Sachets",
      description: "Rehydration for active lifestyles",
      icon: <Droplets className="h-12 w-12" />,
      color: "#F0FFFF",
      sizes: [
        { label: "5 sachets", price: 6.99 },
        { label: "10 sachets", price: 12.49 },
      ],
      quantity: 0
    },
  ]);

  const [cartCount, setCartCount] = useState(0);

  const handleSizeSelect = (productId: number, size: ProductSize) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return { ...product, selectedSize: size };
      }
      return product;
    }));
  };

  const increaseQuantity = (productId: number) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    }));
  };

  const decreaseQuantity = (productId: number) => {
    setProducts(products.map(product => {
      if (product.id === productId && product.quantity > 0) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    }));
  };

  const addToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product || !product.selectedSize) {
      toast.error("Please select a size first");
      return;
    }
    if (product.quantity <= 0) {
      toast.error("Please select at least one item");
      return;
    }

    setCartCount(prevCount => prevCount + product.quantity);
    toast.success(`Added ${product.quantity} ${product.name} to cart`);
    
    // Reset quantity after adding to cart
    setProducts(products.map(p => {
      if (p.id === productId) {
        return { ...p, quantity: 0 };
      }
      return p;
    }));
  };

  const handleContinue = () => {
    if (cartCount > 0) {
      navigate('/delivery');
    } else {
      toast.error("Please add at least one item to your cart");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center px-4 pt-10 pb-24"
    >
      <BackButton previousRoute="/medication-type" />

      <div className="absolute top-4 right-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/")}
          className="text-primary hover:bg-accent/30"
        >
          <Home className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="flex justify-center mb-6">
        <Logo size="small" />
      </div>

      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Choose Your Items</h1>
              <p className="text-gray-600">
                Select any over-the-counter medications you'd like delivered.
              </p>
            </div>
            <div className="relative">
              <ShoppingCart className="h-7 w-7 text-primary" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {products.map(product => (
              <Card key={product.id} className="overflow-hidden">
                <CardContent className="p-4">
                  {product.image ? (
                    <div className="aspect-video rounded-lg mb-3 overflow-hidden flex items-center justify-center bg-white">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="object-contain w-full h-full max-h-36"
                      />
                    </div>
                  ) : (
                    <div 
                      className="aspect-video rounded-lg mb-3 flex items-center justify-center" 
                      style={{ backgroundColor: product.color }}
                    >
                      {product.icon}
                    </div>
                  )}
                  
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">Size</label>
                      <Select 
                        onValueChange={(value) => {
                          const size = product.sizes.find(s => s.label === value);
                          if (size) handleSizeSelect(product.id, size);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.sizes.map((size, idx) => (
                            <SelectItem key={idx} value={size.label}>
                              {size.label} - ${size.price.toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">Quantity</label>
                      <div className="flex items-center border rounded-md">
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          onClick={() => decreaseQuantity(product.id)}
                          disabled={product.quantity <= 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="flex-1 text-center">{product.quantity}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          onClick={() => increaseQuantity(product.id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      className="w-full"
                      onClick={() => addToCart(product.id)}
                      disabled={!product.selectedSize || product.quantity <= 0}
                    >
                      Add to Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {cartCount > 0 && (
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-md">
              <div className="mx-auto max-w-6xl">
                <Button
                  className="w-full py-6 text-lg"
                  onClick={handleContinue}
                >
                  Continue to Delivery
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OtcCatalogScreen;
