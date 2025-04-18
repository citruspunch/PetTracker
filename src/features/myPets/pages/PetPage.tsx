import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { routes } from "@/routes";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";

interface PetAttributes {
    name: string;
    url: string;
}

interface PetsCategory {
    category: string;
    attributes: PetAttributes[];
}

interface Careers4Props {
    heading?: string;
    pets?: PetsCategory[];
}

const MyPetsPage = ({
    heading = "Mis Mascotas",
    pets = petsDataExample,
}: Careers4Props) => {
    return (
        <>
            <Navbar />
            <section className="py-15">
                <div className="container mx-auto">
                    <div className="mx-auto max-w-screen-lg">
                        <div className="text-center lg:text-left">
                            <h1 className="text-left text-3xl font-medium md:text-4xl">
                                {heading}
                            </h1>
                        </div>
                        <div className="mx-auto mt-6 flex flex-col gap-16 md:mt-14">
                            {pets.map((petCategory) => (
                                <div key={petCategory.category} className="grid">
                                    <h2 className="border-b pb-4 text-xl font-bold">
                                        {petCategory.category}
                                    </h2>
                                    {petCategory.attributes.map((pet) => (
                                        <div
                                            key={pet.name}
                                            className="flex items-center justify-between border-b py-4"
                                        >
                                            <div className="font-semibold">
                                                {pet.name}
                                            </div>
                                            <Button variant="outline" className="rounded-full">
                                                <Link to={pet.url} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                                    <span className="text-xs">
                                                        Ver detalles
                                                    </span>
                                                    <ArrowRight className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const petsDataExample = [
    {
        category: "Perros",
        attributes: [
            {
                name: "Luna",
                url: routes.petDetails,
            },
            {
                name: "Kira",
                url: routes.petDetails,
            },
            {
                name: "Rambo",
                url: routes.petDetails,
            }
        ],
    },
    {
        category: "Gatos",
        attributes: [
            {
                name: "Michi",
                url: routes.petDetails,
            },
            {
                name: "Coco",
                url: routes.petDetails,
            },
        ],
    },
];

export default MyPetsPage;