import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";


import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { routes } from "../routes";
import { Link } from "react-router-dom";

interface LoginProps {
    heading?: string;
    subheading?: string;
    logo?: {
        url: string;
        src: string;
        alt: string;
    };
    loginText?: string;
    googleText?: string;
    githubText?: string;
    signupText?: string;
    signupUrl?: string;
}

const Login = ({
    heading = "Iniciar Sesión",
    subheading = "Bienvenido de nuevo",
    logo = {
        url: routes.home,
        src: "./src/assets/PetTrackerLogo.png",
        alt: "PetTrackerLogo",
    },
    loginText = "Iniciar Sesión",
    googleText = "Acceder con Google",
    githubText = "Acceder con GitHub",
    signupText = "¿Aún no tienes cuenta?",
    signupUrl = routes.signUp,
}: LoginProps) => {
    return (
        <section className="h-screen flex items-center justify-center bg-muted">
            <div className="container mx-auto">
                <div className="flex flex-col gap-4">
                    <div className="mx-auto w-full max-w-sm rounded-md p-6 shadow bg-white">
                        <div className="mb-6 flex flex-col items-center">
                            <Link to={logo.url} className="mb-3 flex items-center gap-2">
                                <img src={logo.src} className="max-h-11" alt={logo.alt} />
                            </Link>
                            <h1 className="mb-2 text-4xl font-bold">{heading}</h1>
                            <p className="text-muted-foreground">{subheading}</p>
                        </div>
                        <div className="grid gap-4">
                            <Input
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                required
                            />
                            <div className="flex justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        className="border-muted-foreground"
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Recordar contraseña
                                    </label>
                                </div>
                                <Link to={routes.resetPassword} className="text-sm text-primary hover:underline">
                                    Olvidé mi contraseña
                                </Link>
                            </div>
                            <Button type="submit" className="mt-2 w-full">
                                {loginText}
                            </Button>
                            <Button variant="outline" className="w-full">
                                <FcGoogle className="mr-2 size-5" />
                                {googleText}
                            </Button>
                            <Button variant="outline" className="w-full">
                                <FaGithub className="mr-2 size-5" />
                                {githubText}
                            </Button>
                        </div>
                        <div className="mx-auto mt-7 mb-2 flex justify-center gap-1 text-sm text-muted-foreground">
                            <p>{signupText}</p>
                            <Link to={signupUrl} className="font-medium text-primary hover:underline">
                                Registrate
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;