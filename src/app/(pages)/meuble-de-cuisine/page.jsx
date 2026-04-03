import HomeCategory from "@/components/HomeCategory";



export async function generateMetadata({ params }) {

    return {
        title: "Meubles de cuisine",
        description: "Meubles de cuisine, d'aménagement, Caisson de cuisin, Ports, Accessoires de cuisine",
    };
}


export default async function page({ params }) {


    return (
        <div className="min-h-screen">
            <HomeCategory />
        </div>
    );
}