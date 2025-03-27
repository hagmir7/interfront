import React from 'react';

const events = [
  {
    image: "https://intercocina.com/storage/public/2/01J9K1AZ35FZ8X20SS6NWEAD0V.png",
    title: "Salon International du Bâtiment 18éme edition",
    description: "Nous tenons à vous remercier chaleureusement pour avoir pris le temps de visiter....",
    link: "#!"
  },
  {
    image: "https://intercocina.com/storage/public/11/01JEP2X2RGX35C4ZTFM3AG8014.png",
    title: "Salon International du Bâtiment 19éme version",
    description: "Lors de la 19ème édition du Salon International du Bâtiment (SIB) à El Jadida, q....",
    link: "#!"
  }
];

export const metadata = {
  title: "Événements et exposition - Intercocina",
  description: "Intercocina est une entreprise spécialisée dans la fabrication de meubles de cuisine, meubles TV, placards et armoires, meubles de salle de bain, ainsi que de parquets, au Maroc.",
};

const EventsSection = () => {


  // const response = fetch("https://intercocina.com/api/events")
  // if(!response.ok) {
  //   throw new Error("Failed to fetch events")
  // }
  // const data = response.json()


  return (
    <section className="px-4 py-20 md:max-w-6xl md:mx-auto bg-[#f2f2f2]">
      <div className="px-3 max-w-3xl m-auto">
        <div>
          <h2 className="mb-4 text-3xl font-bold text-center md:text-4xl">
            Joignez-vous à Nous lors des Événements
          </h2>
          <p className="text-center text-slate-500 md:text-lg">
            Clés pour Tout Savoir sur les Tendances de la Cuisine et du Design.
          </p>
        </div>
      </div>
      <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4 mt-8">
        {events.map((event, index) => (
          <div key={index} className="rounded-xl bg-white border-2 border-gray-400 overflow-hidden">
            <a 
              href={event.link} 
              className="relative flex sm:h-96 h-auto overflow-hidden bg-gray-300"
            >
              <img 
                src={event.image} 
                alt={event.title} 
                title={event.title}
                loading="lazy"
                className="object-cover w-full h-full border-gray-400"
              />
            </a>
            <div className="mt-4 pb-5 px-3">
              <a href={event.link}>
                <h2 className="text-lg font-semibold leading-tight text-gray-900">
                  {event.title}
                </h2>
              </a>
              <div className="mt-2 flex items-center justify-between">
                <p className="w-full">
                  <span className="text-sm text-slate-900">
                    {event.description}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;