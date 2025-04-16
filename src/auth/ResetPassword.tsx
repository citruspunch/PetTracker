import { TbPasswordUser } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "../routes";
import { Link } from "react-router-dom";

interface ResetPasswordProps {
    heading?: string;
    subheading?: string;
    resetText?: string;
    loginText?: string;
    loginUrl?: string;
    logoUrl?: string;
}

const ResetPassword = ({
    heading = "Restablecer contraseña",
    subheading = "Ingresa tu correo electrónico para restablecer tu contraseña",
    resetText = "Enviar correo de restablecimiento",
    loginText = "¿Recuerdas tu contraseña?",
    loginUrl = routes.signIn,
    logoUrl = routes.home
}: ResetPasswordProps) => {
    return (
        <section className="h-screen flex items-center justify-center bg-muted">
            <div className="container mx-auto">
                <div className="flex flex-col gap-4">
                    <div className="mx-auto w-full max-w-sm rounded-md p-6 shadow bg-white">
                        <div className="mb-6 flex flex-col items-center">
                            <Link to={logoUrl}>
                                <TbPasswordUser className="size-10" />
                            </Link>
                            <h1 className="mb-5 mt-3 text-4xl font-bold text-center leading-9">{heading}</h1>
                            <p className="text-muted-foreground text-center">{subheading}</p>
                        </div>
                        <div className="grid gap-4">
                            <Input
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
                                required
                            />
                            <Button type="submit" className="mt-2 w-full">
                                {resetText}
                            </Button>
                        </div>
                        <div className="mx-auto mt-6 mb-2 flex justify-center gap-1 text-sm text-muted-foreground">
                            <p>{loginText}</p>
                            <Link to={loginUrl} className="font-medium text-primary hover:underline">
                                Iniciar Sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;