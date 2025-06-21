import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Package } from "lucide-react";
import { Loader2 } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    const { error } = await signIn(email, password);
  
    if (error) {
      toast.error(error.message || "Failed to sign in");
    } else {
      toast.success("Successfully signed in!");
      navigate("/");
    }
  
    setLoading(false);
  };
  
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    const { error } = await signUp(email, password, fullName);
  
    if (error) {
      toast.error(error.message || "Failed to create account");
    } else {
      toast.success("Account created successfully! Please verify your email.");
    }
  
    setLoading(false);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100 px-4 py-12">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border border-blue-100">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Package className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-800">Stock Vista</h1>
          </div>
          <CardTitle className="text-base text-gray-600">Welcome to your inventory system</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="signin" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="signin"
                className="transition-all duration-200 hover:bg-blue-100 data-[state=active]:bg-blue-200 data-[state=active]:font-semibold"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="transition-all duration-200 hover:bg-blue-100 data-[state=active]:bg-blue-200 data-[state=active]:font-semibold"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Sign In Form */}
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>

                <Button type="submit" className="w-full transition-all duration-300" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            {/* Sign Up Form */}
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Choose a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>

                <Button type="submit" className="w-full transition-all duration-300" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
