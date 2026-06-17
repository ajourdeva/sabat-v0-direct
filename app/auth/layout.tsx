export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Brand & Animation */}
      <div className="hidden lg:flex flex-col justify-between p-8 bg-gradient-to-br from-background to-background/50 border-r border-foreground/10">
        <div>
          <div className="text-2xl font-display font-bold">SABAT</div>
        </div>
        
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-display font-bold leading-tight mb-4">
              Corporate travel,{" "}
              <span className="text-foreground/50">simplified</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Professional travel management solutions for enterprise teams.
            </p>
          </div>
          
          {/* Abstract animation placeholder */}
          <div className="w-32 h-32 rounded-lg border border-foreground/10 bg-foreground/5 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border border-foreground/20 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-30"></div>
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>Enterprise travel coordination</p>
          <p>Enterprise travel coordination</p>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex items-center justify-center p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
}
