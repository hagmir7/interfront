
import ContactForm from '@/components/ContactForm';
import React from 'react';

const ContactPage = () => {


  return (
    <section className="px-4 py-10 md:py-32 md:mx-auto relative overflow-hidden bg-red-500">
      <div className="relative z-10 grid gap-16 px-4 md:grid-cols-2 md:max-w-7xl md:mx-auto">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-left text-white md:text-4xl animate__animated animate__fadeInRight">
            Contactez-nous
          </h1>
          <h2 className="text-xl font-bold text-left text-white md:text-2xl animate__animated animate__fadeInRight mb-0">
            Intercocina - Là où les saveurs rencontrent l'innovation
          </h2>
          <div className="space-y-2 hidden md:block">
            <p className="text-white text-start md:text-lg animate__animated animate__fadeInRight">
              Contactez-nous pour tous vos besoins et questions culinaires. Nous sommes là pour vous servir !
            </p>
            <p className="text-white text-start md:text-lg animate__animated animate__fadeInRight">
              Vous pouvez également saisir votre email pour exprimer votre intérêt! Nous vous contacterons dès que la prochaine session sera disponible.
            </p>
          </div>
        </div>
        <div className="animate__animated animate__fadeInLeft">
         <ContactForm />
        </div>
      </div>
      
      <div className="absolute z-0 rounded-full bg-gray-300 w-28 h-28 md:w-80 md:h-80 md:-top-36 md:-right-28 -top-12 -right-6"></div>
      <div className="bg-gray-300 hidden md:block w-80 h-80 rounded-full absolute z-0 md:-bottom-36 md:-left-28"></div>
    </section>
  );
};

export default ContactPage;