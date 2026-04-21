import React from 'react';
import { Camera, Users, Award, Truck, Play } from 'lucide-react';

function About() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section with Image */}
      <div className="relative h-[50vh] min-h-[600px] flex items-center">
        <img
          src="/aboutt.jpg" 
          alt="Professional Photography"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-transparent" />
        
        <div className="relative z-10 max-w-7xl  px-6 lg:px-8">
          <div className="max-w-2xl">
           
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tighter mb-6">
              Capturing Moments,<br />
              <span className="text-primary">Creating Memories</span>
            </h1>
            
            <p className="text-xl text-gray-200 max-w-lg">
              For over two decades, Adnan Shop has been the trusted choice for photographers and filmmakers across the region.
            </p>

           
          </div>
        </div>

       
      </div>

      {/* Our Story Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="uppercase text-primary font-semibold tracking-widest text-sm">Our Journey</div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                From Passion to <span className="text-secondary">Profession</span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded in 2000 by Adnan, a passionate photographer, our journey began with a simple dream — to provide high-quality photography equipment to creators in our community.
                </p>
                <p>
                  What started as a small shop has now grown into one of the most trusted names in professional imaging equipment. Our commitment to authenticity, quality, and customer satisfaction has never wavered.
                </p>
                <p className="font-medium text-gray-800">
                  Today, we continue to serve both emerging talents and established professionals with the same dedication that started it all.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="/logour.png"
                alt="Our Store"
                className="rounded-3xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-primary">24</div>
                  <div className="text-sm leading-tight">
                    YEARS OF<br />
                    <span className="font-semibold text-gray-900">EXCELLENCE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Photographers Trust Us</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We don't just sell cameras — we help you tell your story through the perfect tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Camera className="w-8 h-8" />,
                color: "bg-primary",
                title: "Expert Selection",
                desc: "Handpicked equipment from Canon, Sony, Nikon, DJI, and more."
              },
              {
                icon: <Users className="w-8 h-8" />,
                color: "bg-secondary",
                title: "Personal Guidance",
                desc: "Real advice from experienced photographers, not just salespeople."
              },
              {
                icon: <Award className="w-8 h-8" />,
                color: "bg-amber-600",
                title: "Authentic Products",
                desc: "100% genuine products with official warranties."
              },
              {
                icon: <Truck className="w-8 h-8" />,
                color: "bg-emerald-600",
                title: "Fast & Secure Delivery",
                desc: "Safe shipping across Iraq with excellent after-sale support."
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default About;