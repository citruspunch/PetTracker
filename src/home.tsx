import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { routes } from "@/routes";

interface Testimonial {
    quote: string;
    author: string;
    role?: string;
    avatars: Array<{
        image: string;
        fallback: string;
    }>;
}

interface HomePageProps {
    heading?: string;
    description?: string;
    button?: {
        text: string;
        url: string;
    };
    testimonial?: Testimonial;
    images?: {
        first: string;
        second: string;
        third: string;
        fourth: string;
    };
}

const HomePage = ({
    heading = "Encuentra. Conecta. Protege.",
    description = "Con PetTracker, vincula tu mascota a una placa inteligente y recibe alertas si alguien la encuentra. Tu compañero siempre estará un escaneo más cerca.",
    button = {
        text: "Vincula tu mascota",
        url: routes.dashboard,
    },
    testimonial = {
        quote: "Hasta que no hayas amado a un animal, una parte de tu alma permanece dormida.",
        author: "Anatole France",
        avatars: [
            { image: "https://shadcnblocks.com/images/block/avatar-1.webp", fallback: "AB" },
            { image: "https://shadcnblocks.com/images/block/avatar-2.webp", fallback: "CD" },
            { image: "https://shadcnblocks.com/images/block/avatar-3.webp", fallback: "EF" },
        ],
    },
    images = {
        first: "src/assets/asset1.png",
        second: "src/assets/asset2.png",
        third: "src/assets/asset3.png",
        fourth: "src/assets/asset4.png",
    },
}: HomePageProps) => {
    return (
        <section className="py-12 md:py-20">
            <div className="container mx-auto px-6 lg:px-0">
                <div className="flex flex-col items-center gap-8 md:flex-row">
                    <div className="flex-1">
                        <div className="flex flex-col gap-4 lg:gap-8">
                            <h1 className="max-w-[80%] text-4xl leading-none font-bold text-foreground lg:text-5xl xl:text-7xl">
                                {heading}
                            </h1>
                            <p className="text-lg leading-snug text-muted-foreground xl:text-2xl">
                                {description}
                            </p>
                        </div>
                        <div className="my-6 lg:my-10">
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white" asChild size="lg">
                                <Link to={button.url}>{button.text}</Link>
                            </Button>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="relative flex -space-x-[1.5rem]">
                                {testimonial.avatars.map((avatar, index) => (
                                    <Avatar
                                        key={index}
                                        className={`relative z-${index + 1}0 flex h-12 w-12 flex-shrink-0 rounded-full border-2 border-white object-cover`}
                                    >
                                        <AvatarImage src={avatar.image} alt="" />
                                        <AvatarFallback>{avatar.fallback}</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                            <div>
                                <p className="mb-1 text-sm text-muted-2-foreground italic">
                                    &quot;{testimonial.quote}&quot;
                                </p>
                                <p className="text-sm font-medium text-muted-2-foreground">
                                    {testimonial.author}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex-1">
                        <div className="w-full max-w-[50rem]">
                            <AspectRatio ratio={1 / 1} className="h-full w-full">
                                <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-[3.5%]">
                                    <div className="overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                                            <img
                                                src={images.first}
                                                alt=""
                                                className="object-fit h-full w-full object-center"
                                            />
                                    </div>
                                    <div className="relative overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                                        <div className="relative top-[5%] left-[50%] w-[75%] max-w-[37.5rem] -translate-x-[50%]">
                                            <img
                                                src={images.second}
                                                alt=""
                                                className="absolute z-10 w-full rounded-[16%]"
                                            />
                                        </div>
                                    </div>
                                    <div className="relative overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                                            <img
                                                src={images.third}
                                                alt=""
                                                className="size-full object-cover object-center"
                                            />
                                    </div>
                                    
                                    <div className="relative overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                                        <div className="relative top-[3%] left-[50%] w-[95%] max-w-[37.5rem] -translate-x-[50%]">
                                            <img
                                                src={images.fourth}
                                                alt=""
                                                className="size-full object-cover object-center"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </AspectRatio>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomePage;