import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card/card";
import {
    Shield,
    Users,
    Package,
    BarChart3,
    FileText,
    Settings2,
    ArrowRight,
    CheckCircle,
    Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
    const features = [
        {
            icon: Shield,
            title: "Role-Based Access Control",
            description: "Granular permissions with Admin, Manager, and Viewer roles for secure access management."
        },
        {
            icon: Users,
            title: "User Management",
            description: "Comprehensive user administration with profile management and status tracking."
        },
        {
            icon: Package,
            title: "Product Management",
            description: "Complete product lifecycle management with categories and inventory tracking."
        },
        {
            icon: BarChart3,
            title: "Inventory Analytics",
            description: "Real-time inventory insights with stock levels and movement tracking."
        },
        {
            icon: FileText,
            title: "Order Processing",
            description: "Streamlined order management with status tracking and fulfillment workflows."
        },
        {
            icon: Settings2,
            title: "System Configuration",
            description: "Flexible system settings and audit logging for compliance and monitoring."
        }
    ];

    const benefits = [
        "Secure role-based access control",
        "Real-time inventory management",
        "Comprehensive user administration",
        "Advanced analytics and reporting",
        "Audit trail and compliance",
        "Responsive design for all devices"
    ];

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-background to-muted/20">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="container mx-auto px-4 py-16 sm:py-24">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground mb-4">
                            <Zap className="w-3 h-3 mr-1" />
                            Enterprise Ready
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
                        <p className="text-xl sm:text-2xl text-muted-foreground mb-8 leading-relaxed">
                            Powerful, secure, and intuitive administration platform for modern businesses.
                            Manage users, products, inventory, and more with enterprise-grade security.
                        </p>
                        <div className="flex justify-center">
                            <Link to="/login">
                                <Button size="lg" className="text-lg px-8 py-3">
                                    Get Started
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 sm:py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Everything You Need to Manage Your Business
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Comprehensive tools and features designed to streamline your administrative tasks
                            and provide complete visibility into your operations.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                        <feature.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                                Why Choose Our Admin Dashboard?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                Built with modern technologies and best practices, our platform provides
                                the security, performance, and usability your business needs.
                            </p>
                            <div className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-lg">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <Card className="border-0 shadow-2xl bg-gradient-to-br from-card to-card/80">
                                <CardHeader className="text-center">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <BarChart3 className="w-8 h-8 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl">Powerful Analytics</CardTitle>
                                    <CardDescription className="text-lg">
                                        Get real-time insights into your business operations with comprehensive dashboards and reporting
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="p-3 bg-muted/50 rounded-lg">
                                            <div className="font-semibold text-primary">Real-time</div>
                                            <div className="text-muted-foreground">Data Sync</div>
                                        </div>
                                        <div className="p-3 bg-muted/50 rounded-lg">
                                            <div className="font-semibold text-primary">Custom</div>
                                            <div className="text-muted-foreground">Reports</div>
                                        </div>
                                        <div className="p-3 bg-muted/50 rounded-lg">
                                            <div className="font-semibold text-primary">Interactive</div>
                                            <div className="text-muted-foreground">Charts</div>
                                        </div>
                                        <div className="p-3 bg-muted/50 rounded-lg">
                                            <div className="font-semibold text-primary">Export</div>
                                            <div className="text-muted-foreground">Data</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 sm:py-24 bg-muted/50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Ready to Transform Your Business?
                    </h2>
                    <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
                        Join thousands of businesses that trust our platform for their administrative needs.
                        Get started today and experience the difference.
                    </p>
                    <Link to="/login">
                        <Button size="lg" className="text-lg px-8 py-3">
                            Start Your Free Trial
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage
