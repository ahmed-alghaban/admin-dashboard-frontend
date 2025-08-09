import { Button } from '@/components/ui/button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/card';
import { Lock, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForbiddenPage = () => {
    return (
        <div className="bg-muted min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md">
                <Card className="text-center">
                    <CardHeader className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                            <Lock className="w-8 h-8 text-destructive" />
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-2xl sm:text-3xl font-bold text-destructive">
                                403 Forbidden
                            </CardTitle>
                            <CardDescription className="text-base sm:text-lg text-muted-foreground">
                                You don't have permission to access this page
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Sorry, but you don't have the required permissions to view this content.
                            Please contact your administrator if you believe this is an error.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                                onClick={() => window.history.back()}
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Go Back
                            </Button>
                            <Button
                                className="flex items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                                asChild
                            >
                                <Link to="/">
                                    <Home className="w-4 h-4" />
                                    Go Home
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ForbiddenPage;
