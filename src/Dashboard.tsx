import Navbar from "./components/navbar";

interface Feature {
    title: string;
    description: string;
    image: string;
}

interface DashboardProps {
    heading: string;
    description?: string;
    feature1: Feature;
    feature2: Feature;
    feature3: Feature;
    feature4: Feature;
}

const Dashboard = ({
    heading,
    description = "Consulta la actividad reciente, accede rápidamente a tus mascotas y mantente al tanto de cualquier novedad.",
    feature1,
    feature2,
    feature3,
    feature4,
}: DashboardProps) => {
    return (
        <>
            <Navbar />
            <section className="py-12">
                <div className="container mx-auto flex flex-col items-center justify-center">
                    <div className="mb-5 lg:mb-12 flex flex-col items-center gap-6">
                        <h1 className="text-center text-3xl font-semibold max-w-5/6 md:max-w-2xl lg:max-w-3xl lg:text-5xl">
                            {heading}
                        </h1>
                        <p className="text-center text-lg font-medium text-muted-foreground max-w-5/6 md:max-w-2xl lg:max-w-4xl lg:text-xl">
                            {description}
                        </p>
                    </div>
                    <div className="relative flex justify-center">
                        <div className="border-muted2 relative flex w-5/6 flex-col border lg:w-full">
                            <div className="relative flex flex-col lg:flex-row">
                                <div className="border-muted2 flex flex-col justify-between border-b border-solid p-10 lg:border-r lg:border-b-0">
                                    <h2 className="text-xl font-semibold">{feature1.title}</h2>
                                    <p className="text-muted-foreground">{feature1.description}</p>
                                    <img
                                        src={feature1.image}
                                        alt={feature1.title}
                                        className="mt-8 aspect-[1.5] h-full w-full object-contain lg:aspect-[2.4] bg-muted"
                                    />
                                </div>

                            </div>
                            <div className="border-muted2 relative flex flex-col border-t border-solid lg:flex-row">
                                <div className="border-muted2 flex flex-col justify-between border-b border-solid p-10 lg:w-2/5 lg:border-r lg:border-b-0">
                                    <h2 className="text-xl font-semibold">{feature3.title}</h2>
                                    <p className="text-muted-foreground">{feature3.description}</p>
                                    <img
                                        src={feature3.image}
                                        alt={feature3.title}
                                        className="mt-8 aspect-[1.45] h-full w-full object-contain bg-muted"
                                    />
                                </div>
                                <div className="flex flex-col justify-between p-10 lg:w-3/5">
                                    <h2 className="text-xl font-semibold">{feature4.title}</h2>
                                    <p className="text-muted-foreground">{feature4.description}</p>
                                    <img
                                        src={feature4.image}
                                        alt={feature4.title}
                                        className="mt-8 aspect-[1.5] h-full w-full object-contain bg-muted lg:aspect-[2.4]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;