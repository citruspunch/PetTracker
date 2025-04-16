import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "@/routes";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

interface SignupProps {
    heading?: string;
    subheading?: string;
    logo?: {
        url: string;
        src: string;
        alt: string;
        title?: string;
    };
    signupText?: string;
    googleText?: string;
    githubText?: string;
    loginText?: string;
    loginUrl?: string;
}

const Signup = ({
    heading = "Registrarse",
    subheading = "Crea una cuenta para comenzar",
    logo = {
        url: routes.home,
        src: "./src/assets/PetTrackerLogo.png",
        alt: "PetTrackerLogo",
        title: "Pet Tracker",
    },
    googleText = "Registrarse con Google",
    githubText = "Registrarse con GitHub",
    signupText = "Crear cuenta",
    loginText = "¿Ya tienes una cuenta?",
    loginUrl = routes.signIn,
}: SignupProps) => {
    return (
        <section className="h-screen bg-muted">
            <div className="flex h-full items-center justify-center mx-auto">
                <div className="flex w-full max-w-sm flex-col items-center gap-y-6 rounded-md border border-muted bg-white px-6 py-8 shadow-md">
                    <div className="flex flex-col items-center gap-y-2">
                        {/* Logo */}
                        <div className="flex items-center gap-2 lg:justify-start">
                            <Link to={logo.url}>
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    title={logo.title}
                                    className="h-12"
                                />
                            </Link>
                        </div>
                        <h1 className="text-3xl font-semibold">{heading}</h1>
                        {subheading && (
                            <p className="text-sm text-muted-foreground">{subheading}</p>
                        )}
                    </div>
                    <div className="flex w-full flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Input
                                    type="email"
                                    placeholder="Correo Electrónico"
                                    required
                                    className="bg-white"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Input
                                    type="password"
                                    placeholder="Contraseña"
                                    required
                                    className="bg-white"
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <Button type="submit" className="mt-2 w-full">
                                    {signupText}
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
                        </div>
                    </div>
                    <div className="flex justify-center gap-1 text-sm text-muted-foreground">
                        <p>{loginText}</p>
                        <Link
                            to={loginUrl}
                            className="font-medium text-primary hover:underline"
                        >
                            Iniciar sesión
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;