import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "../App";
import BrandiagaWatermark from "@/components/BrandiagaWatermark";
import { SignupRequest } from "@/Request/AuthRequest";

const SignUp = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setIsAuthenticated } = useContext(AuthContext);

  const address = localStorage.getItem("userLocation");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple validation
    if (!name || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive",
      });
      setLoading(false);
      return;
    } else {
      const data = {
        firstName: name,
        lastName: lastName,
        email: email,
        password: password,
        role: "user",
        phoneNumber: phone,
        address: address || "",
      };

      const res = await SignupRequest(data);
      if (res) {
        toast({
          title: "Account created",
          description: "Welcome to Brandiaga!",
        });
        navigate("/signin");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <BrandiagaWatermark />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <span className="text-3xl font-bold tracking-tight text-brandiaga-yellow-600 animate-pulse">
            Brandiaga
          </span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/signin"
            className="font-medium text-brandiaga-yellow-600 hover:text-brandiaga-yellow-500">
            sign in to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <div className="mt-1">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brandiaga-yellow-500 focus:border-brandiaga-yellow-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <div className="mt-1">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brandiaga-yellow-500 focus:border-brandiaga-yellow-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brandiaga-yellow-500 focus:border-brandiaga-yellow-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1">
                <Input
                  id="phone"
                  name="phone"
                  type="phone"
                  autoComplete="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brandiaga-yellow-500 focus:border-brandiaga-yellow-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brandiaga-yellow-500 focus:border-brandiaga-yellow-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <div className="mt-1">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brandiaga-yellow-500 focus:border-brandiaga-yellow-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-brandiaga-yellow-600 focus:ring-brandiaga-yellow-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-900">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-brandiaga-yellow-600 hover:text-brandiaga-yellow-500">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    className="text-brandiaga-yellow-600 hover:text-brandiaga-yellow-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brandiaga-yellow-600 hover:bg-brandiaga-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandiaga-yellow-500">
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
