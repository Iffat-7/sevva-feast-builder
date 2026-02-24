interface PageHeaderProps {
  subtitle: string;
  title: string;
  description?: string;
}

const PageHeader = ({ subtitle, title, description }: PageHeaderProps) => {
  return (
    <section className="pt-32 pb-12 text-center">
      <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4 font-body">{subtitle}</p>
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">{title}</h1>
      <div className="w-16 h-0.5 bg-primary mx-auto mb-6" />
      {description && (
        <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">{description}</p>
      )}
    </section>
  );
};

export default PageHeader;
