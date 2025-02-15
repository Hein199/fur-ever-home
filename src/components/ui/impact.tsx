import { Home, Users, Heart } from 'lucide-react';

const ImpactSection = () => {
  const stats = [
    { icon: Heart, label: 'Pets Adopted', value: 1234 },
    { icon: Users, label: 'Active Users', value: 5678 },
    { icon: Home, label: 'Partner Shelters', value: 89 },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Our Impact</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
          {"Together we're making a difference in the lives of pets and their future families. Here's what we've achieved with your support."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg
                hover:shadow-xl transition-all duration-300 ease-in-out
                transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="mb-4">
                <stat.icon className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2
                transition-all duration-300 ease-in-out">
                {stat.value.toLocaleString()}
              </h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
