import React from 'react';
import { Sparkles, BookMarked, Compass, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TypewriterEffect } from './ui/typewriter-effect';

function Home() {
  const features = [
    {
      icon: <BookMarked className="w-8 h-8 mb-4 text-purple-400" />,
      title: "Save Thought Links",
      description: "Bookmark and preserve your valuable ideas and resources in one place."
    },
    {
      icon: <Compass className="w-8 h-8 mb-4 text-blue-400" />,
      title: "Smart Organization",
      description: "Categorize and structure your thoughts with intuitive organization tools."
    },
    {
      icon: <Lightbulb className="w-8 h-8 mb-4 text-yellow-400" />,
      title: "Quick Access",
      description: "Instantly retrieve your saved thoughts whenever inspiration strikes."
    }
  ];
   const words = [
    {
      text: "Save,",
    },
    { 
      text: "Organize,",
    },
    {
      text: "and",
    },
    {
      text: "Revisit",
    },
    {
      text: "Your",
    },
    {
      text: "Thoughts",
      className: "text-blue-400",
    },
  ];

  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),rgba(0,0,0,0))]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-block">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/10 text-purple-300 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Your Personal Thought Sanctuary
            </span>
          </div>

          <div className='mb-3'>
            <TypewriterEffect words={words}/>
          </div>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed sm:leading-normal md:leading-loose max-w-lg sm:max-w-xl md:max-w-2xl mx-auto px-4 sm:px-6">
            Transform your digital experience with a powerful platform that brings your ideas, 
            links, and videos together in perfect harmony.
          </p>
          {token ? (
           <Link to={"/content"}><button
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium sm:font-semibold text-sm sm:text-base md:text-lg transform transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Explore
            </button>
        </Link>
      ) : (
        <Link to={"/signup"}>
          <button
            className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium sm:font-semibold text-sm sm:text-base md:text-lg transform transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Get Started for Free
          </button>
        </Link>
      )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
              <div className="relative">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;