
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./components/screens/WelcomeScreen";
import MedicationTypeScreen from "./components/screens/MedicationTypeScreen";
import OtcCatalogScreen from "./components/screens/OtcCatalogScreen";
import AddressScreen from "./components/screens/AddressScreen";
import InsuranceScreen from "./components/screens/InsuranceScreen";
import MedicationsScreen from "./components/screens/MedicationsScreen";
import DeliveryMethodScreen from "./components/screens/DeliveryMethodScreen";
import SummaryScreen from "./components/screens/SummaryScreen";
import SettingsScreen from "./components/screens/SettingsScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/medication-type" element={<MedicationTypeScreen />} />
          <Route path="/otc-catalog" element={<OtcCatalogScreen />} />
          <Route path="/address" element={<AddressScreen />} />
          <Route path="/insurance" element={<InsuranceScreen />} />
          <Route path="/medications" element={<MedicationsScreen />} />
          <Route path="/delivery" element={<DeliveryMethodScreen />} />
          <Route path="/summary" element={<SummaryScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
