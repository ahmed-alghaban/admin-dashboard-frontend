import { Button } from "@/components/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import {
  Shield,
  Users,
  Package,
  BarChart3,
  FileText,
  Settings2,
  ArrowRight,
  CheckCircle,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const features = [
    {
      icon: Shield,
      title: "Role-Based Access Control",
      description:
        "Granular permissions with Admin, Manager, and Viewer roles for secure access management.",
    },
    {
      icon: Users,
      title: "User Management",
      description:
        "Comprehensive user administration with profile management and status tracking.",
    },
    {
      icon: Package,
      title: "Product Management",
      description:
        "Complete product lifecycle management with categories and inventory tracking.",
    },
    {
      icon: BarChart3,
      title: "Inventory Analytics",
      description:
        "Real-time inventory insights with stock levels and movement tracking.",
    },
    {
      icon: FileText,
      title: "Order Processing",
      description:
        "Streamlined order management with status tracking and fulfillment workflows.",
    },
    {
      icon: Settings2,
      title: "System Configuration",
      description:
        "Flexible system settings and audit logging for compliance and monitoring.",
    },
  ];

  const benefits = [
    "Secure role-based access control",
    "Real-time inventory management",
    "Comprehensive user administration",
    "Advanced analytics and reporting",
    "Audit trail and compliance",
    "Responsive design for all devices",
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Enterprise Ready
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Powerful, secure, and intuitive administration platform for modern
              businesses. Manage users, products, inventory, and more with
              enterprise-grade security.
            </p>
            <div className="flex justify-center">
              <Link to="/login">
                <Button
                  size="lg"
                  className="text-lg px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
              Everything You Need to Manage Your Business
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Comprehensive tools and features designed to streamline your
              administrative tasks and provide complete visibility into your
              operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-800 dark:text-slate-200">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                Why Choose Our Admin Dashboard?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Built with modern technologies and best practices, our platform
                provides the security, performance, and usability your business
                needs.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-lg text-slate-700 dark:text-slate-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-2xl">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-800 dark:text-slate-200">
                    Powerful Analytics
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-600 dark:text-slate-400">
                    Get real-time insights into your business operations with
                    comprehensive dashboards and reporting
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
                      <div className="font-semibold text-blue-600 dark:text-blue-400">
                        Real-time
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">
                        Data Sync
                      </div>
                    </div>
                    <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
                      <div className="font-semibold text-blue-600 dark:text-blue-400">
                        Custom
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">
                        Reports
                      </div>
                    </div>
                    <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
                      <div className="font-semibold text-blue-600 dark:text-blue-400">
                        Interactive
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">
                        Charts
                      </div>
                    </div>
                    <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
                      <div className="font-semibold text-blue-600 dark:text-blue-400">
                        Export
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">
                        Data
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Join thousands of businesses that trust our platform for their
            administrative needs. Get started today and experience the
            difference.
          </p>
          <Link to="/login">
            <Button
              size="lg"
              className="text-lg px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
