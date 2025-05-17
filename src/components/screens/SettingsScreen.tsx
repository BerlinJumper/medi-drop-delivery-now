
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Toggle } from "@/components/ui/toggle";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Settings,
  Edit,
  Lock,
  Package,
  Bell,
  Truck,
  Check,
  Download,
  TrashIcon,
} from "lucide-react";
import Logo from "@/components/Logo";

interface SettingsSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  icon,
  children,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <div className="text-primary mr-2">{icon}</div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <Card className="bg-white border-accent">
        <CardContent className="p-4">{children}</CardContent>
      </Card>
    </div>
  );
};

interface SettingsItemProps {
  label: string;
  onClick?: () => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ label, onClick }) => {
  return (
    <div
      className="py-3 px-2 hover:bg-accent/20 rounded-md cursor-pointer transition-colors"
      onClick={onClick}
    >
      <span>{label}</span>
    </div>
  );
};

interface OrderCardProps {
  orderId: string;
  medications: Array<{ name: string; packaging: string }>;
  deliveryMethod: string;
  eta: string;
  status: string;
  step: number;
  totalSteps: number;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  medications,
  deliveryMethod,
  eta,
  status,
  step,
  totalSteps,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const getProgressColor = (index: number) => {
    if (index < step) return "bg-green-500";
    if (index === step - 1) return "bg-primary";
    return "bg-gray-200";
  };

  const isCompleted = step === totalSteps;

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={setIsExpanded}
      className="mb-4 rounded-lg border bg-white overflow-hidden"
    >
      <CollapsibleTrigger className="w-full text-left p-4 hover:bg-accent/10 transition-colors">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium">{orderId}</div>
            <div className="text-sm text-gray-600">{status}</div>
          </div>
          <div className="text-sm text-gray-500">{eta}</div>
        </div>
        
        <div className="mt-3 flex space-x-1">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full ${getProgressColor(i)} ${
                i === 0 ? "flex-grow" : i === totalSteps - 1 ? "flex-grow" : "flex-grow"
              }`}
            />
          ))}
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="px-4 pb-4">
        <Separator className="mb-4" />
        
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-1">Medications:</h4>
            <ul className="list-disc list-inside pl-2 text-sm text-gray-600">
              {medications.map((med, idx) => (
                <li key={idx}>
                  {med.name} – {med.packaging}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Delivery Method:</span>
            <span>{deliveryMethod}</span>
          </div>
          
          {isCompleted ? (
            <div className="mt-2 flex items-center justify-between">
              <span className="text-green-600 font-medium flex items-center">
                <Check className="h-4 w-4 mr-1" />
                Completed
              </span>
              <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                <Download className="h-3 w-3" /> Receipt
              </Button>
            </div>
          ) : (
            <div className="text-primary font-medium text-sm mt-2">
              {step}/{totalSteps} - {status}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white pb-16"
    >
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="mr-4 p-1 rounded-full hover:bg-accent/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold">Settings</h1>
          </div>
          <Logo size="small" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <SettingsSection title="Account" icon={<Edit className="h-5 w-5" />}>
          <SettingsItem label="Edit Personal Information" />
          <SettingsItem label="Change Password" />
          <div className="flex items-center justify-between py-3 px-2">
            <span>Language Preference</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">English</span>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection title="Insurance & Health" icon={<Lock className="h-5 w-5" />}>
          <SettingsItem label="Update Insurance Card" />
          <SettingsItem label="Add New Insurance" />
          <div className="flex items-center justify-between py-3 px-2">
            <span>Allow Generic Alternatives</span>
            <Switch defaultChecked />
          </div>
          <SettingsItem label="View Medication History" />
        </SettingsSection>

        <SettingsSection title="Delivery Preferences" icon={<Truck className="h-5 w-5" />}>
          <SettingsItem label="Change Address" />
          <div className="flex items-center justify-between py-3 px-2">
            <span>Default Delivery Method</span>
            <div className="flex gap-2">
              <Toggle variant="outline" className="text-xs data-[state=on]:bg-primary data-[state=on]:text-white" defaultPressed>Drone</Toggle>
              <Toggle variant="outline" className="text-xs data-[state=on]:bg-primary data-[state=on]:text-white">Car</Toggle>
            </div>
          </div>
          <SettingsItem label="Preferred Time Window" />
          <SettingsItem label="Add Delivery Instructions" />
          
          <div className="mt-4 mb-2">
            <h3 className="text-sm font-medium mb-3">Notification Settings</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Push Notifications</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">SMS Notifications</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Notifications</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection title="Orders" icon={<Package className="h-5 w-5" />}>
          <h3 className="font-medium text-gray-700 mb-3">Active Orders</h3>
          
          <OrderCard 
            orderId="Order #A12345"
            status="Preparing at pharmacy"
            medications={[
              { name: "Paracetamol 500mg", packaging: "Pack of 20 tablets" },
              { name: "Salbutamol Inhaler", packaging: "3-pack" }
            ]}
            deliveryMethod="Car"
            eta="3–4 hours"
            step={1}
            totalSteps={3}
          />
          
          <OrderCard 
            orderId="Order #B67890"
            status="Courier on the way"
            medications={[
              { name: "Amoxicillin 250mg", packaging: "Box of 16 capsules" }
            ]}
            deliveryMethod="Car"
            eta="Between 18:00–19:00"
            step={2}
            totalSteps={3}
          />
          
          <OrderCard 
            orderId="Order #C33456"
            status="Drone in Transit"
            medications={[
              { name: "Cetirizine 10mg", packaging: "Pack of 10 tablets" },
              { name: "Nasal Spray", packaging: "15ml" }
            ]}
            deliveryMethod="Drone"
            eta="15 minutes"
            step={2}
            totalSteps={3}
          />
          
          <OrderCard 
            orderId="Order #D99887"
            status="Delivered"
            medications={[
              { name: "Ibuprofen 400mg", packaging: "Pack of 30 tablets" }
            ]}
            deliveryMethod="Drone"
            eta="Delivered at 14:12"
            step={3}
            totalSteps={3}
          />
          
          <Separator className="my-4" />
          
          <h3 className="font-medium text-gray-700 mb-3">Past Orders</h3>
          
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-2 border-b last:border-0">
                <div>
                  <div className="text-sm font-medium">Order #{(100000 + item).toString()}</div>
                  <div className="text-xs text-gray-500">April {10 + item}, 2025</div>
                </div>
                <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                  <Download className="h-3 w-3" /> Receipt
                </Button>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-4 text-sm">View All Past Orders</Button>
        </SettingsSection>

        <SettingsSection title="Privacy & Security" icon={<Lock className="h-5 w-5" />}>
          <SettingsItem label="Enable Two-Factor Authentication" />
          <SettingsItem label="Download My Data" />
          <SettingsItem label="Manage Consent and Data Sharing" />
          <div className="text-destructive py-3 px-2 hover:bg-red-50 rounded-md cursor-pointer">
            <div className="flex items-center">
              <TrashIcon className="h-4 w-4 mr-2" />
              <span>Delete Account</span>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection title="Support" icon={<Bell className="h-5 w-5" />}>
          <SettingsItem label="Help Center / FAQs" />
          <SettingsItem label="Contact Support" />
          <SettingsItem label="Report a Problem" />
        </SettingsSection>

        <SettingsSection title="Legal" icon={<Settings className="h-5 w-5" />}>
          <SettingsItem label="Terms of Service" />
          <SettingsItem label="Privacy Policy" />
          <SettingsItem label="Imprint / Legal Notice" />
        </SettingsSection>
      </div>
    </motion.div>
  );
};

export default SettingsScreen;
