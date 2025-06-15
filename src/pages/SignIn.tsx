import {useState, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useToast} from "@/components/ui/use-toast";
import {AuthContext} from '../App';
import BrandiagaWatermark from "@/components/BrandiagaWatermark";
import {LoginRequest} from "@/Request/AuthRequest.tsx";
import {useDispatch} from "react-redux";
import {login} from "@/redux/Slicers/UserSlice.ts";
import {baseURL} from "@/hooks/UseAxiosSecure";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {toast} = useToast();
    const {setIsAuthenticated} = useContext(AuthContext);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            toast({
                title: "Error",
                description: "Please enter both email and password",
                variant: "destructive"
            });
            setLoading(false);
            return;
        }

        const data = {
            email,
            password
        }

        const res: { data } = await LoginRequest(data);
        if (res) {
            dispatch(login({
                username: res.data.firstName,
                role: 'user'
            }))
            localStorage.setItem("token", res.data.token);
            localStorage.setItem('isAuthenticated', 'true');
            res.data.roleName = 'User';
            res.data.token = ""
            localStorage.setItem('user', JSON.stringify(res.data));
            setIsAuthenticated(true);
            navigate('/');
        }
        console.log(res?.data);

        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
            <BrandiagaWatermark/>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link to="/" className="flex justify-center">
                    <span
                        className="text-3xl font-bold tracking-tight text-brandiaga-yellow-600 animate-pulse">Brandiaga</span>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link to="/signup"
                          className="font-medium text-brandiaga-yellow-600 hover:text-brandiaga-yellow-500">
                        create a new account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brandiaga-yellow-500 focus:border-brandiaga-yellow-500 sm:text-sm"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">


                            <div className="text-sm">
                                <a href="#"
                                   className="font-medium text-brandiaga-yellow-600 hover:text-brandiaga-yellow-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brandiaga-yellow-600 hover:bg-brandiaga-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandiaga-yellow-500"
                            >
                                {loading ? "Signing in..." : "Sign in"}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"/>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-3">
                            <div>
                                <Button
                                    variant="outline"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"

                                    onClick={() => window.location.href = `${baseURL}/api/auth/facebook`}
                                >
                                    <span className="sr-only">Sign in with Facebook</span>
                                    <svg className="w-5 h-5" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="16" cy="16" r="16" fill="#1877F2"/>
                                        <path
                                            d="M22 11h-3c-.6 0-1 .4-1 1v2h4l-.5 4h-3.5v10h-4v-10h-3v-4h3v-2c0-2.8 2.2-5 5-5h3v4z"
                                            fill="#fff"/>
                                    </svg>

                                </Button>

                            </div>

                            <div>
                                <Button
                                    variant="outline"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    onClick={() => window.location.href = `http://localhost:5147/api/auth/google`}
                                >
                                    <span className="sr-only">Sign in with Google</span>
                                    <svg className="w-5 h-5" viewBox="0 0 533.5 544.3"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill="#4285F4"
                                              d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.4H272v95.3h146.9c-6.3 33.7-25.2 62.3-53.8 81.4v67.4h86.8c50.8-46.7 81.6-115.6 81.6-193.7z"/>
                                        <path fill="#34A853"
                                              d="M272 544.3c72.8 0 133.8-24.2 178.4-65.6l-86.8-67.4c-24.1 16.2-54.8 25.8-91.6 25.8-70.4 0-130.1-47.6-151.4-111.4H32.4v69.9C76.4 482.2 167.3 544.3 272 544.3z"/>
                                        <path fill="#FBBC05"
                                              d="M120.6 325.7c-10.2-30.7-10.2-63.6 0-94.3v-69.9H32.4c-36.3 71.8-36.3 156.6 0 228.4l88.2-64.2z"/>
                                        <path fill="#EA4335"
                                              d="M272 107.2c39.6-.6 77.5 13.8 106.5 39.8l79.4-79.4C426.1 24.4 351.5-2.3 272 0 167.3 0 76.4 62.1 32.4 160.2l88.2 64.2c21.3-63.8 81-111.4 151.4-111.4z"/>
                                    </svg>

                                </Button>
                            </div>

                            <div>
                                <Button
                                    variant="outline"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    onClick={() => window.location.href = `${baseURL}/api/auth/twitter`}
                                >
                                    <span className="sr-only">Sign in with Twitter</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66
       10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0
       20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                                    </svg>

                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;