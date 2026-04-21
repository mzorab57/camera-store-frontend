import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section with Image */}
      <div className="relative h-[50vh] min-h-[550px] flex items-center">
        <img
          src="/contactt.jpg"
          alt="Contact Adnan Shop"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40" />
        
        <div className="relative z-10 max-w-7xl  px-6 lg:px-8 text-white">
          <div className="max-w-2xl">
            <div className="uppercase tracking-[3px] text-sm font-medium text-primary mb-3">
              WE ARE HERE FOR YOU
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter mb-6">
              Let's Start a <span className="text-primary">Conversation</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-lg">
              Whether you need expert advice, technical support, or have a special request — our team is ready to help.
            </p>
          </div>
        </div>

       
      </div>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-gray-600 text-lg mb-10">
                Our team is ready to assist you with any questions about our products or services.
              </p>

              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="bg-primary text-white p-4 rounded-2xl">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Our Location</h4>
                    <p className="text-gray-600 mt-1 leading-relaxed">
                      Sulaymaniyah, Chwarchra<br />
                      Near City Center, Kurdistan Region
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="bg-secondary text-white p-4 rounded-2xl">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Call Us</h4>
                    <p className="text-gray-600 mt-1">
                      Sales: <span className="font-medium">+964 770 226 0440</span><br />
                      Support: <span className="font-medium">+964 770 058 8989</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="bg-purple-600 text-white p-4 rounded-2xl">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Email Us</h4>
                    <p className="text-gray-600 mt-1">info@adnanshops.com</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="bg-amber-600 text-white p-4 rounded-2xl">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Working Hours</h4>
                    <p className="text-gray-600 mt-1">
                      Saturday - Thursday: 9:00 AM - 6:00 PM<br />
                      Friday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-12 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <iframe
                  src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Chwarchra,%20Sulaymaniyah&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  width="100%"
                  height="380"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white shadow-xl rounded-3xl p-8 lg:p-10 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Ahmed Mohammed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="Product Inquiry / Technical Support / Other"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-4 border border-gray-200 rounded-3xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-y"
                    placeholder="Please tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg">Find quick answers to common questions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["Do you offer warranty on products?", "Yes, all products come with official manufacturer warranty. We also provide additional support after purchase."],
              ["Can I visit your store in person?", "Absolutely! We welcome customers to visit our showroom in Sulaymaniyah - Chwarchra."],
              ["Do you provide technical support?", "Yes, our experienced team offers technical support for all products we sell."],
              ["What is your return policy?", "We offer returns within 7 days for unused products in original condition."],
            ].map(([question, answer], i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">{question}</h3>
                <p className="text-gray-600 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;