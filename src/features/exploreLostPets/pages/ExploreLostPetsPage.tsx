import {
    ArrowRight
} from "lucide-react";
import { MdPets } from "react-icons/md";
import { MapPinned } from 'lucide-react';
import React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/navbar";
import { Link } from "react-router-dom";

interface LostPet {
    image?: string;
    name: string;
    species: string;
    date: string;
    location: string;
    link: string;
}

interface ExploreLostPetsProps {
    heading?: string;
    items?: LostPet[];
}

const ExploreLostPets = ({
    heading = "Mascotas Perdidas",
    items = exampleData,
}: ExploreLostPetsProps) => {
    return (
        <>
            <Navbar />
            <section className="py-8">
                <div className="container mx-auto">
                    <h1 className="mb-10 px-4 text-3xl font-semibold md:text-4xl">
                        {heading}
                    </h1>
                    <div className="flex flex-col">
                        <Separator />
                        {items.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className="grid items-center gap-4 px-4 py-5 md:grid-cols-4">
                                    <div className="order-2 flex items-center gap-2 md:order-none">
                                        <span className="flex h-20 w-22 shrink-0 items-center justify-center rounded-md bg-muted">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-full w-full rounded-md object-cover"
                                                />
                                            ) : (
                                                <MdPets className="h-9 w-9 text-muted-foreground" />
                                            )}
                                        </span>
                                        <div className="flex flex-col">
                                            <h3 className="text-[18px] font-semibold">{item.name}</h3>
                                            <p className="text-[15px] text-muted-foreground">
                                                Especie: {item.species}
                                            </p>
                                            <p className="text-[15px] text-muted-foreground">
                                                Fecha de desaparición: {item.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-4 md:order-none md:col-span-2">
                                        <MapPinned />
                                        <p className="order-1 text-2xl font-semibold md:order-none md:col-span-2">
                                            {item.location}
                                        </p>
                                    </div>
                                    <Button variant="outline" asChild>
                                        <Link
                                            className="order-3 ml-auto w-fit gap-2 md:order-none"
                                            to={item.link}
                                        >
                                            <span>Ver más</span>
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                                <Separator />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export const exampleData: LostPet[] = [
    {
        image: "https://cdn.sanity.io/images/5vm5yn1d/pro/5cb1f9400891d9da5a4926d7814bd1b89127ecba-1300x867.jpg?fm=webp&q=80",
        name: "Luna",
        species: "Perro",
        date: "2024-10-05",
        location: "Zona 16, Ciudad de Guatemala",
        link: "/mascotas-perdidas/luna"
    },
    {
        image: "https://th.bing.com/th/id/OIP.FKIgrS0iXezi-H_jKdemIwHaHa?w=172&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        name: "Michi",
        species: "Gato",
        date: "2024-10-01",
        location: "Mixco, El Milagro",
        link: "/mascotas-perdidas/michi"
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqFqSGu35kbVqLXJXC-dC4TGmEvtZpFTfl2g&s",
        name: "Kira",
        species: "Perro",
        date: "2024-09-28",
        location: "Antigua Guatemala",
        link: "/mascotas-perdidas/kira"
    },
    {
        image: "https://img.freepik.com/foto-gratis/perro-pug-aislado-fondo-blanco_2829-11416.jpg",
        name: "Rambo",
        species: "Perro",
        date: "2024-10-03",
        location: "Zona 5, Ciudad de Guatemala",
        link: "/mascotas-perdidas/rambo"
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/220px-Cat_November_2010-1a.jpg",
        name: "Coco",
        species: "Gato",
        date: "2024-10-06",
        location: "Villa Nueva, Bárcenas",
        link: "/mascotas-perdidas/coco"
    }
];

export default ExploreLostPets;